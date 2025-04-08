import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toolbar } from '@mui/material'; 
import Navbar from './presentation/components/Navbar';
import Homepg from './presentation/pages/Homepg';
import RecipeDetail from './presentation/pages/RecipeDetail';

function App() {
  return (
    <Router>
      <Navbar />
      <Toolbar /> {/* Spacer to match AppBar height */}
      <div className='dynamic-content'>
        <Routes>
          <Route path='/' element={<Homepg />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
