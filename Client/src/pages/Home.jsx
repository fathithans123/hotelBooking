import { useEffect, useState } from "react";
import axios from 'axios';
import './Home.css'

const Home = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {
        try {
    const response = await axios.get('http://localhost:5000/api/hotels');
    setHotels(response.data);
} catch (error) {
    console.error('Error fetching hotels:', error);
}
};

return(
    <div className="container">
        <h1>Welcome to Hotel Booking System</h1>
        <br />
        <h2>Available Hotels</h2>
        <div className="hotel-list">
            {hotels.map((hotel, index) => (
                <div key={index} className="hotel-card">
                    <img
                    src={`http://localhost:5000/uploads/${hotel.hotelImage}`}
                    alt={hotel.hotleName}
                    className="hotel-image"
                    />
                    <div className="hotel-name">{hotel.hotelName}</div>
                    </div>
            ))}
        </div>
        <br/> <br/>
            <div className="navigation">
                <a href="/book" className="nav-link">Book a Hotel</a>
            </div>

        </div>
);
};

export default Home;


// Purpose: The key prop is crucial in React. It hepls React identify which items have changed, been added, or removed.
// It removes the efficiency of rendering lists.

// Here, index is used as the key. While this works, it's generally better to use a unique identifier if
// possible (like an id from the hotel data) to avoid potential issues if thr list changes.