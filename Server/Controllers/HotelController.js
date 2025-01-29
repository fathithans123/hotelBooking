
const path = require('path');
const Hotel = require('../Model/hotel');
// handling and manipulating file a
const fs = require('fs');



//Why Use fs?
// To perform operation such as reading, writing, deleting and modifying files and directories.
// Function to get all hotels
exports.getAllHotels =  async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Function to add a new hotel
exports.addHotel = async (req, res) => {
    const { hotelName } = req.body;
    const hotelImage = req.file ? req.file.filename : '';
    // Purpose: Extracts the file name of an uploaded image if a file is present in the request; otherwise, sets it to an empty string ('').

    // Example:
    // req.file = { 
    //     fieldname: 'hotelImage',
    //     originalname: 'image.jpg',
    //     encoding: '7bit',
    //     mimetype: 'image/jpeg',
    //     destination: './uploads/',
    //     filename: '12345-image.jpg',
    //     path: './uploads/12345-image.jpg',
    //     size: 2048
    //  };
    try {
        const newHotel =  new Hotel({
            hotelName,
            hotelImage,
        });

        const hotel = await newHotel.save();
        res.json(hotel);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Function to delete a hotel
exports.deleteHotel = async (req, res) => {
    try {
        console.log(`Attempting to delete hotel with id: ${req.params.id}`);
        const hotel = await Hotel.findById(req.params.id);
       
        if (!hotel) {
            console.log('Hotel not found');
            return res.status(404).json({ msg: 'Hotel not found' });
        }
    
        // Delete image file if exists
        if (hotel.hotelImage) {
            try {
                const imagePath = path.join(__dirname, '..', 'uploads', hotel.hotelImage);
                console.log(`Deleting image: ${imagePath}`);
                fs.unlinkSync(imagePath);
                console.log(`Image ${hotel.hotelImage} deleted successfully`);
            } catch (err) {
                // ENDENT: Error code indicating that the file does not exist.
                if (err.code === 'ENDENT') {
                    console.log(`Image ${hotel.hotelImage} not found, skipping deletion`);
                } else {
                    console.error(`Error deleting image ${hotel.hotelImage}:`, err.message);
                    return res.status(500).json({ msg: 'Error deleting image' });
                }
              }   
            }

            await Hotel.deleteOne({ _id: req.params.id }); //Use deletOne method
            console.log(`Hotel with id: ${req.params.id} deleted succesfully`);
            res.json({ msg: 'Hotel removed' });
        } catch (err) {
            console.error('Error removing hotel:', err.message);
            res.status(500).send('Server Error');
        }
        };
