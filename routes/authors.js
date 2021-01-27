const router = require('express').Router()
const Author = require('../models/author')


// all authors
router.get('/',async(req,res)=>{
  const specificAuthor ={}
  if(req.query.name!=null && req.query.name!=""){
    specificAuthor.name = new RegExp(req.query.name,'i')
  }
  try {
    const authors = await Author.find(specificAuthor)
    res.render('authors/index',{authors:authors ,specificAuthor:req.query})
  } catch (error) {
    res.redirect('/')
  }
 
})

//new author 
router.get('/new',(req,res)=>{
  res.render('authors/new',value="")
})

//create author
router.post('/',async(req,res)=>{
   const author = new Author({
    name:req.body.name})
  try {
    const newAuthor = await author.save()
   res.redirect('/authors') 
  } catch (error) {
    res.render('authors/new',{author:author,errorMessage:"error craeting author"})
  }

})


module.exports = router