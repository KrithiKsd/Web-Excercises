const {body} = require('express-validator');
const {validationResult} = require('express-validator');
var curdate =  new Date().toJSON().slice(0, 10);
//checks if the id is valid or not
exports.validateId = (req, res, next)=>{
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid trade id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
};

exports.validateSignUp = [body('firstName', 'First name cannot be empty').notEmpty().trim().escape(),
body('lastName', 'Last name cannot be empty').notEmpty().trim().escape(),
body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be atleast 8 characters and at most 64 characters').isLength({min: 8, max: 64})];

exports.validateLogIn = [body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be atleast 8 characters and at most 64 characters').isLength({min: 8, max: 64})];

exports.validateStory = [body('Name', 'Name cannot be empty').notEmpty().trim().escape(),
body('content', 'details must be atleast 10 characters').isLength({min: 8}).trim().escape()];


exports.validateResult = (req, res, next)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        errors.array().forEach(error=>{
            req.flash('error', error.msg);      
        });
        return res.redirect('back');
    } else {
        return next();
    }
}

exports.validateTradeItem = 
[body('name', 'Name cannot be empty').notEmpty().trim().escape(),
body('details', 'Details cannot be empty').notEmpty().trim().escape().isLength({min: 10}),
body('imageurl', 'Image cannot be empty').notEmpty().trim(),
body('suggestedAge', 'SuggestedAge cannot be empty').notEmpty().trim().escape(),
body('publishedBy', 'PublishedBy cannot be empty').notEmpty().trim().escape(),
body('date', 'Date cannot be empty and should be valid').notEmpty().trim().escape(),
body('date', 'Date should be after today').trim().escape().isAfter(curdate),
body('startTime', 'Start time cannot be empty').notEmpty().trim().escape(),
body('endTime', 'End time cannot be empty').notEmpty().trim().escape().custom((value, {req})=>{
    if(value<req.body.startTime){
        throw new Error('Ending time should be after starting time')
    } 
    else return true;
}),
];

exports.validateCategory = [body('category').exists().withMessage('category cannot be empty').if(body('category').exists()).isIn(['Strategy Games', 'Party Games', 'Thematic Games']).withMessage('Category can only be Strategy Games, Party Games or Thematic Games').notEmpty().escape().trim()];

exports.validateStatus = [body('status').exists().withMessage('status cannot be empty').if(body('status').exists()).isIn(['Available', 'Pending', 'Traded']).withMessage('status can only be Available, Pending or Traded').notEmpty().escape().trim()];
