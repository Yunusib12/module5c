const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Product = new Schema({
    productName: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Product', Product);