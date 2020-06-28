import React, { Component } from 'react';
// import {connet} from 'react-redux';
import gData from '../assets/data/dataTable';
import { Tree, Input } from 'antd';
const { TreeNode } = Tree;
const { Search } = Input;

const dataList = [];

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

export default class SelectTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true
    };
  }

  onExpand(expandedKeys) {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    });
  }

  onChange(e) {
    const { value } = e.target;
    const expandedKeys = dataList
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, gData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true
    });
  }
  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    const loop = data =>
      data.result.map(item => {
        const index = item.tableAlias.indexOf(searchValue);
        const beforeStr = item.tableAlias.substr(0, index);
        const afterStr = item.tableAlias.substr(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: '#f50' }}>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.tableAlias}</span>
          );
        if (item.children) {
          return (
            <TreeNode key={item.tableId} title={title}>
              {loop(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode key={item.tableId} title={title} />;
      });
    return (
      <div>
        <h1>请选择数据表</h1>
        <div>
          <Search
            style={{ marginBottom: 8 }}
            placeholder="Search"
            onChange={this.onChange}
          />
          <Tree
            onExpand={this.onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
          >
            {loop(gData)}
          </Tree>
        </div>
        <div>列表</div>
      </div>
    );
  }
}
