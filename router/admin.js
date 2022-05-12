var express = require('express')
var router = express.Router()
const AdminController =require("../controller/adminController");



router.get('/getapprovedproduct',AdminController.verifyToken,AdminController.getproductapproved);
router.put('/updatevendor/:id',AdminController.verifyToken,AdminController.updatevendor);
router.delete('/deletevendor/:id',AdminController.verifyToken,AdminController.deletevendor);
router.get('/getvendorbyid/:id',AdminController.verifyToken,AdminController.getvendorById);
router.put('/updateapproved/:id',AdminController.verifyToken,AdminController.approvedupdate);



module.exports = router
