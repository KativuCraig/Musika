const express = require('express')
const userController = require('../Controllers/userController')
const authMiddleware = require('../Middleware/auth')
const router = express.Router();


router.get('/profile', authMiddleware.userAuth, userController.getProfile);
router.put('/profile', authMiddleware.userAuth, userController.updateProfile)
router.delete('/profile/delete/:id', authMiddleware.userAuth, userController.deleteProfile)
router.get('/profile/adverts', authMiddleware.userAuth, userController.getAdvertsByUser)


module.exports = router