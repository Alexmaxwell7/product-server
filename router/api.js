var express = require('express')
var router = express.Router()
const apiController = require('../controller/apiController')




router.post('/login', apiController.AdminlogIn)
router.post('/register',apiController.registervendor);
router.post('/vendorlogin',apiController.vendorlogIn);
router.get('/getallvendors',apiController.verifyToken,apiController.getallvendor);
router.get('/check', apiController.verifyToken, apiController.getCheck)



module.exports = router
