import React from 'react';
import { AppBar, Toolbar, Button, InputAdornment, TextField, IconButton, Avatar, Box } from '@mui/material';
import { Search as SearchIcon, AccountCircle as ProfileIcon } from '@mui/icons-material';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'black', color: 'white', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo Image */}
        <Box 
          component="img"
          src={logo}
          alt="Logo"
          sx={{ 
            height: 40, 
            flexGrow: 1,
            maxWidth: 150, 
            objectFit: 'contain'
          }}
        />

        {/* Navigation Links */}
        <div style={{ display: 'flex', gap: '20px', marginRight: '20px', alignItems: 'center' }}>
        <Button
          color="inherit"
          component="a"
          href="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          HOME
        </Button>

          <Button color="inherit" component={Link} to="/my-recipes">MY RECIPES</Button>
          <Button color="inherit" component={Link} to="/favorites">FAVORITES</Button>
          <Button color="inherit" component={Link} to="/add-new">ADD NEW</Button>
          <Button color="inherit" component={Link} to="/contact">CONTACT</Button>
        </div>

        {/* Search Bar and Profile Icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'white' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
                width: '200px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
              },
              '& .MuiInputBase-input': {
                color: 'white',
                '&::placeholder': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  opacity: 1,
                },
              },
            }}
          />

        {/* Profile Icon */}
        
          <IconButton color="inherit" sx={{ p: 0 }}>
            <Avatar sx={{ bgcolor: '#ff5722' }}>
              <ProfileIcon />
            </Avatar>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;