const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    customerName: {
        type: String,
        require: true,
    },
});


const Booking = mongoose.model('booking', BookingSchema);
module.exports = Booking;