const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

router.use(authenticate);
router.get('/', authorize('Super Admin','Manager','Cashier','Printing Operator','Designer'), orderController.listOrders);
router.post('/', authorize('Super Admin','Manager','Cashier'), orderController.createOrder);
router.get('/:id', authorize('Super Admin','Manager','Cashier','Printing Operator','Designer'), orderController.getOrder);
router.put('/:id', authorize('Super Admin','Manager'), orderController.updateOrder);

module.exports = router;
