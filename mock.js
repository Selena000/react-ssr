// 模拟接口
const express = require('express')
const app = express()

app.get('/api/course/list', (req, res) => {
  // res.header('Access-Control-Allow-Origin', '*')
  // res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  // res.header('Content-Type', 'application/json;charset=utf-8')

  res.json({
    code: 0,
    list: [
      { name: 'A', id: 1 },
      { name: 'B', id: 2 },
      { name: 'C', id: 3 },
      { name: 'D', id: 4 }
    ]
  })
})

app.get('/api/user/userInfo', (req, res) => {
  // res.header('Access-Control-Allow-Origin', '*')
  // res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  // res.header('Content-Type', 'application/json;charset=utf-8')

  res.json({
    code: 0,
    data: {
      name: 'suhong',
      best: '你是最棒的！'
    }
  })
})

app.listen(9090, () => {
  console.log('mock数据启动完毕！')
})