var express = require('express')
var router = express.Router()
// const ProductController = require('../controller/productController')
// const VendorProductController=require('../controller/vendorproductController');
const AdminController =require("../controller/adminController");



router.get('/getapprovedproduct',AdminController.verifyToken,AdminController.getproductapproved);

// router.post('/testdone', apiController.testDone)


module.exports = router
