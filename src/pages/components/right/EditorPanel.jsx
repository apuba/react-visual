/* 编辑属性面板
 * @Author: houxingzhang
 * @Date: 2019-09-02 17:56:44
 * @Last Modified by: houxingzhang
 * @Last Modified time: 2019-09-05 14:16:14
 */
import React, { Component } from 'react';
import { Icon, Select, Input, Tooltip } from 'antd';
import { connect } from 'react-redux';
import {
  updateBaseState,
  updateToggle
} from '../../../redux/reducers/designer/action';
import _ from 'lodash';
import publicComponent from '../public/index';

const { Option } = Select;

class EditorPanel extends Component {
  /**
   *  更新当前编辑的组件属性，使用函数节流处理
   *
   * @param {*} category 属性大类
   * @param {*} type 属性的类型
   * @param {*} label 当前属性的标签名
   * @param {*} val 属性值
   * @param {*} obj 当前组件对象
   * @memberof Designer
   */
  updateEditComponent = _.debounce((category, type, label, val, obj) => {
    if (!category && !type) {
      console.error('参数配置错误: 缺少category 或 type 参数');
      return;
    }
    const { config } = obj;
    if (val === 'true') {
      // 对字符串的 'true' 'false'进行转换
      val = true;
    } else if (val === 'false') {
      val = false;
    }

    config.config[category].props[type].value = val; // 更新配置的值 gutter
    if (category === 'grid') {
      // 栅格配置
      config.grid[type] = val;
    } else if (type === 'slot') {
      config.slot = val; // 当前渲染的内容
    } else if (val === '-' && config.props[type]) {
      // 如果值为 '-',则删除掉这属性
      delete config.props[type];
    } else if (Array.isArray(val)) {
      config.props[type] = val.join(' '); // 当前渲染的属性
    } else {
      config.props[type] = val; // 当前渲染的属性
    }

    this.props.updateBaseState('timespan', 'ver:' + new Date().getTime()); // 更新视图与状态
    // this.setState({});
    console.log('编辑属性完成', obj);
  }, 500);

  // 获取当前要编辑的组件,显示到编辑面板上的那个组件
  getEditComponentById(id) {
    return _.find(this.props.dynamicComponentList, { id });
  }

  // 创建编辑页面的下拉选项
  createEditorPanelOption(prop, type) {
    let options = [];
    if (prop.options) {
      options = prop.options;
    } else if (typeof prop.value === 'boolean') {
      // 布尔值
      options.push(
        {
          key: 'true',
          value: '是'
        },
        {
          key: 'false',
          value: '否'
        }
      );
    } else if (prop.enum) {
      prop.enum.forEach(item => {
        options.push({ key: item, value: item });
      });
    }
    return options.map(option => (
      <Option key={option.key} value={option.key}>
        {option.value}
      </Option>
    ));
  }

  // 下拉菜单添加数据源的事件
  selectAddDataSourceHandle(type, e) {
    debugger;
    if (type === 'staticDataSource') {
      this.props.updateBaseState('editComponentId', null);
      this.props.updateBaseState('activeId', 'dom_0');
    } else {
      alert('动态数据源添加');
      // TODO: 开发到这里。添加动态数据源，新建一个组件，通过组件选择数据表，筛选的字段名，查询条件得到一个数据源请求配置
      // 通过这个配置获取对应数据源，绑定到对应当前组件
    }
  }

  // 编辑全局 css
  cssCodeEditHandle(e) {
    this.props.updateBaseState('showCodeEditor', true);
    this.props.updateBaseState('codeEditorLanguage', 'css');
  }
  jsCodeEditHandle(e) {
    this.props.updateBaseState('showCodeEditor', true);
    this.props.updateBaseState('codeEditorLanguage', 'javascript');
  }
  // 新增样式
  addStyleHandle(style, e) {
    alert('请弹出样式选择窗');
  }
  // 创建组件的其他属性
  renderProps(config, type) {
    /*   switch (type) {
      case 'staticDataSource':
      case 'dynamicDataSource':
        return {}
      default:
        return {};
    } */
  }

