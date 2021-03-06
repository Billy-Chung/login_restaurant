// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入模組程式碼
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const home = require('./modules/home')
const sort = require('./modules/sort')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth') 
const auth = require('./modules/auth')

router.use('/auth', auth)

router.use('/restaurants',authenticator , restaurants)

router.use('/search',authenticator , search)

router.use('/sort',authenticator , sort)

router.use('/users', users)

router.use('/',authenticator, home)


// 匯出路由器
module.exports = router