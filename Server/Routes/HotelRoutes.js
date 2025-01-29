// routes/hotels.js
const express = require('express');
const multer = require('multer');
const path = require('path');


const router = express.Router();
const {
    getAllHotels,
    addHotel,
    deleteHotel
} = require('../Controllers/HotelController');


// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: path.join(__dirname, '..', 'uploads'), //Use absolute path
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

//Filed Name: hotelImage
// Original File Name: example.jpg
// Upload Time: August 20, 2024, at 15:30:45 utc (Unix timestamp: 1726741845000)

//hotelImage-1726741845000.jpg

const upload = multer({
    storage,
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
});

function checkFileType(file, cb) {
    // Allowed file types
    const filetypes = /jpeg|jpg|png/;
    // Check ext 
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    // For example, a MIME type can specify whether a file is an image, a video, a text document, etc.
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
    return cb(null, true);
} else {
    cb('Error: Image Only!');
}
}

// @route GET /api/hotels
// @desc  Get all hoteks
router.get('/', getAllHotels);

// @route  POST /api/hotels
// @desc   Add a new hotel
router.post('/', upload.single('hotelImage'), addHotel);

// @route DELETE /api/hotels/:id
// @desc Delete a hotel
router.delete('/:id', deleteHotel);

module.exports = router;