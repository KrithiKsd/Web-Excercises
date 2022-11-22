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

    if (!isEmpty(grouped))
        return grouped;
    else return false;
}

exports.create = (req, res, next) => {
    
    let item = new model(req.body); //create a new trade document
    //item.author= req.session.user;
    item.author= req.session.user._id;
    item.save()
    .then(()=> {
        req.flash('success', 'trade item has been created successfully');
        res.redirect('/trades');
    }).catch(err=>{
        if(err.name==='ValidationError'){
            req.flash('error', err.message);
            err.status=400;
        }
        next(err);
    });

};

exports.show = (req, res, next) => {

    let id = req.params.id;
    
    model.findById(id).populate('author','firstName lastName')
    .then(item=>{
        if(item){
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
   
    model.findById(id)
    .then(item=>{
        if(item){
            console.log(item);
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
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }

    //just used useFindAndModify here, where it's not really needed!
    model.findByIdAndUpdate(id, item, {useFindAndModify:false, runValidators:true})
    .then(item=>{
        if(item){
            //return res.redirect('/stories/'+id);
            req.flash('success', 'trade item has been updated successfully');
            return res.redirect('/trades/'+id);
        }else{
            let err = new Error('Cannot find a item with id ' + id);
            req.flash('error', err.message);
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
    //just used useFindAndModify here, where it's not really needed!
    model.findByIdAndDelete(id, {useFindAndModify:false})
    .then(item=>{
        if(item){
            req.flash('success', 'trade item has been deleted successfully');
            res.redirect('/trades');
        }else{
            let err = new Error('Cannot find a item with id ' + id);
            req.flash('error', err.message);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
   
};