  // 渲染属性页面上对应属性的显示组件 ---------------------------------------------------
  renderPropsComponent(category, prop, attrs, type, obj) {
    const { js, css, dataSource } = this.props;
    const [inputId, selectId] = [
      `input_${type}_${obj.id}`,
      `select_${type}_${obj.id}`
    ];

    // 如果自定义了组件类型
    if (prop.component) {
      let children = '';

      let attribute = {
        attrs,
        handleChange: val => this.updateEditComponent(category, type, prop.label, val, obj),
        value: prop.value
      };
      switch (prop.component) {
        case 'ClassNameComp': // css样式组件
          attribute = {
            ...attribute,
            type,     
            css,
            id: selectId,           
            addDataHandle: this.cssCodeEditHandle.bind(this)
          };
          break;
        case 'JavascriptCodeComp': // css样式组件
          attribute = {
            ...attribute,
            js,
            id: selectId,           
            addDataHandle: this.jsCodeEditHandle.bind(this)
          };
          break;
        case 'ColorInputComp': // 颜色选择组件
          attribute = {
            ...attribute,
            id: selectId,
            handleChange: e => {
              e.persist();
              this.updateEditComponent(
                category,
                type,
                prop.label,
                e.target.value,
                obj
              );
            },
            value: prop.value
          };
          break;
        case 'StaticDataSourceComp': // 静态数据源
          attribute = {
            ...attribute,           
            id: selectId,           
            data: dataSource.static, // 静态数据
            addDataHandle: this.selectAddDataSourceHandle.bind(this, type)
          };
          break;

        case 'DynamicDataSourceComp':
          attribute = {
            ...attribute,           
            id: selectId,           
            data: dataSource.dynamic, // 动态数据
            addDataHandle: this.selectAddDataSourceHandle.bind(this, type)
          };
          break;
        default:
          break;
      }

      return React.createElement(
        publicComponent[prop.component],
        attribute,
        children
      );
    } else if (prop.options || prop.enum || typeof prop.value === 'boolean') {
      // 如果属性有 options 选项， enum玫举， 或值为布尔值,组件显示为select
      return (
        <span
          onMouseDown={e => {
            e.preventDefault();
            return false;
          }}
        >
          {/* TODO: 这里添加 onMouseDown 是为了阻止Select默认行为导致 dropdownRender 无法生效  */}
          <Select
            {...attrs}
            defaultValue={prop.value.toString()}
            className="input"
            size="small"
            key={selectId}
            id={selectId}
            ref={selectId}
            onChange={val =>
              this.updateEditComponent(category, type, prop.label, val, obj)
            }
          >
            {this.createEditorPanelOption(prop, type)}
          </Select>
        </span>
      );
    } else {
      return (
        <Input
          {...attrs}
          size="small"
          className="input"
          defaultValue={prop.value}
          key={inputId}
          id={inputId}
          ref={inputId}
          onChange={e => {
            e.persist();
            this.updateEditComponent(
              category,
              type,
              prop.label,
              e.target.value,
              obj
            );
          }}
        />
      );
    }
  }

  render() {
    const { editComponentId, draggable, toggle } = this.props;
    if (!editComponentId || draggable.hover) {
      //  this.data.draggable.hover 拖拽对象释放
      return false;
    }
    const obj = this.getEditComponentById(editComponentId);
    console.log(obj);
    if (!obj) return;
    const config = obj.config.config; // 获取配置项
    return Object.keys(config).map(category => {
      const item = config[category];
      const id = `panel_${category}_${obj.id}`; // 编辑页面的id
      return (
        item.props && (
          <section className="page_designer_prop_section" key={category}>
            <header>
              {category === 'style' && (
                <span className="fr">
                  <span style={{ marginRight: '10px' }}>
                    <Tooltip title="编辑代码">
                      <Icon
                        type="code"
                        onClick={this.cssCodeEditHandle.bind(this)}
                      />
                    </Tooltip>
                  </span>
                  <span className="btn">
                    <Tooltip title="增加样式">
                      <Icon
                        type="plus"
                        onClick={this.addStyleHandle.bind(
                          this,
                          obj.config.style
                        )}
                      />
                    </Tooltip>
                  </span>
                </span>
              )}
              <span onClick={() => this.props.updateToggle(id)}>
                <Icon
                  type={toggle.indexOf(id) === -1 ? 'caret-down' : 'caret-up'}
                />{' '}
                {item.label}
              </span>
            </header>
            <ul className={toggle.indexOf(id) > -1 ? 'none' : ''}>
              {Object.keys(item.props).map(type => {
                const prop = item.props[type];

                // 定义组件的属性
                const attrs = this.renderProps(config, type);
                return (
                  <li key={type} data-component={prop.component}>
                    <label>
                      <span className="label">{prop.label}</span>
                      {this.renderPropsComponent(
                        category,
                        prop,
                        attrs,
                        type,
                        obj
                      ) /* 渲染属性的组件 */}
                      {prop.tip && (
                        <Tooltip title={prop.tip}>
                          <Icon
                            type="question-circle"
                            theme="twoTone"
                            twoToneColor="#1890ff"
                          />
                        </Tooltip>
                      )}
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>
        )
      );
    });
  }
}

const mapStateToProps = store => {
  const { designer } = store;
  const {
    editComponentId,
    draggable,
    toggle,
    dynamicComponentList,
    dataSource,
    css,
    js
  } = designer;
  return {
    editComponentId,
    draggable,
    toggle,
    dynamicComponentList,
    dataSource,
    css,
    js
  };
};

export default connect(
  mapStateToProps,
  { updateBaseState, updateToggle }
)(EditorPanel);
