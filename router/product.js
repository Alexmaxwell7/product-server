var express = require('express')
var router = express.Router()
const ProductController = require('../controller/productController')
const VendorProductController=require('../controller/vendorproductController');



router.post('/createproduct',ProductController.creatproduct);
router.get('/getproduct',ProductController.getproduct);
router.put('/updateproduct/:id',ProductController.updateproduct);
router.delete('/deleteproduct/:id',ProductController.deleteproduct);


//vendor product view
router.get('/vendorpostedproduct/:id',VendorProductController.getproductbyId);
// router.post('/testdone', apiController.testDone)


module.exports = router
