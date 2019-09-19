/*
 * @Description: 
 * @Author: 侯兴章
 * @Date: 2019-09-17 17:21:24
 * @LastEditors: 侯兴章
 * @LastEditTime: 2019-09-17 17:21:24
 */
export const json = ` 
/*
* 这里声明要引入的组件
*/
import 'antd/dist/antd.css'
import '../assets/scss/preview.scss'
import allComponents from '../components'
const { Select } = allComponents
   

/**
* Index 一般是当前页面名称 index.html 
*/
class Index extends Component {
  constructor (props) {
    super(props)
    this.state= {
      dataSource: {
         static: {"testList":[{"key":"1","value":"普通用户"},{"key":"2","value":"青铜会员"},{"key":"3","value":"白银会员"},{"key":"4","value":"黄金会员"}],"test2":[{"key":"a","value":"写入"},{"key":"b","value":"读出"}]}, 
       dynamic: {}, 
      
      }
    }
  }
  render(){
    return(<div class='ant-row design_preview'>
          
    <span key='Select_1' id='Select_1' className={'ant-col-xs-24 ant-col-sm-12 ant-col-md-6'} style={{"padding":"10px"}}>
      <Select  placeholder="请输入文本" type="text" style={{"width":"","color":""}} staticDataSource="testList">
      <Select.Option key='1' value='1'>普通用户</Select.Option>
      <Select.Option key='2' value='2'>青铜会员</Select.Option>
      <Select.Option key='3' value='3'>白银会员</Select.Option>
      <Select.Option key='4' value='4'>黄金会员</Select.Option>
      
      </Select>
    </span>
    </div>)
  }
}
export default Index;`

export const html = `<div class='ant-row design_preview'>
          
<span key='Select_1' id='Select_1' className={'ant-col-xs-24 ant-col-sm-12 ant-col-md-6'} style={{"padding":"10px"}}>
  <Select  placeholder="请输入文本" type="text" style={{"width":"","color":""}} staticDataSource="testList">
  <Select.Option key='1' value='1'>普通用户</Select.Option>
  <Select.Option key='2' value='2'>青铜会员</Select.Option>
  <Select.Option key='3' value='3'>白银会员</Select.Option>
  <Select.Option key='4' value='4'>黄金会员</Select.Option>
  
  </Select>
</span>
</div>`

export const js = `
console.log("字符串js已运行", name);
e.runCustomJS(name,e)
`
export const button = '<Button>新的按钮</Button>'
