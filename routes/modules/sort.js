const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//Sort function
router.get('/:name/:type', (req, res) => {
  const { name, type } = req.params
  return Restaurant.find()
    .sort({ [name]: [type] })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/:name/:type/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
      .lean()
      .then((restaurant) => res.render('detail', { restaurant }))
      .catch(error => console.log(error))
})

module.exports = router