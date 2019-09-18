/**
 * @description 放置预览页面的容器
 */
import IframeContainer from "./IframeContainer"

class PreviewContainer extends IframeContainer {
    constructor(config){
        super(config)
        const { close } = config
        if(!close || typeof close !== "function"){
            throw new Error("close必须是一个函数")
        }
        this.close = close
        this.updateStyle()
    }
    closeIframe(){
        super.closeIframe()
        this.close()
        this.destroy()
    }
    updateStyle(){
        const styleObj = {
            padding:"20px",
            boxSizing:"border-box"
        }
        super.updateContainerStyle(styleObj)
    }
    destroy(){
        this.closeIframe = null
        this.updateStyle = null
    }
}

export default PreviewContainer
