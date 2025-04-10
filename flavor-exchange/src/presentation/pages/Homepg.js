import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import RecipeCategories from '../components/RecipeCategories';
import RecipeGrid from '../components/RecipeGrid';
import RecipeData from '../components/RecipeData'; 

const Homepg = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter the recipes based on selected category
  const filteredRecipes = selectedCategory === 'all'
    ? RecipeData
    : RecipeData.filter(recipe =>
        recipe.category.toLowerCase() === selectedCategory.toLowerCase()
      );

  return (
    <div>
      <HeroSection />
      <RecipeCategories onCategoryChange={setSelectedCategory} selectedCategory={selectedCategory} />
      <RecipeGrid recipes={filteredRecipes} />
    </div>
  );
};

export default Homepg;



