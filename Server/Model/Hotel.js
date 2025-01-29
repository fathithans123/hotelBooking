const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: true,
        unique: true,
    },
    hotelImage: {
        type: String,
        required: false,
    },
});

const Hotel = mongoose.model('Hotel', HotelSchema);
module.exports = Hotel;