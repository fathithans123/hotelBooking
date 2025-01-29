import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BookingForm from './pages/BookingForm';
import Admin from './pages/Admin';


const App = () => {
  return (
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/book" element={<BookingForm />} />
    <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default App;