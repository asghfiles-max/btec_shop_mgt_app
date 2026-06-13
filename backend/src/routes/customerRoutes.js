const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

router.use(authenticate);
router.get('/', authorize('Super Admin','Manager','Cashier'), customerController.listCustomers);
router.post('/', authorize('Super Admin','Manager'), customerController.createCustomer);
router.put('/:id', authorize('Super Admin','Manager'), customerController.updateCustomer);
router.delete('/:id', authorize('Super Admin'), customerController.deleteCustomer);
router.get('/:id/history', authorize('Super Admin','Manager','Cashier'), customerController.customerHistory);

module.exports = router;
