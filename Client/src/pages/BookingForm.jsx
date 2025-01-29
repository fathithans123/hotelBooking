import { useEffect, useState } from "react"
import axios from 'axios';

import './BookingForm.css'


const BookingForm = () => {
    const [hotels, setHotels] = useState([]);
    const [hotelName, setHotelName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [customerName, setCustomerName] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/hotels')
            .then(response => setHotels(response.data))
            .catch(error => console.error('Error fetching hotels:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookingData = { hotelName, startDate, endDate, customerName };

        axios.post('http://localhost:5000/api/bookings', bookingData)
            .then(response => {
                alert('Booking successful!');
                setHotelName('');
                setStartDate('');
                setEndDate('');
                setCustomerName('');
            })
            .catch(error => console.error('Error creating booking:', error));
    };

    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //Months are zero-based, 09-
        const dd = String(today.getDate()).padStart(2, '0');  //02
        return `${yyyy}-${mm}-${dd}`;
    };

    const todayDate = getTodayDate();

    return (
        <div className="container">
            <h1>Book Your Hotel</h1>

            <form onSubmit={handleSubmit}>

                <label htmlFor="hotelName">Hotel Name:</label>

                <select
                    id="hotelName"
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                    required
                >
                    <option value="" disabled>Select a hotel</option>
                    {hotels.map((hotel, index) => (
                        <option key={index} value={hotel.hotelName}>{hotel.hotelName}</option>
                    ))}
                </select>

                <label htmlFor="startDate">Start Date:</label>
                <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />

                <label htmlFor="endDate">End Date:</label>
                <input
                    type="date"
                    id="startDate"
                    value={endDate}
                    min={startDate || todayDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                />

                <label htmlFor="customerName">Customer Name:</label>
                <input
                    type="text"
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                />
                <button type="submit">Book Now</button>
            </form>
        </div>
    );
};
export default BookingForm;