var mongoose = require('mongoose')
var productsSchema = mongoose.Schema({
    vendorId: {
        type: String,
        required: true
    },
    productimage: {
        type: String,
        required: true
    },
    producttitle:{
        type: String, 
        required: true
    },
    productdescription:{
        type: String, 
        required: true
    },
    productprice:{
        type: String, 
        required: true
    },
    approved:{
        type:Boolean,
        default:false
    }
})
module.exports = mongoose.model('products',productsSchema)

