import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import routes from '../src/App'
import Header from '../src/component/Header'
import { getClientStore } from '../src/store/store'

const store = getClientStore()

const Page = <Provider store={store}>
  <BrowserRouter>
    <Header></Header>
    {/* {App} */}
    {/* <div> */}
    
    <Switch>
    { routes.map(route => <Route {...route}></Route>) }
    </Switch>
    {/* </div> */}
  </BrowserRouter>
</Provider>

if (window.__context) {
  ReactDom.hydrate(Page, document.getElementById('root'))
} else {
  ReactDom.render(Page, document.getElementById('root'))
}
