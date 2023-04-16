const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MainPage = new Schema ({
    title: {
        type: String,
        require: true
    },

    subtitle: {
        type: String,
        require: true
    },

    bannerImageSrc: {
        type: String,
        required: true
    },

    idPost: {
        type: Schema.Types.ObjectId,
        reference: 'posts',
        required: true
    }
})