const Booking = require("../Model/booking");


exports.createBooking = async (req, res) => {
    const { hotelName, startDate, endDate, customerName } = req.body;

    try {
        const newBooking = new Booking({
            hotelName,
            startDate,
            endDate,
            customerName,
        });

        const booking = await newBooking.save();
        res.json(booking);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};