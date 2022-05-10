const Proudct = require('../models/product');
const mongoose = require ('mongoose');

exports.creatproduct = async(req,res)=>{
    const product = req.body;
    const newproduct = new Proudct(product);
    try{
        await newproduct.save();
        res.status(201).json(newproduct);
    }catch(error){
        res.status(400).json({message:error.message});
    }
}

exports.getproduct = async(req,res)=>{
    try{
        const product  = await Proudct.find({ approved: true });
        res.status(200).json(product);
    }catch( error ){
        res.status(404).json({ message: error.message })
    }
}


exports.updateproduct = async(req,res)=>{
    var productToUpdate = req.params.id;
    var data=req.body;
  
    Proudct.update({ _id:mongoose.Types.ObjectId(productToUpdate)}, data,  (err, result)=> {
        res.send(
            (err === null) ? {msg: 'sucess',data } : {msg: err}
        );
    });
}

exports.deleteproduct = async(req,res)=>{
    try{
        await Proudct.deleteOne({_id: req.params.id});
        res.status(201).json("product deleted Successfully");
    } catch (error){
        res.status(409).json({ message: error.message});     
    }
}