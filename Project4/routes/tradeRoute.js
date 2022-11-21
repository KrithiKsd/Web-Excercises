const express = require('express');
const controller = require('../controllers/tradeController');
const {isLoggedIn, isAuthor}= require('../middlewares/auth');
const {validateId}= require('../middlewares/validator');

const router = express.Router();

router.get('/', controller.trades);

router.post('/', isLoggedIn, controller.create);

router.get('/:id', validateId, controller.show);

router.get('/:id/edit', validateId, isLoggedIn, isAuthor, controller.edit);

router.put('/:id', validateId, isLoggedIn, isAuthor, controller.update);

router.delete('/:id', validateId, isLoggedIn, isAuthor, controller.delete);

module.exports=router;