import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const categories = [
  { label: 'All Types', value: 'all' },
  { label: 'Healthy Meals', value: 'healthy meals' },
  { label: 'Snacks', value: 'snacks' },
  { label: 'Main Meals', value: 'main meals' },
  { label: 'Desserts & Sweets', value: 'desserts & sweets' },
];

function RecipeCategories({ onCategoryChange, selectedCategory }) {
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
      <Typography variant="h4" gutterBottom>
        What to Cook?
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        {categories.map((cat) => (
          <Button
            key={cat.value}
            variant={selectedCategory === cat.value ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => onCategoryChange(cat.value)}
          >
            {cat.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
}

export default RecipeCategories;
