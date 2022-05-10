var mongoose = require('mongoose')
var vendorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String, 
        required: true
    },
    role:{
        type: String, 
        required: true
    },
    district:{
        type: String, 
        required: true
    },
})
module.exports = mongoose.model('vendor',vendorSchema)

