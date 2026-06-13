const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

router.use(authenticate);
router.get('/', authorize('Super Admin','Manager','Cashier'), productController.listProducts);
router.get('/:id', authorize('Super Admin','Manager','Cashier'), productController.getProduct);
router.post('/', authorize('Super Admin','Manager'), productController.createProduct);
router.put('/:id', authorize('Super Admin','Manager'), productController.updateProduct);

module.exports = router;
