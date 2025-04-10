import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecipe } from '../../application/context/RecipeContext'; // Adjust path as needed
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  Divider,
  Stack
} from '@mui/material';

const EditRecipe = () => {
  const { getRecipeById, updateRecipe } = useRecipe();
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [foodCategory, setFoodCategory] = useState(''); 
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      const fetchedRecipe = await getRecipeById(id);
      if (fetchedRecipe) {
        setRecipe(fetchedRecipe);
        setTitle(fetchedRecipe.title);
        setImage(fetchedRecipe.image);
        setCookTime(fetchedRecipe.cookTime);
        setDescription(fetchedRecipe.description || '');
        setIngredients(fetchedRecipe.ingredients ? fetchedRecipe.ingredients.join(',') : '');
        setSteps(fetchedRecipe.steps ? fetchedRecipe.steps.join('.') : '');
        setFoodCategory(fetchedRecipe.foodCategory || '');
      } else {
        setError('Recipe not found.');
      }
    };

    fetchRecipe();
  }, [id, getRecipeById]);

  const handleSaveChanges = async () => {
    if (!recipe) return;

    const updatedRecipeData = {
      title: title,
      image: image,
      cookTime: cookTime,
      description: description,
      ingredients: ingredients.split(',').map((i) => i.trim()),
      steps: steps.split('.').map((s) => s.trim()).filter(Boolean),
      foodCategory: foodCategory, // Include foodCategory in update data
    };

    try {
      const updatedRecipe = await updateRecipe(id, updatedRecipeData);
      console.log('Recipe updated:', updatedRecipe);
      setMessage('Recipe updated successfully!');
      setError('');
      setTimeout(() => {
        setMessage('');
        navigate(`/recipe/${id}`); 
      }, 1800);
    } catch (err) {
      console.error('Error updating recipe:', err);
      setError('Failed to update recipe.');
      setMessage('');
    }
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!recipe) {
    return <Typography>Loading recipe...</Typography>;
  }

  return (
    <Box padding={4} maxWidth="700px" margin="auto">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" mb={2}>
          Edit Recipe
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Recipe Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />

          {/* Image Preview */}
          {image && (
            <Box textAlign="center">
              <img
                src={image}
                alt="Preview"
                style={{ width: '100%', maxHeight: '250px', objectFit: 'cover', borderRadius: '10px' }}
              />
            </Box>
          )}

          <TextField
            label="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            fullWidth
          />

          <TextField
            label="Cook Time"
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
            fullWidth
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            minRows={3}
            placeholder="Write a short description of your recipe"
          />

          <TextField
            label="Ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            fullWidth
            multiline
            minRows={4}
            placeholder="List ingredients here, separated by commas"
          />

          <TextField
            label="Steps"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            fullWidth
            multiline
            minRows={4}
            placeholder="Describe cooking steps here, separated by periods"
          />

          {/* Edit foodCategory Field */}
          <TextField
            label="Food Category (e.g., Main Meals, Snacks)"
            value={foodCategory}
            onChange={(e) => setFoodCategory(e.target.value)}
            fullWidth
          />

          <Stack alignItems="center" spacing={2}>
            <Button
              variant="contained"
              color="success"
              onClick={handleSaveChanges}
              sx={{ width: '50%' }}
            >
              Save Changes
            </Button>

            {message && (
              <Alert severity="success" sx={{ width: '100%', textAlign: 'center' }}>
                {message}
              </Alert>
            )}
            {error && (
              <Alert severity="error" sx={{ width: '100%', textAlign: 'center' }}>
                {error}
              </Alert>
            )}
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default EditRecipe;