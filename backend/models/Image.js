const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
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
    image: {
        type: String,
        required: [true, 'Выберите пожалуйста фото.']
    }
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;