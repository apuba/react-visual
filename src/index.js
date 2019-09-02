import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './App.css'
import 'antd/dist/antd.css'
import { Provider } from 'react-redux'
import store from './redux/store'

import Designer from './pages/Designer'
import Preview from './pages/Preview.jsx'
import { HashRouter, Route, Switch } from 'react-router-dom'

const SliderComponent = () => (
  <Switch>
    <Route exact path='/' component={Designer} />
    <Route path='/designer' component={Designer} />
    <Route path='/preview' component={Preview} />
  </Switch>
)

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <SliderComponent />
    </HashRouter>
  </Provider>
  , document.getElementById('root'))
