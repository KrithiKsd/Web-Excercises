const express = require('express');
const controller = require('../controllers/tradeController');
const {isLoggedIn, isAuthor}= require('../middlewares/auth');
const {validateId}= require('../middlewares/validator');
const { validateStory, validationResult, validateResult } = require('../middlewares/validator');

const router = express.Router();

router.get('/', controller.trades);
//router.get('/new', controller.trades);

router.post('/', isLoggedIn, validateStory, controller.create);

router.get('/:id', validateId, controller.show);

router.get('/:id/edit', validateId, isLoggedIn, isAuthor,validateStory, controller.edit);

router.put('/:id', validateId, isLoggedIn, isAuthor,validateStory, controller.update);

router.delete('/:id', validateId, isLoggedIn, isAuthor, controller.delete);

module.exports=router;