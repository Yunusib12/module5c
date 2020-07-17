const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    userCreated: {
        type: Date,
        default: Date.now
    },
    order: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
});


module.exports = mongoose.model('User', User);