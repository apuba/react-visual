/*
 * @Description:
 * @Author: 侯兴章
 * @Date: 2019-09-17 17:21:24
 * @LastEditors: 侯兴章
 * @LastEditTime: 2019-09-23 17:35:07
 */
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import store from '@redux/store';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import Designer from '@pages/Designer';
import Preview from '@pages/Preview.jsx';
import SelectTable from '@pages/SelectTable.jsx';
import CodeEditorComp from '@pages/components/public/CodeEditorComp.jsx';
import { HashRouter, Route, Switch } from 'react-router-dom';

const SliderComponent = () => (
  <Switch>
    <Route component={Designer} exact path="/" />
    <Route component={SelectTable} path="/selectTable"  />
    <Route component={Designer} path="/designer"  />
    <Route component={Preview} path="/preview"  />
    <Route component={CodeEditorComp} path="/codeEditor"  />
  </Switch>
);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <SliderComponent />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
