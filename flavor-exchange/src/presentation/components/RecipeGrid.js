import React from 'react';
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
import RecipeData from './RecipeData';

const RecipeGrid = () => {
  return (
    <Grid container spacing={3} padding={3} justifyContent="center" alignItems="center">
      {RecipeData.map((recipe) => (
        <Grid item xs={12} sm={6} md={4} key={recipe.id}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              width="250"
              image={recipe.image}
              alt={recipe.title}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {recipe.title}
              </Typography>

              {/* ⭐ Rating Display */}
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
  );
};

export default RecipeGrid;
