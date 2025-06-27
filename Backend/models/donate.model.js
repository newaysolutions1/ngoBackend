const mongoose = require('mongoose');

const donateSchema = new mongoose.Schema(
    {
        amount: { type: Number, required: true, min: 1 },
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, lowercase: true, trim: true },
        phone: { type: String, required: true, trim: true },
        status: { type: String, enum: ['PENDING', 'PAID'], default: 'PENDING' },
        paymentRef: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model('Donate', donateSchema);
