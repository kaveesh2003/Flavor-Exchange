const RecipeData = [
    {
      id: 1,
      title: 'Spaghetti Bolognese',
      description: 'A classic Italian pasta dish made with rich tomato meat sauce.',
      image: 'https://source.unsplash.com/400x300/?spaghetti',
      cookTime: '30 mins',
      rating: 4.5,
      reviewCount: 23,
      ingredients: [
        '200g spaghetti',
        '100g minced meat',
        '1 onion',
        '2 cloves garlic',
        'Tomato sauce'
      ],
      steps: [
        'Boil the spaghetti.',
        'Fry onion and garlic.',
        'Add minced meat and cook.',
        'Mix in tomato sauce.',
        'Serve over spaghetti.'
      ],
      createdBy: 1
    },
    {
      id: 2,
      title: 'Chicken Curry',
      description: 'A classic Italian pasta dish made with rich tomato meat sauce.',
      image: 'https://source.unsplash.com/400x300/?chicken-curry',
      cookTime: '45 mins',
      rating: 4.3,
      reviewCount: 30,
      ingredients: [
        '500g chicken',
        '2 onions',
        '3 garlic cloves',
        'Curry powder',
        'Coconut milk'
      ],
      steps: [
        'Fry onions and garlic.',
        'Add chicken and brown.',
        'Stir in curry powder.',
        'Add coconut milk and simmer.',
        'Serve with rice.'
      ],
      createdBy: 1
    },
    {
      id: 3,
      title: 'Avocado Salad',
      description: 'A classic Italian pasta dish made with rich tomato meat sauce.',
      image: 'https://source.unsplash.com/400x300/?salad',
      cookTime: '15 mins',
      rating: 4.7,
      reviewCount: 25,
      ingredients: [
        '2 avocados',
        '1 cucumber',
        'Cherry tomatoes',
        'Olive oil',
        'Lemon juice'
      ],
      steps: [
        'Chop all vegetables.',
        'Mix in a bowl.',
        'Drizzle with olive oil and lemon.',
        'Toss gently and serve.'
      ],
      createdBy: 2
    },
    {
        "id": 4,
        "title": "Grilled Chicken Salad",
        "description": "A healthy and refreshing salad with grilled chicken and a variety of vegetables.",
        "image": "https://source.unsplash.com/400x300/?grilled-chicken-salad",
        "cookTime": "20 mins",
        rating: 4.5,
        reviewCount: 23,
        "ingredients": [
          "2 chicken breasts",
          "Mixed greens (lettuce, spinach, arugula)",
          "1 cucumber",
          "1 bell pepper",
          "1 avocado",
          "Olive oil",
          "Lemon juice",
          "Salt and pepper"
        ],
        "steps": [
          "Grill the chicken breasts until cooked through and slice into strips.",
          "Chop the vegetables and avocado.",
          "Toss the greens and vegetables together in a large bowl.",
          "Add grilled chicken strips on top.",
          "Drizzle with olive oil and lemon juice, then season with salt and pepper.",
          "Toss gently and serve."
        ],
        createdBy: 2
      },
      {
        "id": 5,
        "title": "Caprese Salad",
        "description": "A classic Italian salad with fresh tomatoes, mozzarella, and basil, drizzled with balsamic vinegar.",
        "image": "https://source.unsplash.com/400x300/?caprese-salad",
        "cookTime": "10 mins",
        rating: 4.5,
        reviewCount: 23,
        "ingredients": [
          "2 large tomatoes",
          "200g fresh mozzarella",
          "Fresh basil leaves",
          "Olive oil",
          "Balsamic vinegar",
          "Salt and pepper"
        ],
        "steps": [
          "Slice the tomatoes and mozzarella into thick rounds.",
          "Arrange the tomatoes, mozzarella, and basil leaves on a plate.",
          "Drizzle with olive oil and balsamic vinegar.",
          "Season with salt and pepper.",
          "Serve immediately."
        ],
        createdBy: 3
      }      
  ];
  
  export default RecipeData;
  