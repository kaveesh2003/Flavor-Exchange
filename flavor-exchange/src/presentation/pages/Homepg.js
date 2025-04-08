import React from 'react';
import HeroSection from '../components/HeroSection';
import RecipeCategories from '../components/RecipeCategories';
import RecipeGrid from '../components/RecipeGrid';

const Homepg = () => {
    return (
        <div>
            <HeroSection />
            <RecipeCategories />
            <RecipeGrid />
        </div>
    );
}

export default Homepg;


