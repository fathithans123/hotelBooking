// routes/bookings.js

const express = require('express');
const { createBooking } = require('../Controllers/BookingCtrl');


const router = express.Router();

router.post('/', createBooking);

module.exports = router;