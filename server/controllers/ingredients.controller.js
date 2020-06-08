const express = require('express');
const mongoose = require('mongoose');
const Ingredient = mongoose.model("Ingredient");





module.exports.createOne = (req,res)=>{
    console.log("in controller");
    Ingredient.create(req.body)
        .then(x => res.json( x ))
        .catch(err => res.json(err));
}


module.exports.getAll = (req, res) => {
    Ingredient.find({})
        .then(Ingredis => res.json(Ingredis))
        .catch(err => res.json(err));
};

module.exports.getOne = (req, res) => {``
    Ingredient.findById({ _id: req.params.id })
        .then(ing => res.json(ing))
        .catch(err => res.json(err));
};

module.exports.updateOne = (req, res) => {
    Ingredient.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(updated => res.json(updated))
        .catch(err => res.json(err));
};

module.exports.deleteOne = (req, res) => {
    Ingredient.findByIdAndDelete({ _id: req.params.id })
        .then(deleted => res.json(deleted))
        .catch(err => res.json(err));
};


