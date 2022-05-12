const Proudct = require("../models/product");
const mongoose = require("mongoose");
const to = require("await-to-js").default;
//create product for vendor role

exports.creatproduct = async (req, res) => {
  const product = req.body;
  const newproduct = new Proudct(product);
  try {
    await newproduct.save();
    res.status(201).json(newproduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// exports.getExpenses = async (req, res) => {
//     let data, err;
//     [err, data] = await to(
//       Expenses.aggregate([
//         {
//           $lookup: {
//             from: "expensestypes",
//             localField: "expenses_Type",
//             foreignField: "type",
//             as: "ExpensesType_Data",
//           },
//         },
//       ])
//     );
//     if (!data)
//       return res
//         .status(404)
//         .json({ status: false, message: "Data Details not found." });
//     else return res.status(200).json({ status: true, data });
//   };
exports.getlookup = async (req, res) => {
  let data, err;
  [err, data] = await to(
    Proudct.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "vendorId",
          foreignField: "vendorId",
          as: "lookupdata",
        },
      },
    ])
  );
  if (!data)
    return res
      .status(404)
      .json({ status: false, message: "Data Details not found." });
  else return res.status(200).json({ status: true, data });
};

// specif. vendor- get added products

exports.getproductbyId = async (req, res) => {
  Proudct.find({ vendorId: req.params.id }, (err, qz) => {
    if (err) {
      console.log(error);
      res.json({ errormsg: "some error!" });
    } else {
      res.json({ msg: qz });
    }
  });
};

//update product for vendor role
exports.updateproduct = async (req, res) => {
  var productToUpdate = req.params.id;
  var data = req.body;

  Proudct.update(
    { _id: mongoose.Types.ObjectId(productToUpdate) },
    data,
    (err, result) => {
      res.send(err === null ? { msg: "sucess", data } : { msg: err });
    }
  );
};

// delete product for vendor role
exports.deleteproduct = async (req, res) => {
  try {
    await Proudct.deleteOne({ _id: req.params.id });
    res.status(201).json("product deleted Successfully");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
