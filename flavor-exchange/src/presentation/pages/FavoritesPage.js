import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RecipeData from '../components/RecipeData';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  // Load from localStorage based on current user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const allFavorites = JSON.parse(localStorage.getItem('favoritesByUser')) || {};
      const userFavs = allFavorites[user.email] || [];
      const favRecipes = RecipeData.filter((r) => userFavs.includes(r.id));
      setFavorites(favRecipes);
    }
  }, []);

  const handleRemoveFavorite = (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    const allFavorites = JSON.parse(localStorage.getItem('favoritesByUser')) || {};
    const updatedFavs = (allFavorites[user.email] || []).filter((favId) => favId !== id);

    allFavorites[user.email] = updatedFavs;
    localStorage.setItem('favoritesByUser', JSON.stringify(allFavorites));
    setFavorites(favorites.filter((r) => r.id !== id));
  };

  return (
    <Box padding={4}>
      <Typography variant="h4" gutterBottom>
        My Favorite Recipes 
      </Typography>

      {favorites.length === 0 ? (
        <Typography>No favorite recipes found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card
                sx={{
                  width: '100%',
                  maxWidth: 345,
                  height: '100%',
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
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Button
                    variant="contained"
                    component={Link}
                    to={`/recipe/${recipe.id}`}
                    color="primary"
                  >
                    View Details
                  </Button>
                  <IconButton color="error" onClick={() => handleRemoveFavorite(recipe.id)}>
                    <FavoriteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FavoritesPage;
