const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

//新增餐廳
router.get('/new', (req, res) => {
    return res.render('new')
})

//在資料庫新增餐廳資料的路由
router.post('/todos', (req, res) => {
    console.log(req.body)
    if (!req.body.image.length) {
        req.body.image = 'https://static.vecteezy.com/system/resources/previews/000/091/119/large_2x/free-restaurant-logo-on-paper-plate-vector.jpg'
    }
    const restaurant = req.body
    return Todo.create(restaurant)
        .then(() => res.redirect('/'))
        .catch((error) => console.log(error))
})

//設定詳細頁面的路由
router.get('/:id', (req, res) => {
    const id = req.params.id
    return Todo.findById(id)
        .lean()
        .then((todo) => res.render('detail', { todo }))
        .catch(error => console.log(error))
})

//設定編輯路由
router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    return Todo.findById(id)
        .lean()
        .then((todo) => res.render('edit', { todo }))
        .catch(error => console.log(error))
})

//修改並將編輯的內容放進伺服器內
router.put('/:id', (req, res) => {
    const id = req.params.id
    const name = req.body.name
    const nameEn = req.body.name_en
    const category = req.body.category
    const image = req.body.image
    const location = req.body.location
    const phone = req.body.phone
    const googleMap = req.body.google_map
    const rating = req.body.rating
    const description = req.body.description
    return Todo.findById(id)
        //如果查詢成功，幫我儲存資料
        .then((restaurant) => {
            restaurant.name = name
            restaurant.nameEn = nameEn
            restaurant.category = category
            restaurant.image = image
            restaurant.location = location
            restaurant.phone = phone
            restaurant.googleMap = googleMap
            restaurant.rating = rating
            restaurant.description = description
            return restaurant.save()
        })
        //如果儲存成功，重新導向那筆的詳細頁面
        .then(() => res.redirect(`/todos/${id}`))
        .catch((error) => console.log(error))
})

//設定刪除的路由
router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Todo.findById(id)
        .then(todo => todo.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

module.exports = router