/**
 * @description 放置第三方定制页面容器,如搜索规则
 */
import IframeContainer from "./IframeContainer"

class FixContainer extends IframeContainer {
    constructor(config){
        super(config)
        const { listen } = config
        if(!listen || typeof listen !== "function"){
            throw new Error("close必须是一个函数")
        }
        this.listen = listen
        this.handleMessageFromChildPage()
    }
    closeIframe(){
        this.sendMessageToChild({type:"CLOSE_FIX_CONTAINER"})
    }
    handleMessageFromChildPage(){
        super.listenMessageFromChildPage(message=>{
            const { type, value } = message
            this.listen(value)
            if(type=="CLOSE_FIX_CONTAINER"){
                super.closeIframe()
                this.destroy()
            }
        })
    }
    destroy(){
        this.handleMessageFromChildPage = null
        this.listen = null
        this.closeIframe = null
    }
}

export default FixContainer