const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');

const recipes = [
    { name: "Classic Shakshouka", main: "Eggs", image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=400&q=80", all:["Eggs", "Tomatoes", "Onions", "Ghee", "Salt", "Black Pepper"] },
    { name: "Authentic Fava Beans", main: "Fava Beans", image: "https://images.unsplash.com/photo-1548943487-a2e4f43b4850?auto=format&fit=crop&w=400&q=80", all: ["Fava Beans", "Lemons", "Vegetable Oil", "Cumin", "Salt"] },
    { name: "Egyptian Koshary", main: "Brown Lentils", image: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=400&q=80", all:["Brown Lentils", "Rice", "Pasta", "Onions", "Tomato Paste", "Garlic", "Vinegar", "Vegetable Oil"] },
    { name: "Baked Macaroni Béchamel", main: "Minced Beef", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=400&q=80", all:["Pasta", "Minced Beef", "Milk", "Flour", "Ghee", "Onions", "Salt", "Black Pepper"] },
    { name: "Pastrami and Eggs", main: "Pastrami", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80", all:["Pastrami", "Eggs", "Ghee", "Black Pepper"] },
    { name: "Oven Baked Potato Chicken", main: "Potatoes", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=80", all:["Potatoes", "Tomatoes", "Onions", "Garlic", "Whole Chicken", "Ghee", "Salt", "Black Pepper"] },
    { name: "Yellow Lentil Soup", main: "Yellow Lentils", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=80", all:["Yellow Lentils", "Carrots", "Onions", "Tomatoes", "Cumin", "Ghee"] },
    { name: "Fried Eggplant with Garlic", main: "Eggplant", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=400&q=80", all:["Eggplant", "Garlic", "Vinegar", "Hot Peppers", "Vegetable Oil", "Salt"] },
    { name: "Beef and Okra Stew", main: "Okra", image: "https://images.unsplash.com/photo-1548946522-4a313e8972a4?auto=format&fit=crop&w=400&q=80", all:["Okra", "Beef Cubes", "Tomatoes", "Onions", "Garlic", "Ghee", "Salt"] },
    { name: "Alexandrian Liver", main: "Liver", image: "https://images.unsplash.com/photo-1627308595229-7830f5c9100f?auto=format&fit=crop&w=400&q=80", all:["Liver", "Garlic", "Bell Peppers", "Hot Peppers", "Lemons", "Cumin", "Vegetable Oil"] },
    { name: "Zucchini Béchamel", main: "Zucchini", image: "https://images.unsplash.com/photo-1615486171448-4fd18c6bf6ba?auto=format&fit=crop&w=400&q=80", all:["Zucchini", "Minced Beef", "Milk", "Flour", "Ghee", "Onions"] },
    { name: "Tuna Salad Bowl", main: "Canned Tuna", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80", all:["Canned Tuna", "Onions", "Lemons", "Vegetable Oil", "Bell Peppers", "Salt"] },
    { name: "Crispy Fried Fish", main: "Fish", image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=400&q=80", all:["Fish", "Garlic", "Cumin", "Lemons", "Flour", "Vegetable Oil"] },
    { name: "White Beans Stew", main: "White Beans", image: "https://images.unsplash.com/photo-1582285191060-f42f77e2ff1b?auto=format&fit=crop&w=400&q=80", all:["White Beans", "Beef Cubes", "Tomatoes", "Onions", "Garlic", "Ghee"] },
    { name: "Peas and Carrots Stew", main: "Peas", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80", all:["Peas", "Carrots", "Minced Beef", "Tomatoes", "Onions", "Ghee"] },
    { name: "Vermicelli Rice", main: "Vermicelli", image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=400&q=80", all:["Rice", "Vermicelli", "Ghee", "Salt"] },
    { name: "Chicken Pané", main: "Chicken Breast", image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=400&q=80", all:["Chicken Breast", "Eggs", "Flour", "Onions", "Vegetable Oil"] },
    { name: "Hawawshi", main: "Minced Beef", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80", all:["Minced Beef", "Bread", "Onions", "Bell Peppers", "Hot Peppers", "Salt", "Black Pepper", "Ghee"] },
    { name: "Cheese and Tomato Sandwich", main: "Feta Cheese", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80", all:["Feta Cheese", "Tomatoes", "Olive Oil", "Bread"] },
    { name: "Garlic Butter Chicken", main: "Chicken Breast", image: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=400&q=80", all:["Chicken Breast", "Garlic", "Butter", "Salt", "Black Pepper", "Fresh Parsley"] }
];

mongoose.connect('mongodb://localhost:27017/sofra')
  .then(async () => {
    console.log('Connected! Seeding...');
    await Recipe.deleteMany(); // clears old data first
    await Recipe.insertMany(recipes);
    console.log('Done! All recipes inserted.');
    process.exit();
  })
  .catch(err => console.log(err));