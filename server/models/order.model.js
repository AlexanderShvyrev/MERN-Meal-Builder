const mongoose = require('mongoose'),
    AddedProductSchema=require('./addedProduct.model');

const OrderSchema = new mongoose.Schema({
    customer:{
        type: String
    },
    totalPrice:{
        type:Number
    },
    products: [AddedProductSchema]
}, {timestamps:true})

module.exports = mongoose.model('Order', OrderSchema);