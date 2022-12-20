const model = require('../models/item');
const { DateTime } = require("luxon");
const {isEmpty} = require('lodash');
const _ = require("lodash");
const Offer = require('../models/offer');
const User = require('../models/user');
const { off } = require('../models/item');


exports.trades = (req, res, next) => {
   
    model.find().then(items=>{
        let grouped = allItemsByCategory(items);
        res.render('trades',{grouped});
    })
   
};

//method to get all trade items based on category
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

    model.findById(id)
    .then(item=>{
        if(item){
            //console.log('item****'+item);
            if(item.offerId){
                console.log('offer id****'+item.offerId);
                Offer.findById(item.offerId)
               .then(offerItem => {
                 console.log('offerItem**'+offerItem);
              model.updateMany({
            "_id": {$in: [offerItem.itemId, offerItem.exchangeItemId]}
        }, {status: "Available", offerId: null})
        .then(result => {
            Offer.findByIdAndDelete(offerItem.id, {useFindAndModify: false, runValidators: true})
        });
        });
        }
       }
    });

    //just used useFindAndModify here, where it's not really needed!
    model.findByIdAndDelete(id, {useFindAndModify:false, runValidators: true})
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

exports.watch = (req, res, next) => {  
    const id = req.params.id;
    
    model.findById(id)
    .then(item => {
        if(!item.watchedBy.includes(req.session.user)) {
            item.watchedBy.push(req.session.user._id);
        }
        model.findByIdAndUpdate(id, item, {useFindAndModify: false, runValidators: true})
        .then(watchedItem => {
            return res.redirect('/users/profile');
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
};

exports.unwatch = (req, res, next) => {  
    const id = req.params.id;
    model.findById(id)
    .then(item => {
        const watchIndex = item.watchedBy.indexOf(req.session.user._id);
        if(watchIndex !== -1) {
            item.watchedBy.splice(watchIndex, 1);
        }
        model.findByIdAndUpdate(id, item, {useFindAndModify: false, runValidators: true})
        .then(watchedItem => {
            return res.redirect('back');
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
};
exports.trade = (req, res, next) => { 
    let exchangeItem = {id: req.params.id };
    let id = req.session.user._id;
    Promise.all([User.findById(id) , model.find({author: id, status: "Available" })])
    .then(results => {
        [user, items] = results;
        res.render('./user/userItems', {user, items, exchangeItem });  
        
    })
    .catch(err=>next(err));
};

exports.offer = (req, res, next) => { 
    let offer = new Offer(req.body);
    offer.exchangeItemId = req.params.id;
    offer.userId = req.session.user._id;
    offer.save()
    .then(offerItem => {
        model.updateMany({
            "_id": {$in: [offer.itemId, offer.exchangeItemId]}
        }, {status: "Pending", "offerId": offerItem.id})
        .then(result => {
            req.flash('success', 'Trade Offer has been created successfully!');
            return res.redirect('/users/profile');
        })
        .catch(err => next(err))
    })
    .catch(err => {
        next(err);
    });
};

exports.manageOffer = (req, res, next) => { 
    const userId = req.session.user._id;
    Offer.findById(req.params.id)
    .then(offerItem => {
        if(offerItem) {
            model.find({"_id": {$in: [offerItem.itemId, offerItem.exchangeItemId]}})
            .then(result => {
                if (result && result.length === 2) {
                    const user = { isOfferInitiator: offerItem.userId == userId ? true: false};
                    let item1, item2 = null;
                    if(result[0].author == userId) {
                        item1 = result[0];
                        item2 = result[1];
                    } else {
                        item1 = result[1];
                        item2 = result[0];
                    }
                    res.render('./offer/manage', {user, item1, item2, offerItem});
                } else {
                    let err = new Error('Cannot find item with id '+ userId)
                    err.status = 404;
                    next(err);
                }
        
            })
        } else {
            let err = new Error('Cannot find the offer associated with this Item')
            err.status = 404;
            next(err);
        } 
    })      
    .catch(err => next(err))
};
exports.acceptOffer = (req, res, next) => { 
    Offer.findById(req.params.id)
    .then(offerItem => {
        model.updateMany({
            "_id": {$in: [offerItem.itemId, offerItem.exchangeItemId]}
        }, {status: "Traded"})
        .then(result => {
           return res.redirect('/users/profile');
        })
        .catch(err => next(err))
    })
    .catch(err => {
        next(err);
    });
};
exports.cancelOffer = (req, res, next) => { 
    console.log('request params id**'+req.params.id);
    Offer.findById(req.params.id)
    .then(offerItem => {
        model.updateMany({
            "_id": {$in: [offerItem.itemId, offerItem.exchangeItemId]}
        }, {status: "Available", offerId: null})
        .then(result => {
            Offer.findByIdAndDelete(offerItem.id, {useFindAndModify: false, runValidators: true})
            .then(result => {
                return res.redirect('/users/profile');
            })
            .catch(err => next(err));
        })
        })
        .catch(err => next(err))
};

exports.rejectOffer = (req, res, next) => { 
    Offer.findById(req.params.id)
    .then(offerItem => {
        model.updateMany({
            "_id": {$in: [offerItem.itemId, offerItem.exchangeItemId]}
        }, {status: "Available", offerId: null})
        .then(result => {
            Offer.findByIdAndDelete(offerItem.id, {useFindAndModify: false, runValidators: true})
            .then(result => {
                return res.redirect('/users/profile');
            })
            .catch(err => next(err));
        })
        .catch(err => next(err))
    })
    .catch(err => {
        next(err);
    });
};

