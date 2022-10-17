const model = require('../models/item');
const { DateTime } = require("luxon");

exports.trades = (req, res, next) => {
    let grouped = model.allItemsByCategory();
    //console.log(grouped);
    res.render('trades',{grouped});
};

exports.create = (req, res, next) => {
    let item= req.body;
    //console.log(item);
    //console.log("Item at create: "+item);
    model.save(item);
    res.redirect('/trades');
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    let item= model.findById(id);
    //console.log(item);
    if(item){
          res.render('trade', {item});
     }else{
      let err = new Error('Cannot find a item with id'+ id);
      err.status=404;
      next(err);
     }
};

exports.edit = (req, res, next) => {
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
    let item= req.body;
    let id= req.params.id;
   // console.log(id);
    if(model.updateById(id,item)){
        res.redirect('/trades/'+id);
    }else{
        let err = new Error('Cannot find a item with id'+ id);
        err.status=404;
        next(err);
    }
};

exports.delete = (req, res, next) => {
    let id= req.params.id;
    if(model.deleteById(id)){
        res.redirect('/trades');
    }else{
        let err = new Error('Cannot find a item with id'+ id);
        err.status=404;
        next(err);
    }
};

