import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
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
    { routes.map(route => <Route {...route}></Route>)}
    {/* </div> */}
  </BrowserRouter>
</Provider>

ReactDom.hydrate(Page, document.getElementById('root'))