const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/order.model');
const stripe = require('stripe')('SECRET_KEY')




module.exports.createOne = (req, res) => {
    Order.create(req.body)
        .then(x => res.json(x))
        .catch(err => res.json(err));
}


module.exports.getAll = (req, res) => {
    Order.find({})
        .then(Orders => res.json(Orders))
        .catch(err => res.json(err));
};


module.exports.getOne = (req, res) => {
    Order.find({ customer: req.params.customer })
        .then(prod => {
            res.json(prod), console.log(customer)
        })
        .catch(err => res.json(err));

};
module.exports.updateOne = (req, res) => {
    Order.findOneAndUpdate({ customer: req.params.id }, req.body, { new: true, runValidators: true })
        .then(updated => res.json(updated))
        .catch(err => res.json(err));
};

module.exports.deleteOne = (req, res) => {
    Order.findByIdAndDelete({ _id: req.params.id })
        .then(deleted => res.json(deleted))
        .catch(err => res.json(err));
};
module.exports.pay = async (req, res) => {
    const { id, amount } = req.body;
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: 'USD',
            description: 'Delicious meal',
            payment_method: id,
            confirm: true
        })
        console.log(payment)
        return res.status(200).json({
            confirm: Math.floor(Math.random() * 1000) - 1
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: error.message
        })
    }
}

