const router = require('express').Router()
const path = require('path')
const Blogs = require('../models/blogSchema')

router.get('/', async(req, res)=>{
    try {
        const blogs = await Blogs.find().sort({createdAt:-1})
        res.render('index', {
            blogs:blogs
        })
    } catch (error) {
        console.log(error)
    }
    res.render('index')
})

router.get('/admin', (req, res)=>{
    res.render('admin')
})

router.post('/admin', async(req, res)=>{
    try {
        const {title, main} = req.body
        if(!req.files|| req.files.length===0){
            throw new Error('Rasm yuklanishi shart!')
        }
        const image = req.files.image
        const imageType = image.mimetype.split('/')[0]
        const imageName = image.name.split('.')[0]
        const imageFormat = image.mimetype.split('/')[1]
        const imagePath = path.join('public', 'images', `${imageName}- ${image.md5}.${imageFormat}`)
        if(imageType==='image'||imageType==='vector'){
            await image.mv(imagePath)
        }
        const blog = await Blogs.create({
            title, 
            body:main,
            image_path:imagePath
        })
        res.redirect('/admin')
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async(req, res)=>{
    try {
        const id = req.params.id
        const blog = await Blogs.findOne({
            _id:id
        })
        res.render('single_post', {
            blog
        })
    } catch (error) {
        
    }
})


module.exports = {
    path : '/', router
}