/*
 * @Description: 
 * @Author: 侯兴章
 * @Date: 2019-09-17 19:41:08
 * @LastEditors: 侯兴章
 * @LastEditTime: 2019-09-17 20:26:16
 */
var editor = null
const defaultCss = 
`/* 用户自定义样式 */
:customer-css{
    height:100px;
    width:200px;
    font-size:20px;
}`
const defaultJS = 
`// 数据请求回来之后，处理的逻辑
return function afterFetch(data){
    console.log("log")
    return {username:"editor-css"}
}
`
$(document).ready(function() {
	require(['vs/editor/editor.main'], function () {
        toggleLanguage("javascript",defaultJS);
        changeTheme("dark")
        $(".theme-picker").change(function() {
            changeTheme(this.value);
		});
	});

	window.onresize = function () {
		if (editor) {
			editor.layout();
		}
    };
    window.onmessage = (ev) => {
        const { data } = ev
        if(!data) return
        const { value, language,type } = data
        switch(type){
            case "SET_VALUE":
                if(!value || !language) return
                toggleLanguage(language,value)
                break
            case "CLOSE_CODE_EDITOR":
                    sendMessageToParent({
                        value:editor.getModel().getValue(),
                        type
                    })
                break
            default:
                break
        }
    }
});


function toggleLanguage(language,value) {
    $('.loading.editor').show();
    $('.loading.editor').fadeOut({ duration: 200 });
    if (!editor) {
        $('#editor').empty();
        editor = monaco.editor.create(document.getElementById('editor'), {
            model: null,
        });
    }
    var oldModel = editor.getModel();
    if (oldModel) {
        oldModel.dispose();
    }
    var newModel = monaco.editor.createModel(value, language);
    editor.setModel(newModel);
    $('.loading.editor').fadeOut({ duration: 300 });
}

function changeTheme(theme) {
    let newTheme = "vs-dark"
    switch(theme){
        case "dark":
            newTheme = "vs-dark"
            break
        case "blank":
            newTheme = "vs"
            break
        case "black":
            newTheme = "hc-black"
            break
        default:
            break
    }
    monaco.editor.setTheme(newTheme);
}

function sendMessageToParent(data){
    var container = parent.window
    container.postMessage(data,"*")
}