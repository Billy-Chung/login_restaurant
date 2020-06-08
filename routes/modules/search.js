const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//搜尋功能的路由
router.get('/', (req, res) => {
    const keyword = req.query.keyword
    return Restaurant.find()
      .lean()
      .then(restaurants => {
        const results = restaurants.filter(
          item =>
            item.name.toLowerCase().includes(keyword.toLowerCase()) ||
            item.category.toLowerCase().includes(keyword.toLowerCase())
        )
        if (results.length > 0) {
          res.render('index', { restaurants: results, keyword: keyword })
        } else {
          res.render('index', { keyword: keyword })
        }
      })
      .catch(error => console.log(error))
  })

module.exports = router