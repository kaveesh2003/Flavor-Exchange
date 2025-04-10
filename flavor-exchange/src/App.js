import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toolbar } from '@mui/material'; 
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from "./application/context/AuthContext";
import { RecipeProvider } from "./application/context/RecipeContext";
import CssBaseline from '@mui/material/CssBaseline';
import theme from './presentation/components/theme'; 
import Navbar from './presentation/components/Navbar';
import Homepg from './presentation/pages/Homepg';
import RecipeDetail from './presentation/pages/RecipeDetail';
import MyRecipe from './presentation/pages/MyRecipe';
import AddRecipe from './presentation/pages/AddRecipe';
import EditRecipe from './presentation/pages/EditRecipe';
import FavoritesPage from './presentation/pages/FavoritesPage';
import Login from './presentation/pages/Login';
import Signup from './presentation/pages/Signup';
import SearchGrid from "./presentation/pages/Search";

function App() {
  return (
   
    <ThemeProvider theme={theme}> 
    <CssBaseline /> 
    <AuthProvider>
    <RecipeProvider>
    <Router>
      <Navbar />
      <Toolbar /> 
      <div className='dynamic-content'>
        <Routes>
          <Route path='/' element={<Homepg />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/my-recipes" element={<MyRecipe />} />
          <Route path='/add' element={<AddRecipe />} />
          <Route path="/edit/:id" element={<EditRecipe />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<Signup/>} />
          <Route path="/search" element={<SearchGrid/>} /> 
        </Routes>
      </div>
    </Router>
    </RecipeProvider>
    </AuthProvider>
    </ThemeProvider>
    
  );
}

export default App;
