const express = require('express')
const advertsController = require('../Controllers/advertsController');
const Auth = require('../Middleware/auth')
const router = express.Router();

//Create new advert
router.post('/upload', Auth.userAuth, advertsController.createAdvert)


//Get all approved adverts
router.get('/', advertsController.getAllApprovedAdverts)

//search adverts
router.get('/search', advertsController.searchAdverts)
//Get approved adverts by category
router.get('/:category', advertsController.getAdvertsByCategory)



module.exports = router