const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const morgan = require('morgan')
const { PORT, MONGO_URL } = require('./config')

const app = express()

// database connection
mongoose.connect(MONGO_URL)
.then(()=>{
    console.log('database ulandi...')
})
.catch((err)=>{
    console.log(err)
})

// view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload())
app.use('/public', express.static(path.join(__dirname, 'public')));

// all routes
fs.readdir(path.join(__dirname, 'routes'), (err, files)=>{
    if(!err){
        files.forEach(file => {
            const RouterPath = path.join(__dirname, 'routes', file);
            const Router = require(RouterPath);
            if(Router.router && Router.path){
               app.use(Router.path, Router.router);
            }
           
        })
    }
    
})

// pot connection
app.listen(PORT, ()=>{
    console.log('Server is listening on port ' + PORT)
})