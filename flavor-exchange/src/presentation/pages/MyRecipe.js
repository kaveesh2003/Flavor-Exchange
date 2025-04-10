import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions
} from '@mui/material';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';
import { useRecipe } from '../../application/context/RecipeContext';

const loggedInUserId = 1; // Replace with actual user ID from your authentication

const MyRecipe = () => {
  const { recipes, loading, error, deleteRecipe } = useRecipe();
  const [myRecipes, setMyRecipes] = useState([]);

  useEffect(() => {
    if (recipes) {
      const userRecipes = recipes.filter((r) => r.createdBy === loggedInUserId);
      setMyRecipes(userRecipes);
    }
  }, [recipes]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
    if (confirmDelete) {
      try {
        await deleteRecipe(id);
        // Optionally, you can update the local state immediately
        // const updatedRecipes = myRecipes.filter((r) => r.id !== id);
        // setMyRecipes(updatedRecipes);
      } catch (err) {
        console.error('Error deleting recipe:', err);
        // Optionally, show an error message to the user
      }
    }
  };

  if (loading) {
    return <Typography>Loading your recipes...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error loading recipes: {error.message}</Typography>;
  }

  return (
    <Box padding={4}>
      {/* Title and Add New Button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">My Recipes</Typography>
        <Button variant="contained" color="success" component={Link} to="/add">
          Add New Recipe
        </Button>
      </Box>

      {/* Grid of User Recipes */}
      <Grid container spacing={3}>
        {myRecipes.length === 0 ? (
          <Typography>No recipes found.</Typography>
        ) : (
          myRecipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={recipe.image}
                  alt={recipe.title}
                />
                <CardContent>
                  <Typography variant="h6">{recipe.title}</Typography>
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
                    View
                  </Button>
                  <Button
                    variant="outlined"
                    color="warning"
                    component={Link}
                    to={`/edit/${recipe.id}`}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(recipe.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default MyRecipe;