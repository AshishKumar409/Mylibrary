const express = require('express')


const router = express.Router()


router.get('/',(req,res)=>{
  res.render('index')
})
router.get('/ora',(req,res)=>{
  res.send('<h1>ORA! ORA! ORA!</h1>')
})

module.exports = router