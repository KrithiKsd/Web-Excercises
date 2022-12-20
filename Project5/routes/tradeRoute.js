const express = require('express');
const controller = require('../controllers/tradeController');
const {isLoggedIn, isAuthor,isNotAuthor,isOfferCreator, isNotOfferCreator}= require('../middlewares/auth');
const {validateId, validateTradeItem, validateStatus, validateResult, validateCategory} = require('../middlewares/validator');


const router = express.Router();

router.get('/', controller.trades);

router.post('/', isLoggedIn,validateTradeItem, validateCategory, validateStatus, validateResult, controller.create);

router.get('/:id', validateId, controller.show);

router.get('/:id/edit', validateId, isLoggedIn, isAuthor, controller.edit);

router.put('/:id', validateId, isLoggedIn, isAuthor,validateTradeItem, validateCategory,validateStatus,validateResult, controller.update);

router.delete('/:id', validateId, isLoggedIn, isAuthor, controller.delete);

router.get('/:id/trade', validateId, isLoggedIn, isNotAuthor, controller.trade);

router.post('/:id/watch',validateId, isLoggedIn, isNotAuthor, controller.watch);

router.put('/:id/unwatch', validateId, isLoggedIn, isNotAuthor, controller.unwatch);

router.put('/:id/trade', validateId, isLoggedIn, isNotAuthor, controller.offer);

router.get('/:id/manage', validateId, isLoggedIn, controller.manageOffer);

router.put('/:id/acceptOffer', validateId, isLoggedIn, isNotOfferCreator, controller.acceptOffer);

router.delete('/:id/cancelOffer', validateId, isLoggedIn, isOfferCreator, controller.cancelOffer);

router.delete('/:id/rejectOffer', validateId, isLoggedIn, isNotOfferCreator, controller.rejectOffer);

module.exports=router;