const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
// 載入 method-override
const methodOverride = require('method-override')
const session = require('express-session')
// 引用路由器
const routes = require('./routes')
const usePassport = require('./config/passport')
//設定連線
require('./config/mongoose')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

usePassport(app)

//設定引擎和路由
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'), bodyParser.urlencoded({ extended: true }), methodOverride('_method'), routes)





//設置伺服器的監聽器
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

