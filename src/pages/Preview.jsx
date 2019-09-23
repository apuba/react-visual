import React, { Component } from 'react';

import 'antd/dist/antd.css';
import '../assets/scss/preview.scss';
// import { Button} from 'antd'
import HY from '../components';
import * as jsx from './jsx';

/**
 * Preivew 一般是当前页面名称 Preivew.html
 */
class Preivew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: {
        static: {
          testList: [
            {
              key: '1',
              value: '普通用户'
            },
            {
              key: '2',
              value: '青铜会员'
            },
            {
              key: '3',
              value: '白银会员'
            },
            {
              key: '4',
              value: '黄金会员'
            }
          ],
          test2: [
            {
              key: 'a',
              value: '写入'
            },
            {
              key: 'b',
              value: '读出'
            }
          ]
        },
        dynamic: {}
      }
    };
  }

  // 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构
  componentDidMount() {}

  runCustomJS(p) {
    console.log(`已经执行this方法体的函数，并获取传过来的参数变量为：${p}`);
  }

  getFun(js) {
    const fun = new Function('name', 'e', js);
    return fun('传来传去的', this);
  }

  stringOuputJSX(str) {
    const fun = new Function('input', 'React', 'return input');
    return fun(str, React);
  }

  makeArray(arrayLike) {
    return [].slice.call(arrayLike, 0);
  }
  getProps(ele) {
    const props = {};
    this.makeArray(ele.attributes).forEach(({ name, value }) => {
      props[name === 'class' ? 'className' : name] = value;
    });
    return props;
  }

  // html转为jsx
  transferJSX(ele) {
    // debugger
    if (ele.tagName) {
      return React.createElement(
        ele.tagName,
        this.getProps(ele),
        this.makeArray(ele.childNodes).map(this.transferJSX)
      );
    }
    return ele.nodeValue;
  }

  // 创建html节点
  createEleHTML(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div;
  }

  render() {
    return (
      <div
        id="preview"
        style={{
          padding: '30px'
        }}
      >
        <HY.Button onClick={this.getFun.bind(this, jsx.js)}>按钮哦</HY.Button>
        {/*   <div dangerouslySetInnerHTML={{ __html: jsx.html}}></div> */}
        {
          //  this.createEleHTML(jsx.button)
        }
      </div>
    );
  }
}
export default Preivew;
