const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    // amount: {
    //     type: String
    // },
    status: {
        type: String,
        default: "In progress..."
    },
    dateOrder: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', Order);

