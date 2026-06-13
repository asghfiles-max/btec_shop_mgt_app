const express = require('express');
const router = express.Router();
const auditController = require('../controllers/auditController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

router.use(authenticate);
router.get('/', authorize('Super Admin','Manager'), auditController.getAuditLogs);

module.exports = router;
