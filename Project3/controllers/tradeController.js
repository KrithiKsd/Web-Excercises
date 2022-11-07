const model = require('../models/item');
const { DateTime } = require("luxon");
const {isEmpty} = require('lodash');
const _ = require("lodash");


exports.trades = (req, res, next) => {
   
    model.find().then(items=>{
        let grouped = allItemsByCategory(items);
        res.render('trades',{grouped});
    })
   
};


function allItemsByCategory(items){
    let grouped = _.reduce(items, (result, item) => {
        (result[item.category] || (result[item.category] = [])).push(item);
        return result;
    }, {});
    
   // console.log(grouped);

    if (!isEmpty(grouped))
        return grouped;
    else return false;
}

exports.create = (req, res, next) => {
    
    let item = new model(req.body); //create a new trade document
    item.save()
    .then(item=> res.redirect('/trades'))
    .catch(err=>{
        if(err.name==='ValidationError'){
            err.status=400;
        }
        next(err);
    });
};

exports.show = (req, res, next) => {

    let id = req.params.id;
    //an objectId is 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err=new Error('Invalid trade id');
        err.status=400;
        return next(err);
    }
    model.findById(id)
    .then(item=>{
        if(item){
           // return res.render('./story/show', {item});
           return res.render('trade', {item});
        }else {
            let err = new Error('Cannot find a item with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));   

};

exports.edit = (req, res, next) => {
    
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err=new Error('Invalid item id');
        err.status=400;
        return next(err);
    }
    model.findById(id)
    .then(item=>{
        if(item){
            console.log(item);
           // return  res.render('./story/edit', {item});
           return res.render('edit', {item});
        }else {
            let err = new Error('Cannot find a item with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
    
};

exports.update = (req, res, next) => {
  
    let item= req.body;
    let id= req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err=new Error('Invalid item id');
        err.status=400;
        return next(err);
    }

    //just used useFindAndModify here, where it's not really needed!
    model.findByIdAndUpdate(id, item, {useFindAndModify:false, runValidators:true})
    .then(item=>{
        if(item){
            //return res.redirect('/stories/'+id);
            return res.redirect('/trades/'+id);
        }else{
            let err = new Error('Cannot find a item with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>{
        if(err.name==='ValidationError'){
            err.status=400;

        }
        next(err)
    });
  
};

exports.delete = (req, res, next) => {
   
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err=new Error('Invalid item id');
        err.status=400;
        return next(err);
    }
    //just used useFindAndModify here, where it's not really needed!
    model.findByIdAndDelete(id, {useFindAndModify:false})
    .then(item=>{
        if(item){
            res.redirect('/trades');
        }else{
            let err = new Error('Cannot find a item with id ' + id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
   
};

