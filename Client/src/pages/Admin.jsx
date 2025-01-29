import React, { useEffect, useState } from 'react'
import axios from 'axios';

import './Admin.css';


const Admin = () => {

    const [bookings, setBookings] = useState([]);
    const [hotelName, setHotelName] = useState('');
    const [hotelImage, setHotelImage] = useState(null);
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        fetchBookings();
        fetchHotels();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/bookings');
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const fetchHotels = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/hotels');
            setHotels(response.data);
        } catch (error) {
            console.error('Error fetching hotels:', error);
        }
    };
    //What is FormData?
    // FormData is a JavaScript object used to construct key-value pairs for form submissions, particularly when you need to send files (like images) along with text data.
    // It is often used with multipart/form-data requests to handle file uploads.

    // This function handles the form submission for adding a new hotel. It collects data form the form, packages it into a FormData object, and sends it to the server via an AOI request. After a succesful submissio, it refreshes the hotel list and resets the form.

    //const formData = new FormData();

    // Creates a new FormData object, which is used to send key-value pairs, including files, to the server in a format suitable for multipart/form-data.
    // formData.append('hotelName', hotelName);

    const handleHotelSubmit = async (e) => {
        e.preventDefault();
        const formData =  new FormData();
        formData.append('hotelName', hotelName);
        formData.append('hotelImage', hotelImage);

        // Headers:
        // 'Content-Type: 'multipart/form-data' ensures the server knows it's receiving form data (including files).'
        try {
            await axios.post('http://localhost:5000/api/hotels', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // The POST request sends the FormData object to the server. Since this data includes a file, it must be encoded as multipart/form-data.
                },
            });
            fetchHotels();
            setHotelName('');
            setHotelImage(null);
        } catch (error) {
            console.error('Error adding hotel:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/hotels/${id}`);
            fetchHotels();
        } catch (error) {
            console.error('Error deleting hotel:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="container">
            <h1>Booking Details</h1>
            <table>
                <thead>
                    <tr>
                        <th>Hotel Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Customer Name</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={index}>
                            {/* key={index}:
                            React requires a unique key for each list item to optimize rendering.
                            Here, the index is used as a key (not ideal for dynamic lists but acceptable for this simple example). */}
                            <td>{booking.hotelName}</td>
                            <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                            <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                            <td>{booking.customerName}</td>
                            </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <br />
            <br />


            {/* Example Data
            Let's assume the bookings array contains the following data:

            const bookings = [
            {
         // hotelName: "Grand Place",
            startDate: "2025-01-01T00:00:00Z",
            endDate: "2025-01-05T00:00:00Z",
            customerName: "John Doe",
            },
            ]  */}

        <h1>Manage Hotels</h1>

        <form onSubmit={handleHotelSubmit}>
            <label htmlFor="hotelName">Hotel Name: </label>

            <input 
            type="text"
            id="hotelName"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            required
            />

            <label htmlFor="hotelImage">Hotel Image: </label>

            <input 
            type="file"
            id="hotelImage"
            onChange={(e) => setHotelImage(e.target.files[0])}
            required
            />

            <button type="submit">Add Hotel</button>
            </form>
            <hr />
            <br />
            <h2>Hotel List</h2>
            <ul>
                {hotels.map((hotel, index) => (
                    <li key={index}>
                        <div className="card">
                            <img
                            src={`http://localhost:5000/uploads/${hotel.hotelImage}`}
                            alt={hotel.hotelName}
                            />
                            <div className="card-content">
                                <h3>{hotel.hotelName}</h3>
                                <button onClick={() => handleDelete(hotel._id)}>Delete</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;