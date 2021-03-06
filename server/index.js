import React from 'react'
import path from 'path'
import fs from 'fs'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import routes from '../src/App'
import Header from '../src/component/Header'
import { getServerStore } from '../src/store/store'

const app = express()
const store = getServerStore()

app.use(express.static('public'))

// client端转发到nodessr端
app.use(
  '/api',
  createProxyMiddleware({ target: 'http://localhost:9090', changeOrigin: true })
)

function csrRender(res) {
  const filename = path.resolve(process.cwd(), 'public/index.csr.html')
  const html = fs.readFileSync(filename, 'utf-8')
  return res.send(html)
}

app.get('*', (req, res) => {
  // 配置开关开启csr
  // 服务器负载过高开启csr

  if (req.query._mode === 'csr') {
    console.log('url参数开启csr降级')
    return csrRender(res)
  }

  // if (req.url.startsWith('/api/') {
  //   //不渲染页面 转发get
  // })

  const promises = []

  routes.some(route => {
    const match = matchPath(req.path, route)

    if (match) {
      const { loadData } = route.component
      if (loadData) {
        const promise = new Promise((resolve, reject) => {
          loadData(store).then(resolve).catch(resolve)
        })
        promises.push(promise)
        // promises.push(loadData(store))
      }
    }
  })
  Promise.all(promises).then(() => {
  // Promise.allSettled(promises).then(() => {
    const context = {
      css: []
    }
    // const Page = <App title="React !!!!"></App>
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <Header></Header>
          {/* {App} */}
          <Switch>
          { routes.map(route => <Route {...route}></Route>) }
          </Switch>
        </StaticRouter>
      </Provider>
    )

    console.log('context======', context)

    if (context.statuscode) {
      res.status(context.statuscode)
    }

    if (context.action === 'REPLACE') {
      res.redirect(301, context.url)
    }

    const css = context.css.join('\n')

    res.send(`
      <html>
        <head>
          <meta charset="utf-8"/>
          <style>
            ${css}
          </style>
        </head>
        <body>
          <div id="root">
            ${content}
          </div>
          <script>
            window.__context = ${JSON.stringify(store.getState())}
          </script>
          <script src="/bundle.js"></script>
        </body>
      </html>
    `)
  }).catch(() => {
    res.send('报错了')
  })
})

app.listen(9093, () => {
  console.log('监听完毕！')
})
