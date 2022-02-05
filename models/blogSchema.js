const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        min:10,
        max:200,
        required:true
    },

    body:{
        type:String,
        min:200,
        required:true
    },
    image_path:{
        type:String,
        required:true
    },


},{timestamps:true})

const Blogs = mongoose.model('blog', BlogSchema)
module.exports = Blogs