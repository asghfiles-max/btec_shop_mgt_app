const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

router.use(authenticate);
router.get('/', authorize('Super Admin','Manager','Cashier'), paymentController.listPayments);
router.get('/:id', authorize('Super Admin','Manager','Cashier'), paymentController.getPayment);
router.post('/', authorize('Super Admin','Manager','Cashier'), paymentController.createPayment);
router.put('/:id', authorize('Super Admin','Manager'), paymentController.updatePayment);

module.exports = router;
