const express = require('express')
const puppeteer = require('puppeteer')
const axios = require('axios')
const app = express()

async function test() {
  console.log('截图')
  const brower = await puppeteer.launch()
  const page = await brower.newPage()
  await page.goto('https://kaikeba.com/')
  await page.screenshot({path: 'kaikeba.png'})
  await brower.close()
}

// test()
// 1加缓存 2.lru缓存算法
let cacheUrl = {}

app.get('*', async function(req, res) {
  console.log(req.url)

  if (cacheUrl[req.url]) {
    console.log('=====cache=====')
    return res.send(cacheUrl[req.url])
  } 

  if (req.url === '/favicon.ico') {
    return res.send({code: 0})
  }

  const url = 'http://localhost:9093' + req.url
  const brower = await puppeteer.launch()
  const page = await brower.newPage()
  await page.goto(url, {
    waitUnitl: ['networkidle0']
  })

  const html = await page.content()

  cacheUrl[req.url] = html

  res.send(html)
})

app.listen(8085, () => {
  console.log('ssr server start!')
})