// src/context/RecipeContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import * as recipeApi from '../../infrastructure/api/RecipeAPI';

const RecipeContext = createContext();

export const useRecipe = () => useContext(RecipeContext);

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await recipeApi.fetchRecipes();
        setRecipes(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  const getRecipeById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      return await recipeApi.fetchRecipeById(id);
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const addRecipe = async (recipeData) => {
    try {
      const newRecipe = await recipeApi.createRecipe(recipeData);
      setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
      return newRecipe;
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const updateRecipe = async (id, recipeData) => {
    try {
      const updatedRecipe = await recipeApi.updateRecipe(id, recipeData);
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) => (recipe.id === id ? updatedRecipe : recipe))
      );
      return updatedRecipe;
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const deleteRecipe = async (id) => {
    try {
      await recipeApi.deleteRecipe(id);
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));
      return true;
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        loading,
        error,
        getRecipeById,
        addRecipe,
        updateRecipe,
        deleteRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};