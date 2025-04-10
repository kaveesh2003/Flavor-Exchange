const API_BASE_URL = 'http://localhost:3001'; 

export const fetchRecipes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/recipies`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const fetchRecipeById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/recipies/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null; 
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching recipe with ID ${id}:`, error);
    throw error;
  }
};

export const createRecipe = async (recipeData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/recipies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating recipe:', error);
    throw error;
  }
};

export const updateRecipe = async (id, recipeData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/recipies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating recipe with ID ${id}:`, error);
    throw error;
  }
};

export const deleteRecipe = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/recipies/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true; 
  } catch (error) {
    console.error(`Error deleting recipe with ID ${id}:`, error);
    throw error;
  }
};