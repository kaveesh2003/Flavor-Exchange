import React from 'react';
import { Box, Button, Typography } from '@mui/material';

function RecipeCategories() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        padding: 3,
      }}
    >
      <Typography variant="h5" gutterBottom>
        What to Cook ?
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        <Button variant="contained" color="primary">
          All Types
        </Button>
        <Button variant="outlined">
          Healthy Meals
        </Button>
        <Button variant="outlined">
          Snacks
        </Button>
        <Button variant="outlined">
          Main Meals
        </Button>
        <Button variant="outlined">
          Desserts & Sweets
        </Button>
      </Box>
    </Box>
  );
}

export default RecipeCategories;