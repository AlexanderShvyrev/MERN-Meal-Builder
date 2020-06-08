const mongoose = require('mongoose')
const bcrypt = require('bcrypt')



const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Account already exists"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    }

}, { timestamps: true })

UserSchema.virtual('confirm')
    .get(function () {
        return this._confirm;
    })
    .set(function (value) {
        this._confirm = value;
    });

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirm) {
        this.invalidate('confirm', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => {
            console.log("hashing failed :(", err);
            next();
        });
});


module.exports = mongoose.model('User', UserSchema);