const Item = require('../models/item');
//checks if the user is guest
exports.isGuest= (req,res,next)=>{
    if(!req.session.user){
       return next();
    }else{
        req.flash('error','You are logged in already');
        return res.redirect('/users/profile');
    }
};


//checks if the user is authenticated
exports.isLoggedIn = (req,res,next)=>{
    if(req.session.user){
        return next();
     }else{
         req.flash('error','You need to login first!');
         return res.redirect('/users/login');
     }
};

//check if the user is author of the item
exports.isAuthor = (req,res,next)=>{
    let id= req.params.id;
    Item.findById(id)
    .then(item=>{
        if(item){
            if(item.author._id== req.session.user._id){
                return next();
            }else{
                let err= new Error('Unauthorized to access the resource');
                err.status= 401;
                return next(err);
            }
        }
    })
    .catch(err=>next(err))
};