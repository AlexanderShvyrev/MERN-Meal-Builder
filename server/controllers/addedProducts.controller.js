const express = require('express');
const mongoose = require('mongoose');
const addedProductSchema = require("../models/addedProduct.model")
const addedProduct = mongoose.model("addedProduct", addedProductSchema);




module.exports.createOne = (req,res)=>{
    addedProduct.create(req.body)
        .then(x => res.json( x ))
        .catch(err => res.json(err));
}


module.exports.getAll = (req, res) => {
    addedProduct.find({})
        .then(products => res.json(products))
        .catch(err => res.json(err));
};

module.exports.getOne = (req, res) => {
    addedProduct.findById({ _id: req.params.id })
        .then(prod => res.json(prod))
        .catch(err => res.json(err));
};

module.exports.updateOne = (req, res) => {
    addedProduct.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(updated => res.json(updated))
        .catch(err => res.json(err));
};

module.exports.deleteOne = (req, res) => {
    addedProduct.findByIdAndDelete({ _id: req.params.id })
        .then(deleted => res.json(deleted))
        .catch(err => res.json(err));
};

