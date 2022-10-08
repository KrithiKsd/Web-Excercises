//require modules
const express= require('express');
const morgan=require('morgan');
const mainRoutes = require('./routes/mainRoute');
const tradeRoutes = require('./routes/tradeRoute');
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

app.use('/',mainRoutes);
app.use('/trades',tradeRoutes);

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