import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Stack,
  Paper
} from '@mui/material';

const AddRecipe = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    image: '',
    cookTime: '',
    ingredients: '',
    steps: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecipe = {
      ...form,
      id: Date.now(),
      createdBy: 1,
      rating: 0,
      reviewCount: 0,
      ingredients: form.ingredients.split(',').map((i) => i.trim()),
      steps: form.steps.split('.').map((s) => s.trim()).filter(Boolean),
    };

    console.log('Recipe added:', newRecipe);
    setOpenSnackbar(true);
    clearForm();
  };

  const clearForm = () => {
    setForm({
      title: '',
      description: '',
      image: '',
      cookTime: '',
      ingredients: '',
      steps: '',
    });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh" padding={2}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: '700px',
          borderRadius: 4,
          backgroundColor: '#fefefe',
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Add New Recipe
        </Typography>
        <Typography variant="subtitle1" gutterBottom color="text.secondary">
          Fill out the details below to add a new recipe to your collection.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2} mt={3}>
            <TextField
              label="Title"
              name="title"
              required
              fullWidth
              value={form.title}
              onChange={handleChange}
            />
            <TextField
              label="Description"
              name="description"
              required
              fullWidth
              multiline
              rows={2}
              value={form.description}
              onChange={handleChange}
            />
            <TextField
              label="Image URL"
              name="image"
              required
              fullWidth
              value={form.image}
              onChange={handleChange}
            />
            <TextField
              label="Cook Time (e.g. 30 mins)"
              name="cookTime"
              required
              fullWidth
              value={form.cookTime}
              onChange={handleChange}
            />
            <TextField
              label="Ingredients (comma-separated)"
              name="ingredients"
              required
              fullWidth
              value={form.ingredients}
              onChange={handleChange}
            />
            <TextField
              label="Instructions (separate steps with periods)"
              name="steps"
              required
              fullWidth
              value={form.steps}
              onChange={handleChange}
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
              <Button variant="outlined" color="secondary" onClick={clearForm}>
                Clear
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Add Recipe
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>

      {/* Snackbar alert */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
           Recipe added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddRecipe;
