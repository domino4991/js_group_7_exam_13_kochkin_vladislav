const mongoose = require('mongoose');

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
        required: [true, 'Поле "Фотография" не должно быть пустым.']
    },
    description: {
        type: String,
        required: [true, 'Поле "Описание" не должно быть пустым.']
    },
    images: [{
        type: String
    }],
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
    }
});

const Institution = mongoose.model('Institution', InstitutionSchema);

module.exports = Institution;