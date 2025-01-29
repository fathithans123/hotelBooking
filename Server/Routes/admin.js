const express = require('express');
const Booking = require('../Model/booking');
const router = express.Router();

// @route  GET /api/admin/bookings
// @desc   Get all bookings
router.get('/bookings', async ( req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
    }
});

module.exports = router;