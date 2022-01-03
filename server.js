const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const sequelize = require('./config/connection.js')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const routes = require('./controllers/index')
const path = require('path')
const helpers = require('./utils/helpers')

const app = express()

const PORT = process.env.PORT || 3000

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

app.use(session(sess))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(routes)


const hbs = exphbs.create({ helpers })
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')



// app.get()

sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log("Now listening"))
})