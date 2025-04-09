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
    <Grid container spacing={3} padding={3} justifyContent="center">
      {RecipeData.map((recipe) => (
        <Grid item key={recipe.id}>
          <Card
            sx={{
              width: 230,              // ✅ Fixed width
              height: 420,             // ✅ Fixed height
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
              height="180"
              image={recipe.image}
              alt={recipe.title}
              sx={{ objectFit: 'cover' }}
            />

            <CardContent sx={{ flexGrow: 1 }}>
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

            <CardActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
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
