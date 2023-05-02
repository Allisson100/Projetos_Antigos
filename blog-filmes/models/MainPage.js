const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MainPage = new Schema ({
    title: {
        type: String,
    },

    subtitle: {
        type: String,
    },

    bannerImageSrc: {
        type: Array,
    }
})

mongoose.model('mainpage', MainPage);