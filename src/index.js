/*
 * @Description:
 * @Author: 侯兴章
 * @Date: 2019-09-17 17:21:24
 * @LastEditors: 侯兴章
 * @LastEditTime: 2019-09-19 20:42:50
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
import CodeEditorComp from '@pages/components/public/CodeEditorComp.jsx';
import { HashRouter, Route, Switch } from 'react-router-dom';

const SliderComponent = () => (
  <Switch>
    <Route exact path="/" component={Designer} />
    <Route path="/designer" component={Designer} />
    <Route path="/preview" component={Preview} />
    <Route path="/codeEditor" component={CodeEditorComp} />
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
