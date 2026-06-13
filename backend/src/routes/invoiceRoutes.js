const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

router.use(authenticate);
router.get('/', authorize('Super Admin','Manager','Cashier'), invoiceController.getInvoice);
router.post('/', authorize('Super Admin','Manager','Cashier'), invoiceController.createInvoice);
router.get('/:id/pdf', authorize('Super Admin','Manager','Cashier'), invoiceController.downloadInvoicePdf);

module.exports = router;
