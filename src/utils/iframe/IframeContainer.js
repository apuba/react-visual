/*
 * @Description:
 * @Author: 侯兴章
 * @Date: 2019-09-17 17:21:24
 * @LastEditors: 侯兴章
 * @LastEditTime: 2019-09-17 17:21:24
 */
/**
 * @description 嵌套iframe页面的容器
 */
class IframeContainer {
    constructor(config){
        this.validatorConfig(config)
        this.renderContainer()
    }
    // private  检验配置
    validatorConfig(config){
        const {
            url,
            height = '400px',
            width = '300px',
            container
        } = config
        if(!url || !width || !container || !height){
            throw new Error('参数配置有误，请检查')
        }
        this.url = url
        this.height = height
        this.width = width
        this.container = container
        this.childPageLoaded = false
    }
    // private 创建iframe元素
    createTemplate(){
        this.iframeId = (Math.random()*10000).toFixed(0)
        const template = `
            <section style='position:relative;width:100%;height:100%'>
                <span class='close-iframe' 
                    style='position: absolute;
                    right: 1px;
                    top: 2px;
                    display:none;
                    color: #fff;
                    background: #ec7259;
                    border-radius: 50%;
                    font-size: 12px;
                    cursor:pointer;
                    padding: 0px 4px 0px 4px;'>
                    X
                </span>
                <iframe src='${this.url}' id='${this.iframeId}' 
                    frameborder = 0  
                    width='100%'
                    height='100%'>
                </iframe>
            </section>
        `
        return template
    }
    // private 渲染iframe容器
    renderContainer(){
        const template = this.createTemplate()
        let container = document.querySelector(this.container)
        if(!container){
            throw new Error('页面不存在该容器: ' + this.container)
        }
        const styleObj = {
            height:this.height,
            width:this.width,
            boxShadow: '0 5px 15px rgba(0,0,0,.3)'
        }
        Object.assign(container.style,styleObj)
        container.innerHTML = template
        document.getElementById(this.iframeId).addEventListener('load',() => {
            this.iframeDidMount()
            this.childPageLoaded = true
        })
    }
    // iframe加载完成之后
    iframeDidMount(){
        const closeBtn = document.querySelector(this.container + ' section .close-iframe')
        closeBtn.style.display = 'block'
        closeBtn.onclick = () => {
            this.closeIframe()
        }
    }
    // 关闭iframe容器
    closeIframe(){
        const iframeContainer = document.querySelector(this.container)
        iframeContainer.innerHTML = ''
        this.destroy()
    }
    // 向子页面发送消息
    sendMessageToChild(data){
        const iframe = document.querySelector(this.container + ' section>iframe')
        if(!iframe){
            throw new Error('页面中不存在该选择器')
        }
        if(this.childPageLoaded){
            const childPage = iframe.contentWindow
            childPage.postMessage(data,'*')
        }else{
            const timer = setInterval(() => {
                if(this.childPageLoaded){
                    const childPage = iframe.contentWindow
                    childPage.postMessage(data,'*')
                    clearInterval(timer)
                }
            }, 100)
        }
    }
    // 监听子页面传过来的数据
    listenMessageFromChildPage(callback){
        window.onmessage = (ev) => {
            const { data } = ev
            if(typeof callback == 'function'){
                callback(data)
            }
        }
    }
    // 修改容器的样式
    updateContainerStyle(styleObj){
        const container = document.querySelector(this.container + ' section')
        Object.assign(container.style,styleObj)
    }
    destroy(){
        this.container = null
        this.height = null
        this.width = null
        this.updateContainerStyle = null
        this.listenMessageFromChildPage = null
        this.iframeDidMount = null
        this.renderContainer = null
        this.sendMessageToChild = null
        this.createTemplate = null
        this.validatorConfig = null
        this.closeIframe = null
    }
}

export default IframeContainer