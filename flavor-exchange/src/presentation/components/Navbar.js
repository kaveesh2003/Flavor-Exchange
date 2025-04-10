import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  InputAdornment,
  TextField,
  IconButton,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  Menu as MenuIcon,
  AccountCircle as ProfileIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Navigate, useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useAuth } from "../../application/context/AuthContext";
import { useRecipe } from '../../application/context/RecipeContext'; 

const Navbar = () => {
  const { recipes, loading, error } = useRecipe();
  const [searchTerm, setSearchTerm] = useState("");
  const { user, isLoggedIn, logout, setLocalData } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    logout();
    navigate("/login");
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); 
    if (searchTerm.trim()) {
      var lowSearchTerm = searchTerm.toLowerCase();
      // Check if the search term matches any recipe name (case-insensitive)
      if (recipes && recipes.length > 0) {
        const filteredRecipes = recipes.filter((recipe) => {
           var recipeName = recipe?.title.toLowerCase(); 
           if(recipeName) {
             if (recipeName.toLowerCase().includes(lowSearchTerm)){
              return true; 
             }
           }
           return false; 
        }

      );
      if (filteredRecipes.length > 0) {
        navigate("/search", { state: { recipes: filteredRecipes } });
      } else {
        alert("No recipes found for your search term.");
      }
    }
    setSearchTerm(""); // Clear search term after submission
  }
};

  const navItems = [
    { text: 'HOME', link: '/' },
    { text: 'MY RECIPES', link: '/my-recipes' },
    { text: 'FAVORITES', link: '/favorites' },
    { text: 'ADD NEW', link: '/add' },
  ];

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'black', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{ height: 40, maxWidth: 150, objectFit: 'contain' }}
        />

        {/* Mobile View */}
        {isMobile ? (
          <>
            <IconButton onClick={toggleDrawer(true)} color="inherit">
              <MenuIcon />
            </IconButton>

            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              <Box width={250} padding={2} role="presentation">
              {/* Search Bar */}
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search..."
                fullWidth
                InputProps={{
                   startAdornment: (
                  <InputAdornment position="start">
                     <SearchIcon sx={{ color: 'gray' }} />
                  </InputAdornment>
                  ),
                }}
              sx={{
                 mb: 2,
                  '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  backgroundColor: '#f0f0f0',
                  '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.2)',
                },
              },
              '& input': {
                color: 'black',
               },
            }}
          />

          <Divider sx={{ mb: 1 }} />

          {/* Nav Links */}
          <List>
            {navItems.map((item) => (
             <ListItem
              button
              key={item.text}
              component={Link}
              to={item.link}
              onClick={toggleDrawer(false)} 
              >
              <ListItemText primary={item.text} />
              </ListItem>
          ))}
          <Divider sx={{ my: 1 }} />
            <ListItem button component={Link} to="/login" onClick={toggleDrawer(false)}>
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button component={Link} to="/signup" onClick={toggleDrawer(false)}>
            <ListItemText primary="Sign Up" />
          </ListItem>
        </List>
      </Box>
    </Drawer>

          </>
        ) : (
          // Desktop View
          <Box display="flex" alignItems="center" gap={2}>
            {navItems.map((item) => (
          <Button
            key={item.text}
            component={Link}
            to={item.link}
            sx={{
              color: location.pathname === item.link ? '#fad800' : 'white',
              fontWeight: location.pathname === item.link ? 'bold' : 'normal',
              textTransform: 'uppercase',
              }}
          >
          {item.text}
          </Button>
        ))}


            {/* Search Bar for Desktop */}
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <form onSubmit={handleSearchSubmit}>
            
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "white" }} />
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
            </form>
            {/* Welocome Message */}
            {isLoggedIn ? (
              <div>
                <p>Hi, {user?.name || "User"}</p>
              </div>
            ) : (
              <p>Guest </p>
            )}
            {/* Profile Icon & Menu */}
            <IconButton onClick={handleOpenMenu} color="inherit" sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: '#e83f25' }}>
                <ProfileIcon />
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
             
             {!isLoggedIn ? (
              <div>
            <MenuItem component={Link} to="/login" onClick={handleCloseMenu}>
                Login
              </MenuItem>
              <MenuItem component={Link} to="/signup" onClick={handleCloseMenu}>
                Sign Up
              </MenuItem>
              </div>
              ) : (
                <MenuItem component={Link} to="/" onClick={handleLogoutClick}>
                  Logout
                </MenuItem>
              )}
            </Menu>
            </div>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
