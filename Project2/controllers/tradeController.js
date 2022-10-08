const model = require('../models/item');
const { DateTime } = require("luxon");

exports.trades = (req, res, next) => {
    let grouped = model.allItemsByCategory();
    console.log(grouped);
    res.render('trades',{grouped});
};

exports.create = (req, res, next) => {
    let item= req.body;
    console.log(item);
    console.log("Item at create: "+item);
    model.save(item);
    res.redirect('/trades');
};

exports.show = (req, res, next) => {
   
    /*let id = req.params.id;
    console.log(id);
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid item id');
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .then(item=>{
        if(item){
            return res.render('trade', {item});
        } else {
            let err = new Error('Cannot find an item with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));*/

    let id = req.params.id;
    let item= model.findById(id);
    console.log(item);
    if(item){
          res.render('trade', {item});
     }else{
      let err = new Error('Cannot find a item with id'+ id);
      err.status=404;
      next(err);
     }
};

exports.edit = (req, res, next) => {
    /*let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid item id');
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .then(item=>{
        if(item) {
            return res.render('edit', {item});
        } else {
            let err = new Error('Cannot find an item with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));*/

    let id = req.params.id;
    let item= model.findById(id);
    if(item){
          res.render('edit', {item});
     }else{
        let err = new Error('Cannot find a item with id'+ id);
        err.status=404;
        next(err);
      }
};

exports.update = (req, res, next) => {
   /* let connection = req.body;
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid item id');
        err.status = 400;
        return next(err);
    }
    model.findByIdAndUpdate(id, connection, {useFindAndModify: false, runValidators: true})
    .then(item=>{
        if(item) {
            res.redirect('/trades/'+id);
        } else {
            let err = new Error('Cannot find an item with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=> {
        if(err.name === 'ValidationError')
            err.status = 400;
        next(err);
    });*/
    let item= req.body;
    let id= req.params.id;
    console.log(item);
    console.log(id);
    if(model.updateById(id,item)){
        res.redirect('/trades/'+id);
    }else{
        let err = new Error('Cannot find a item with id'+ id);
        err.status=404;
        next(err);
    }
};

exports.delete = (req, res, next) => {
   /* let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid item id');
        err.status = 400;
        return next(err);
    }
    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(item =>{
        if(item) {
            res.redirect('/trades');
        } else {
            let err = new Error('Cannot find an item with id ' + id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));*/

    let id= req.params.id;
    if(model.deleteById(id)){
        res.redirect('/trades');
    }else{
        let err = new Error('Cannot find a item with id'+ id);
        err.status=404;
        next(err);
    }
};

