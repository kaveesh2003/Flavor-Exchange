import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RecipeData from '../components/RecipeData';
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
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const recipeToEdit = RecipeData.find((r) => r.id === parseInt(id));
    if (recipeToEdit) {
      setRecipe(recipeToEdit);
      setTitle(recipeToEdit.title);
      setImage(recipeToEdit.image);
      setCookTime(recipeToEdit.cookTime);
      setDescription(recipeToEdit.description || '');
      setIngredients(recipeToEdit.ingredients || '');
      setSteps(recipeToEdit.steps || '');
    }
  }, [id]);

  const handleSaveChanges = () => {
    if (recipe) {
      recipe.title = title;
      recipe.image = image;
      recipe.cookTime = cookTime;
      recipe.description = description;
      recipe.ingredients = ingredients;
      recipe.steps = steps;

      setMessage('Recipe updated successfully!');

      // Optional: Save to backend/localStorage
      setTimeout(() => {
        setMessage('');
        navigate('/my-recipes');
      }, 1800);
    }
  };

  if (!recipe) {
    return <Typography>Recipe not found.</Typography>;
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
            placeholder="List ingredients here, separated by commas or new lines"
          />

          <TextField
            label="Steps"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            fullWidth
            multiline
            minRows={4}
            placeholder="Describe cooking steps here"
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
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default EditRecipe;
