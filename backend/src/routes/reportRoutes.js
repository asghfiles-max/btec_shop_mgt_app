const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

router.use(authenticate);
router.get('/daily-sales', authorize('Super Admin','Manager'), reportController.dailySales);
router.get('/monthly-sales', authorize('Super Admin','Manager'), reportController.monthlySales);
router.get('/profit-analysis', authorize('Super Admin','Manager'), reportController.profitAnalysis);
router.get('/inventory-status', authorize('Super Admin','Manager'), reportController.inventoryStatus);

module.exports = router;
