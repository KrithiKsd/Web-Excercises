const express = require('express');
const router = express.Router();
const controller = require('../controllers/tradeController');

router.get('/', controller.trades);

router.post('/', controller.create);

router.get('/:id', controller.show);

router.get('/:id/edit', controller.edit);

router.put('/:id', controller.update);

router.delete('/:id', controller.delete);

module.exports=router;