const mongoose = require('mongoose');
const Review = require('./Review');
const Image = require('./Image');

const InstitutionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Поле "Название" не должно быть пустым.'],
        unique: [true, 'Такое заведение уже существует.']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    mainImage: {
        type: String,
        default: null
    },
    description: {
        type: String,
        required: [true, 'Поле "Описание" не должно быть пустым.']
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
    allRating: {
        type: Number,
        default: 0
    },
    rateCount: {
        type: Number,
        default: 0
    },
    imagesCount: {
        type: Number,
        default: 0
    }
});

InstitutionSchema.pre('deleteOne', async function (next) {
    const id = this._conditions._id;
    await Review.deleteMany({institution: id});
    await Image.deleteMany({institution: id});
    next();
});

const Institution = mongoose.model('Institution', InstitutionSchema);

module.exports = Institution;