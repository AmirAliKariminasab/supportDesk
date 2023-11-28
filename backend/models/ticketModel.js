const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true],
        ref: 'User'
    },
    product: {
        type: String,
        required: [true, 'Please  Select a Product!'],
        enum: ['iPhone', 'Macbook ', 'Pro', 'iMac', 'iPad'],
    },
    description: {
        type: String,
        required: [true, 'Please Enter a Description Of The Issue:']
    },
    status: {
        type: String,
        required: true,
        enum: ['new', 'open', 'closed'],
        default: 'new',
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Ticket', ticketSchema);