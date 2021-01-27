if(process.env.NODE_ENV!=='production'){
  require('dotenv').config()
  
}


const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
app.set('view engine','ejs')
app.set('views','./views')
app.set('layout','layouts/layout')

app.use(express.static('public'))
// app.use('/styles',express.static('./public/css/style.css'))
app.use(expressLayouts)
app.use(bodyParser.urlencoded({limit:"10mb",extended:false}))

const mongoose =  require('mongoose')
const { use } = require('./routes/index.js')
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology: true})

const db = mongoose.connection

db.on('error',error=>console.error(error))
db.once('open',()=>console.log('Connected to Mongoose'))

const PORT = process.env.PORT || 5001

app.use('/',require('./routes/index.js'))
app.use('/authors',require('./routes/authors'))

app.listen(PORT,()=>console.log(`server started at ${PORT}`))