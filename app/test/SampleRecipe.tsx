import React, { useState } from "react";

interface Ingredient {
    item: string;
    qty: number;
    unit: string;
}

interface Recipe {
    title: string;
    description: string;
    serving: number;
    equipments: string[];
    ingredients: Ingredient;
    categories: string[];
    prepTime: number;
    cookTime: number;
    //notes: string;
    owner: string;
}

const sampleRecipe: Recipe = {
    title: 'Ramen',
    description: "This is a ramen",
    serving: 2,
    equipments: ['pan', 'oven'],
    ingredients: { item: 'chicken', qty: 2, unit: 'pcs' },
    categories: ['noodles', 'Japanese'],
    prepTime: 10,
    cookTime: 10,
    //notes: "this is a sample note",
    owner: "userName",
}

const SampleRecipeComponent = () => {
    const [GlobalEquipments, setGlobalEquipments] = useState([
        'Knife',
        'Cutting Board',
        'Mixing Bowl',
        'Measuring Cup',
        'Measuring Spoon',
        'Whisk',
        'Spatula',
        'Pot',
        'Pan',
        'Blender',
        'Oven',
        'Mixer',
        'Strainer',
        'Grater',
        'Peeler'
    ]);

    const [GlobalCategories, setGlobalCategories] = useState([
        'Appetizers',
        'Main Dishes',
        'Side Dishes',
        'Salads',
        'Soups',
        'Stews',
        'Desserts',
        'Beverages',
        'Snacks',
        'Breads',
        'Breakfast',
        'Brunch',
        'Lunch',
        'Dinner',
        'Holiday Specials'
    ]);

    return <div>{/* Your JSX code here */}</div>;
}

export default SampleRecipeComponent;
