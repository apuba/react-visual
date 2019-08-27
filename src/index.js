import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './App.css'
import 'antd/dist/antd.css'

import Designer from './pages/Designer'
// import preview from './pages/preview.jsx'
import { HashRouter, Route, Switch } from 'react-router-dom'

const SliderComponent = () => (
  <Switch>
    <Route exact path='/' component={Designer} />
    <Route path="/designer" component={Designer} />
  </Switch>
)

ReactDOM.render((
  <HashRouter>
    <SliderComponent />
  </HashRouter>
), document.getElementById('root'))
