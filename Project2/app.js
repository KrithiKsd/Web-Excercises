//require modules
const express= require('express');
const morgan=require('morgan');
const storyRoutes = require('./routes/storyRoutes');
const methodOverride = require('method-override');
const { render } = require('ejs');

//create app
const app=  express();

//configure app
let port= 3000;
let host='localhost';
app.set('view engine','ejs');
app.engine('ejs', require('ejs').__express);

app.use(methodOverride('_method'));

//mount middleware fun
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'));

 //set up routes
app.get('/',(req,res)=>{
    res.render('index.ejs');
});

//request with this prefix that is /stories will be sent to this router 
app.use('/stories',storyRoutes);

//error handling
app.use((req,res,next)=>{
   let err= new Error('The server can not locate '+req.url)
   err.status= 404;
   next(err);
});

//error handling 
app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status){
        err.status= 500;
        err.message =("Internal Service Error!");
    }
        res.status(err.status);
        res.render('error',{error:err});
    
});

 //start the server
 app.listen(port, host, ()=>{
    console.log('Server is running on port',port);
 })