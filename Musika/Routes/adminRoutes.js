const express = require('express');
const Auth = require('../Middleware/auth')
const router = express.Router();
const adminController = require('../Controllers/adminController')

router.get('/pending', Auth.adminAuth, adminController.getAllPendingAdverts)
router.put('/approve/:id', Auth.adminAuth, adminController.approveAdvert)
router.delete('/delete/:id', Auth.adminAuth, adminController.deleteAdvert)
module.exports = router;