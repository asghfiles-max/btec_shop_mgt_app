const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

router.use(authenticate);
router.get('/', authorize('Super Admin','Manager','Cashier'), inventoryController.listInventory);
router.post('/', authorize('Super Admin','Manager'), inventoryController.createItem);
router.put('/:id', authorize('Super Admin','Manager'), inventoryController.updateStock);

module.exports = router;
