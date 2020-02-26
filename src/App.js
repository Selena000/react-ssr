import React from 'react'
// import {Route} from 'react-router-dom'
import Index from './container/Index'
import About from './container/About'
import User from './container/User'
import NotFound from './container/NotFound'
import Login from './container/Login'

// import './App.css'

// export default (
//   <div>
//     <Route path="/" exact component={Index}></Route>
//     <Route path="/about" exact component={About}></Route>
//   </div>
// )

export default [
  {
    path: '/',
    component: Index,
    loadData: Index.loadData,
    exact: true,
    key: 'index'
  },
  {
    path: '/about',
    component: About,
    // loadData: About.loadData,
    exact: true,
    key: 'about'
  },
  {
    path: '/user',
    component: User,
    // loadData: User.loadData,
    exact: true,
    key: 'user'
  },
  {
    path: '/login',
    component: Login,
    // loadData: User.loadData,
    exact: true,
    key: 'login'
  },
  {
    component: NotFound,
    key: 'notFound'
  }
]
