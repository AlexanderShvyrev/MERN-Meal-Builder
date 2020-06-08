const mongoose = require('mongoose'),
    IngredientSchema=require('./ingredient.model');

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please provide a name of a product"]
    },
    basePrice:{
        type:Number,
        required:[true, "What's the base price?"]
    },
    image:{
        type:String
    },
    ingredients: [IngredientSchema]
}, {timestamps:true})

module.exports = mongoose.model('Product', ProductSchema);

