require('dotenv').config()
const express = require ('express');
const cors = require('cors');
const RunServer = require('./Database/connection.js');
const path = require('path');
const bodyParser = require('body-parser');



const app = express();

// Connect Database
RunServer();

// Middleware
//connect backend and frontend
app.use(cors());
//used to handle post and put requests,where the client send data in request body in json format.
app.use(bodyParser.json());

// bodyParser.json(): Allows your app to handlee Json-formatted request bodies easily.
// express.static(): Serves static files from a specific directory, making them accessiblr via a specified route in your application.

// express.static() is a built-in middleware function in Express used to serve static files such as images, css files, ND JavaScript files.
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files


// Routes
app.use('/api/hotels',require('./Routes/HotelRoutes'));


app.use('/api/bookings', require('./Routes/BookingRoutes'));


app.use('/api/admin', require('./Routes/admin.js'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// const port = 8000;


// app.use(express.json())
// app.use(cors())


// // RunServer()

// app.listen(port, ()=> {
//     console.log(`server is running on ${port}`)
// })