const model = require('../models/user');
const Item= require('../models/item');
const Offer = require('../models/offer');

exports.new = (req, res)=>{
    return res.render('./user/new');
};

exports.create = (req, res, next)=>{
    
        //res.send('Created a new item');
        let user = new model(req.body);//create a new item document
        user.save()//insert the document to the database
        .then(()=>{
            req.flash('success', 'Registered succesfully!');  
            res.redirect('/users/login');
        }).catch(err=>{
            if(err.name === 'ValidationError' ) {
                req.flash('error', err.message);  
                return res.redirect('/users/new');
            }

            if(err.code === 11000) {
                req.flash('error', 'Email has been used');  
                return res.redirect('/users/new');
            }
        
            next(err);
        }); 
    
};

exports.getUserLogin = (req, res, next) => {
   
        return res.render('./user/login');
}

exports.login = (req, res, next)=>{
   
        let email = req.body.email;
        let password = req.body.password;
        model.findOne({ email: email })
        .then(user => {
            if (!user) {
                console.log('wrong email address');
                req.flash('error', 'wrong email address');  
                res.redirect('/users/login');
                } else {
                user.comparePassword(password)
                .then(result=>{
                    if(result) {
                        req.session.user = user;
                        req.session.userName = user.firstName + " " + user.lastName;
                        req.flash('success', 'You have successfully logged in');
                        res.redirect('/');
                } else {
                    req.flash('error', 'wrong password');      
                    res.redirect('/users/login');
                }
                });     
            }     
        })
        .catch(err => next(err));
   
};

exports.profile = (req, res, next)=>{
    let id = req.session.user._id;
    //let id = req.session.user._id;
    //console.log('id**'+id);
    Promise.all([model.findById(id) , Item.find({author:id }), Item.find(),  Offer.find({userId: id })])
    .then(results => {
        [user, items, allItems, offerItems] = results;
        //console.log('allItems**'+allItems);
        const exchangeItems = offerItems.map(({ exchangeItemId }) => exchangeItemId.valueOf());
        const offers = allItems.filter(item => exchangeItems.includes(item.id) && item.status == "Pending");
        const watchList = allItems.filter(item => item.watchedBy.includes(id));
        //console.log('watchlist**'+watchList);
        res.render('./user/profile', {user, items, offers, watchList})
    })
    .catch(err=>next(err));
    
};


exports.logout = (req, res, next)=>{
    req.session.destroy(err=>{
        if(err) 
           return next(err);
       else
            res.redirect('/');  
    });
   
 };



