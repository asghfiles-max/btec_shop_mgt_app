const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

router.use(authenticate);
router.get('/', authorize('Super Admin','Manager'), userController.listUsers);
router.get('/:id', authorize('Super Admin','Manager'), userController.getUser);

module.exports = router;
