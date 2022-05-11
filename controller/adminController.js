const Proudct = require('../models/product');
const Vendor=require("../models/vendor");
const mongoose = require ('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// exports.creatproduct = async(req,res)=>{
//     const product = req.body;
//     const newproduct = new Proudct(product);
//     try{
//         await newproduct.save();
//         res.status(201).json(newproduct);
//     }catch(error){
//         res.status(400).json({message:error.message});
//     }
// }

exports.getvendorById = async(req,res)=>{
    try{
        const vendor  = await Vendor.findById({_id: req.params.id});
        res.status(200).json(vendor);
    }catch( error ){
        res.status(404).json({ message: error.message })
    }
}

exports.getproductapproved= async(req,res)=>{

    Proudct.find({ approved: false }, (err, qz) => {
        if (err) {
            console.log(error);
            res.json({ errormsg: "some error!" });
        }
        else {
            res.json({ msg: qz });
        }
    })

 exports.approvedupdate = async(req,res)=>{
        var productToUpdate = req.params.id;
        var approve=req.body;
        Proudct.update({ _id:mongoose.Types.ObjectId(productToUpdate)}, approve,  (err, result)=> {
            res.send(
                (err === null) ? {msg: 'sucess',approve } : {msg: err}
            );
        });
    }
    
    // try{
    //     console.log("vendorid",req.body);
    //     const product  = await Proudct.find(r);
    //     console.log("vendor",req.body);
    //     res.status(200).json(product);
    // }catch( error ){
    //     res.status(404).json({ message: error.message })
    // }
}

exports.updatevendor = async(req,res)=>{
    var productToUpdate = req.params.id;
    var data=req.body;
    Vendor.update({ _id:mongoose.Types.ObjectId(productToUpdate)}, data,  (err, result)=> {
        res.send(
            (err === null) ? {msg: 'sucess',data } : {msg: err}
        );
    });
}

exports.deletevendor = async(req,res)=>{
    try{
        await Vendor.deleteOne({_id: req.params.id});
        res.status(201).json("product deleted Successfully");
    } catch (error){
        res.status(409).json({ message: error.message});     
    }
}

exports.verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("unauthorized req")
    }
    let token = req.headers.authorization.split(' ')[1]
    // console.log(token);
    if (token == 'null') {
        return res.status(401).send("unauthorized req")
    }
    let payload = jwt.verify(token, 'secretkey')
    if (!payload) {
        return res.status(401).send("unauthorized req")
    }
    req.userId = payload.subject
    req.email = payload.email;
    next()
}