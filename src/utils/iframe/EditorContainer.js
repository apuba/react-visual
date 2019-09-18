/**
 * @description  放置代码编辑器的容器
 */
import IframeContainer from "./IframeContainer"
class EditorContainer extends IframeContainer {
    constructor(config){
        super(config)
        this.handleMessageFromChildPage()
        const { listen } = config
        if(!listen || typeof listen !== "function"){
            throw new Error("close必须是一个函数")
        }
        this.listen = listen
    }
    closeIframe(){
        this.sendMessageToChild({type:"CLOSE_CODE_EDITOR"})
    }
    handleMessageFromChildPage(){
        super.listenMessageFromChildPage(message=>{
            const { type,value } = message
            this.listen(message)
            if(type=="CLOSE_CODE_EDITOR"){
                super.closeIframe()
                this.destroy()
            }
        })
    }
    destroy(){
        this.listen = null
        this.closeIframe = null
        this.handleMessageFromChildPage = null
    }
}

export default EditorContainer