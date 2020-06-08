const mongoose = require('mongoose')

const IngredientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please provide a name of ingredient"]
    },
    image:{
        type:String
    },
}, { timestamps: true })
mongoose.model("Ingredient", IngredientSchema)

module.exports = IngredientSchema;


