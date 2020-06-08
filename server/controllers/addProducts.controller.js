const express = require('express');
const mongoose = require('mongoose');

const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product.model');





module.exports.createOne = (req,res)=>{

    Product.create(req.body)
        .then(x => res.json( x ))
        .catch(err => res.json(err));
}


module.exports.getAll = (req, res) => {
    Product.find({})
        .then(products => res.json(products))
        .catch(err => res.json(err));
};

module.exports.getOne = (req, res) => {
    Product.findById({ _id: req.params.id })
        .then(prod => res.json(prod))
        .catch(err => res.json(err));
};

module.exports.updateOne = (req, res) => {
    Product.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(updated => res.json(updated))
        .catch(err => res.json(err));
};

module.exports.deleteOne = (req, res) => {
    Product.findByIdAndDelete({ _id: req.params.id })
        .then(deleted => res.json(deleted))
        .catch(err => res.json(err));
};


// module.exports.createOne = (upload.single('image')), (req, res) => {
//     console.log("-------------++------------")
//     const url = req.protocol + '://' + req.get('host')
//     const product = new Product({
//         _id: req.params.id,
