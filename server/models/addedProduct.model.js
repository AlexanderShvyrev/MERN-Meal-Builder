const mongoose = require('mongoose')

const addedProductSchema = new mongoose.Schema({
    addedName:{
        type:String
    },
    addedPrice:{
        type:Number       
    },
    addedIngredients: {
        type: Array
    },
    cust_id: {
        type: String
    }
}, {timestamps:true})

mongoose.model("addedProduct", addedProductSchema)

module.exports = addedProductSchema;