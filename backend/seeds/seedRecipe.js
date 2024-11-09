const recipes = [
    {
      title: "Spaghetti Bolognese",
      description: "A classic Italian pasta dish with a rich tomato and meat sauce.",
      ingredients: [
        { name: "Spaghetti", quantity: "200", unit: "grams" },
        { name: "Ground beef", quantity: "300", unit: "grams" },
        { name: "Tomato sauce", quantity: "500", unit: "ml" },
        { name: "Garlic", quantity: "2", unit: "cloves" },
      ],
      instructions: [
        "Boil the spaghetti according to package instructions.",
        "In a pan, cook ground beef until browned.",
        "Add garlic and cook for another 2 minutes.",
        "Add tomato sauce and simmer for 10 minutes.",
        "Serve sauce over spaghetti."
      ],
      difficulty: "Easy",
      tags: ["Pasta", "Italian", "Main Course"],
      time_consuming: { value: 30, unit: "minutes" },
    },
    {
      title: "Chicken Curry",
      description: "A flavorful and spicy chicken curry with coconut milk.",
      ingredients: [
        { name: "Chicken breast", quantity: "300", unit: "grams" },
        { name: "Coconut milk", quantity: "400", unit: "ml" },
        { name: "Curry powder", quantity: "2", unit: "tbsp" },
        { name: "Onion", quantity: "1", unit: "piece" },
      ],
      instructions: [
        "Cook chopped onions until softened.",
        "Add chicken and curry powder, cook for 5 minutes.",
        "Pour in coconut milk and simmer for 20 minutes.",
        "Serve with rice or naan bread."
      ],
      difficulty: "Intermediate",
      tags: ["Indian", "Spicy", "Main Course"],
      time_consuming: { value: 45, unit: "minutes" },
    },
    {
      title: "Veggie Stir Fry",
      description: "A healthy stir fry with mixed vegetables and a soy sauce glaze.",
      ingredients: [
        { name: "Mixed vegetables", quantity: "500", unit: "grams" },
        { name: "Soy sauce", quantity: "2", unit: "tbsp" },
        { name: "Sesame oil", quantity: "1", unit: "tbsp" },
        { name: "Ginger", quantity: "1", unit: "inch" },
      ],
      instructions: [
        "Heat sesame oil in a pan and sauté ginger.",
        "Add mixed vegetables and stir fry for 5-7 minutes.",
        "Add soy sauce and cook for another 3 minutes.",
        "Serve with rice or noodles."
      ],
      difficulty: "Easy",
      tags: ["Vegetarian", "Quick", "Healthy"],
      time_consuming: { value: 20, unit: "minutes" },
    },
    {
      title: "Beef Tacos",
      description: "Tacos filled with seasoned ground beef and fresh toppings.",
      ingredients: [
        { name: "Ground beef", quantity: "300", unit: "grams" },
        { name: "Taco seasoning", quantity: "1", unit: "packet" },
        { name: "Taco shells", quantity: "6", unit: "pieces" },
        { name: "Lettuce", quantity: "1", unit: "cup" },
      ],
      instructions: [
        "Cook ground beef and taco seasoning in a pan.",
        "Fill taco shells with seasoned beef and top with lettuce.",
        "Serve with salsa and sour cream."
      ],
      difficulty: "Easy",
      tags: ["Mexican", "Fast Food", "Main Course"],
      time_consuming: { value: 25, unit: "minutes" },
    },
    {
      title: "Grilled Salmon",
      description: "A simple yet delicious grilled salmon with lemon and herbs.",
      ingredients: [
        { name: "Salmon fillets", quantity: "2", unit: "pieces" },
        { name: "Lemon", quantity: "1", unit: "piece" },
        { name: "Olive oil", quantity: "2", unit: "tbsp" },
        { name: "Herbs (thyme, rosemary)", quantity: "1", unit: "tbsp" },
      ],
      instructions: [
        "Preheat grill to medium heat.",
        "Brush salmon with olive oil and herbs.",
        "Grill salmon for 4-5 minutes on each side.",
        "Serve with lemon wedges."
      ],
      difficulty: "Intermediate",
      tags: ["Seafood", "Healthy", "Grilled"],
      time_consuming: { value: 20, unit: "minutes" },
    },
    {
      title: "Chocolate Cake",
      description: "A rich and moist chocolate cake with a creamy frosting.",
      ingredients: [
        { name: "Flour", quantity: "200", unit: "grams" },
        { name: "Cocoa powder", quantity: "50", unit: "grams" },
        { name: "Sugar", quantity: "150", unit: "grams" },
        { name: "Butter", quantity: "100", unit: "grams" },
      ],
      instructions: [
        "Preheat the oven to 180°C (350°F).",
        "Mix dry ingredients and then add butter and eggs.",
        "Bake for 30 minutes or until a toothpick comes out clean.",
        "Frost with chocolate ganache."
      ],
      difficulty: "Advanced",
      tags: ["Dessert", "Baked", "Chocolate"],
      time_consuming: { value: 60, unit: "minutes" },
    },
];

module.exports = recipes;
