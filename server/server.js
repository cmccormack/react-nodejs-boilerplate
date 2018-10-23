const path = require("path")
const helmet = require("helmet")
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })


///////////////////////////////////////////////////////////
//  Configure and connect to MongoDB database
///////////////////////////////////////////////////////////
const { dbuser, dbpw, dbhost, dbname } = process.env
mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false)
mongoose.connect(`mongodb://${dbuser}:${dbpw}@${dbhost}/${dbname}`, { useNewUrlParser: true })

// The connection used by default for every model created using mongoose.model
const db = mongoose.connection
db.on('error', err => {
  console.error(`Mongoose default connection error: ${err}`)
})
db.once('open', () => {
  console.info(`Mongoose default connection opened [${dbname}]`)
})


///////////////////////////////////////////////////////////
//  Initialize Express and configure Middleware
///////////////////////////////////////////////////////////
const app = express()
app.set("port", process.env.PORT || 3001)
app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'pug')
app.set("title", "Anonymous Message Board")
app.set("header", "Anonymous Message Board")


// Configure static content serving
app.use(express.static(path.resolve(__dirname, "views")))

app.use(bodyParser.urlencoded({ extended: false, }))
app.use(bodyParser.json())


// Configure security using Helmetjs
app.use(helmet())


// Initialize routes
require('./routes/routes.js')(app)


///////////////////////////////////////////////////////////
//  Start Express Server
///////////////////////////////////////////////////////////
const server = app.listen(app.get("port"), () => {
    const {port, address, } = server.address()
    console.info(`Express server started on ${address}:${port}`)
  })
