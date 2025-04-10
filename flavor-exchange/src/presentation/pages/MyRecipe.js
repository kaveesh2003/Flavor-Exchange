import React, { useState, useEffect } from 'react';
import RecipeData from '../components/RecipeData';
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

const loggedInUserId = 1;

const MyRecipe = () => {
  const [myRecipes, setMyRecipes] = useState([]);

  useEffect(() => {
    const userRecipes = RecipeData.filter((r) => r.createdBy === loggedInUserId);
    setMyRecipes(userRecipes);
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
    if (confirmDelete) {
      const updatedRecipes = myRecipes.filter((r) => r.id !== id);
      setMyRecipes(updatedRecipes);
    }
  };

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
              <Card
                sx={{
                  width: '100%',
                  height: '100%',
                  maxWidth: 345,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={recipe.image}
                  alt={recipe.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
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
                <CardActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
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
