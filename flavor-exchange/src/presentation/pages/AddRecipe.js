import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Stack,
  Paper,
} from "@mui/material";
import { useRecipe } from "../../application/context/RecipeContext"; // Adjust path as needed
import { useNavigate } from "react-router-dom"; // For navigation after adding

const AddRecipe = () => {
  const { addRecipe } = useRecipe();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    cookTime: "",
    ingredients: "",
    steps: "",
    foodCategory: "",
    rating: 1.0,
    reviewCount: 1,
    createdBy: localStorage.getItem("userId"),
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecipe = {
      ...form,
      ingredients: form.ingredients.split(",").map((i) => i.trim()),
      steps: form.steps
        .split(".")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      const addedRecipe = await addRecipe(newRecipe);
      console.log("Recipe added:", addedRecipe);
      setSnackbarMessage("Recipe added successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      clearForm();
      navigate("/"); // Redirect to the main page after successful addition
    } catch (error) {
      console.error("Error adding recipe:", error);
      setSnackbarMessage("Failed to add recipe.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const clearForm = () => {
    setForm({
      title: "",
      description: "",
      image: "",
      cookTime: "",
      ingredients: "",
      steps: "",
      foodCategory: "", // Clear foodCategory as well
      rating: 1.0,
      reviewCount: 1,
      createdBy: localStorage.getItem("userId"),
    });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
      padding={2}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: "700px",
          borderRadius: 4,
          backgroundColor: "#fefefe",
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
            {/* Add foodCategory Field */}
            <TextField
              label="Food Category (e.g., Main Meals, Snacks)"
              name="foodCategory" // Changed from category to foodCategory
              fullWidth
              value={form.foodCategory} // Changed from category to foodCategory
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
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddRecipe;
