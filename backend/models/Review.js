const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    institution: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Institution',
        required: true
    },
    comment: {
        type: String,
        default: ''
    },
    foodRating: {
        type: Number,
        default: 0
    },
    serviceRating: {
        type: Number,
        default: 0
    },
    interiorRating: {
        type: Number,
        default: 0
    },
    createDate: {
        type: Date,
        default: Date.now()
    }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;