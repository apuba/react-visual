# iframe容器
>提供iframe容器用于放置其他页面

## 类的设计
  - 基类
    + IframeContainer
  - 子类
    + EditorContainer
      >代码编辑器
    + PreviewContainer
      >页面预览
    + FixContainer
      >第三方定制页面
## 页面通信
  - 父页面向子页面发送数据时，容器实例可以调用自身的方法：sendMessageToChild(data)，data表示需要发送的数据
  - 子页面向父页面发送数据`parent.window.postMessage(data,"*")`

## EditorContainer
### 示例
#### 第一步：实例化容器
```js
const config = {
    // 代码编辑器的访问路径
    url:"http://192.168.2.33:8088/editor/index.html",
    width:"400px", // 容器的宽度
    heigth:"600px", // 容器的高度
    container:"#editor-container", // 放置编辑器的容器
    listen(data){  // 监听子页面发送过来的数据
        // code...
    }
}
const container = new EditorContainer(config)
```
#### 第二步：设置编辑器的内容
```js
const value = 
`
return function test(){
    const user = {
        username:"flowhys",
        age:2
    }
}
`
container.sendMessageToChild({
    type:"INIT_EDITOR_CONTAINER" // 该字段是必传的，且值为固定
    value,
    language:"javascript" // 语言类型
})
```
## PreviewContainer
### 示例
```js
const config = {
    // 自定义页面的地址
    url:"http://192.168.8.25:9000/FlowHYS/Shell.html?username=222333&userId=53f178b7fe39489086e6ac9f8009c9f4&pagename=initializedata/dingzhiyemianbiaodan&projectId=03a3dc03b1654233b828e787dcefffe8&clientType=2&tokenId=ce54c175-24bc-4341-bcbe-a3ba1f522291",
    width:"80%",
    height:"90%",
    container:"#preview-container",
    listen(data){
        // code...
    }
}
```