import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box
} from '@mui/material';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';
import { useRecipe } from '../../application/context/RecipeContext'; 

const RecipeGrid = () => {
  const { recipes, loading, error } = useRecipe();
  const [selectedCategory, setSelectedCategory] = useState('All Types');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    if (recipes && recipes.length > 0) {
      if (selectedCategory === 'All Types') {
        setFilteredRecipes(recipes);
      } else {
        const filtered = recipes.filter(recipe =>
          recipe.foodCategory && recipe.foodCategory.toLowerCase() === selectedCategory.toLowerCase()
        );
        setFilteredRecipes(filtered);
      }
    } else {
      setFilteredRecipes([]);
    }
  }, [recipes, selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return <Typography>Loading recipes...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error loading recipes: {error.message}</Typography>;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center"> {/* Center the "What to Cook ?" text and filter */}
      <Typography variant="h4" gutterBottom textAlign="center"> {/* Center the text */}
        What to Cook ?
      </Typography>
      <Box>
        {/* Category Filter */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 1,
            padding: 3,
            marginBottom: 2,
          }}
        >
          <Typography variant="h6" sx={{ marginRight: 2 }}>Filter by Category:</Typography>
          {['All Types', 'Healthy Meals', 'Snacks', 'Main Meals', 'Desserts & Sweets'].map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'contained' : 'outlined'}
              color={selectedCategory === category ? 'primary' : undefined}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
        </Box>

        {/* Recipe Grid */}
        <Grid container spacing={3} padding={3} justifyContent="center" alignItems="center">
          {filteredRecipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card
                sx={{
                  width: '300px', 
                  height: '100%', 
                  display: 'flex',
                  flexDirection: 'column',
                  margin: '0 auto',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={recipe.image}
                  alt={recipe.title}
                  sx={{
                    width: '100%',        
                    objectFit: 'cover',   
                  }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {recipe.title}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Rating value={recipe.rating} precision={0.5} readOnly />
                    <Typography variant="body2" color="text.secondary">
                      ({recipe.reviewCount})
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Cook Time: {recipe.cookTime}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/recipe/${recipe.id}`}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          {filteredRecipes.length === 0 && recipes && recipes.length > 0 && selectedCategory !== 'All Types' && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" textAlign="center" color="text.secondary">
                No recipes found in the "{selectedCategory}" category.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default RecipeGrid;