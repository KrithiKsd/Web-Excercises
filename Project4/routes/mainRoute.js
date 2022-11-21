const express = require('express');
const router = express.Router();
const controller = require('../controllers/mainController');
const {isLoggedIn}= require('../middlewares/auth');

router.get('/', controller.index);

router.get('/contact', controller.contact);

router.get('/about', controller.about);

router.get('/new', isLoggedIn, controller.newtrade);

module.exports=router; 