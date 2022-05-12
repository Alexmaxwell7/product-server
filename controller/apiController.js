const Admin = require('../models/admin')
const Vendor = require("../models/vendor");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.getCheck = (req, res, next) => {
    res.json({ msg: "All ok" })
}

//getall vendors 
exports.getallvendor = async(req,res)=>{
    try{
        const vendor  = await Vendor.find();
        res.status(200).json(vendor);
    }catch( error ){
        res.status(404).json({ message: error.message })
    }
}

//admin:>------------- <add user----------------------------------->
exports.registervendor = async (req, res) => {
    var user = new Vendor({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        district:req.body.district,
        vendorId:req.body.vendorId,
        password: await bcrypt.hash(req.body.password,12)
        // password:req.body.password
    });
    Vendor.find({ email: req.body.email }, (err, users) => {

        if (err) {
            console.log("err in finding email ");
            res.json({ msg: "some error!" });
        }
        if (users.length != 0) {
            console.log("already user with this email");
            res.json({ msg: "already user exist with this email!" });
        }
        else {
            user.save((error, registeredUser) => {
                if (error) {
                    console.log(error);
                    res.json({ msg: "some error!" });
                }
                else {
                    let payload = { subject: registeredUser._id }
                    let token = jwt.sign(payload, 'secretkey')
                    res.status(200).json({ token: token,success:true })
                }
            })
        }
    })
}
exports.vendorlogIn = (req, res) => {
    console.log(req.body);
    Vendor.findOne({ email: req.body.email }, (err, user) => {
        console.log("user",user);
        if (err) {
            console.log(err)
            res.json({ msg: "Somthing went wrong" });
        }
        else {
            if (!user) {
                res.json({ msg: 'Invalid Email!!' })
            }
            else {
                bcrypt.compare(req.body.password, user.password).then(match => {
                    if (match) {
                        console.log("login sucesssss");
                        let payload = { subject: user._id,email:user.email }
                        let token = jwt.sign(payload, 'secretkey')
                        res.status(200).json({ token: token, role: user.role,email: user.email,name:user.name,district:user.district,vendorId:user.vendorId })
                    }
                    else {
                        console.log("incoreect passss");
                        res.json({ msg: 'Incorrect password!!' })
                    }
                }).catch(err => {
                    console.log("somthing wrong");
                    res.json({ msg: 'Somthing went wrong' })
                })
            }
        }
    })
}
exports.AdminlogIn = async(req, res) => {
    console.log("logindata",req);
    console.log("password",req.body.password)
    const passwordText = 'Admin123'
    const hashedPassword = await  bcrypt.hash(passwordText, 10)
    Admin.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.log(err)
            res.json({ msg: "Somthing went wrong" });
        }
        else {
            if (user=='admin@gmail.com') {
                res.json({ msg: 'Invalid Email!!' })
            }
            else {
                bcrypt.compare(req.body.password, hashedPassword).then(match => {
                    if (match) {
                        console.log("login sucesssss");
                        console.log("playload before");
                        let payload = { email:'admin@gmail.com' }
                        console.log("payload",payload);
                        let token = jwt.sign(payload, 'secretkey')
                        res.status(200).json({ token: token })
                    }
                    else {
                        console.log("incoreect passss");
                        res.json({ msg: 'Incorrect password!!' })
                    }
                }).catch(err => {
                    console.log("somthing wrong");
                    res.json({ msg: 'Somthing went wrong' })
                })
            }
        }
    })
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

