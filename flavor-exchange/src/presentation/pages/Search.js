import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Rating,
  Button
} from '@mui/material';

const Search = () => {
  const location = useLocation();
  const searchResults = location.state?.recipes || []; // Access the 'recipes' from state

  if (!location.state || !location.state.recipes) {
    return <Typography>No search results were provided.</Typography>;
  }

  return (
    <Box padding={4}>
      <Typography variant="h5" gutterBottom>
        Search Results
      </Typography>
      {searchResults.length === 0 ? (
        <Typography>No recipes found matching your search criteria.</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          {searchResults.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={recipe.image}
                  alt={recipe.title}
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
        </Grid>
      )}
    </Box>
  );
};

export default Search;