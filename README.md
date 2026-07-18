# Sofra Backend 🍽️

Sofra Backend is a RESTful API for a smart recipe recommendation application.

The application works like a virtual fridge: users select the ingredients they currently have, and the frontend uses the recipe data provided by this backend to display recipes that can be prepared with those ingredients.

Users can also save recipes, add personal notes, update saved notes, and remove recipes from their saved list.

## Main Features

- Retrieve all available recipes.
- Retrieve one recipe by its ID.
- Add new recipes.
- Update existing recipes.
- Delete recipes.
- Store recipe ingredients in MongoDB.
- Support ingredient-based recipe recommendations.
- Save favorite recipes.
- Prevent duplicate saved recipes.
- Add and edit personal notes on saved recipes.
- Remove recipes from the saved list.
- Seed the database with sample Egyptian and international recipes.
- Allow communication with a separate frontend using CORS.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript
- CORS
- REST API

## Project Structure

```text
sofra-backend/
│
├── models/
│   ├── Recipe.js
│   └── SavedRecipe.js
│
├── routes/
│   ├── recipes.js
│   └── savedRecipes.js
│
├── seed.js
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

## How the Application Works

1. Recipe data is stored in MongoDB.
2. Each recipe contains a name, main ingredient, image, and full ingredient list.
3. The frontend displays available fridge ingredients.
4. The user selects the ingredients currently available.
5. The frontend compares the selected ingredients with each recipe's `all` ingredient array.
6. Matching recipes are displayed to the user.
7. The user can save a recipe and optionally attach a personal note.

> The current backend provides recipe and saved-recipe data. The ingredient matching logic can be implemented in the frontend or later added as a dedicated backend endpoint.

## Data Models

### Recipe

```json
{
  "name": "Classic Shakshouka",
  "main": "Eggs",
  "image": "https://example.com/shakshouka.jpg",
  "all": [
    "Eggs",
    "Tomatoes",
    "Onions",
    "Ghee",
    "Salt",
    "Black Pepper"
  ]
}
```

| Field | Type | Description |
|---|---|---|
| `name` | String | Recipe name |
| `main` | String | Main recipe ingredient |
| `image` | String | Recipe image URL |
| `all` | Array of Strings | Complete ingredient list |

### Saved Recipe

```json
{
  "recipeId": "recipe-id",
  "name": "Classic Shakshouka",
  "main": "Eggs",
  "image": "https://example.com/shakshouka.jpg",
  "all": ["Eggs", "Tomatoes", "Onions"],
  "note": "Use less black pepper next time."
}
```

| Field | Type | Description |
|---|---|---|
| `recipeId` | String | ID of the original recipe |
| `name` | String | Saved recipe name |
| `main` | String | Main ingredient |
| `image` | String | Recipe image URL |
| `all` | Array of Strings | Recipe ingredients |
| `note` | String | Optional personal note |

## API Endpoints

The server runs locally on:

```text
http://localhost:3000
```

### Recipe Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/recipes` | Return all recipes |
| `GET` | `/api/recipes/:id` | Return one recipe |
| `POST` | `/api/recipes` | Create a new recipe |
| `PUT` | `/api/recipes/:id` | Update a recipe |
| `DELETE` | `/api/recipes/:id` | Delete a recipe |

### Saved Recipe Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/saved` | Return all saved recipes |
| `POST` | `/api/saved` | Save a recipe |
| `PUT` | `/api/saved/:id` | Update the note of a saved recipe |
| `DELETE` | `/api/saved/:id` | Remove a saved recipe |

## Example Requests

### Get All Recipes

```http
GET /api/recipes
```

### Add a Recipe

```http
POST /api/recipes
Content-Type: application/json
```

```json
{
  "name": "Cheese Omelette",
  "main": "Eggs",
  "image": "https://example.com/omelette.jpg",
  "all": ["Eggs", "Cheese", "Butter", "Salt", "Black Pepper"]
}
```

### Save a Recipe

```http
POST /api/saved
Content-Type: application/json
```

```json
{
  "recipeId": "RECIPE_ID",
  "name": "Cheese Omelette",
  "main": "Eggs",
  "image": "https://example.com/omelette.jpg",
  "all": ["Eggs", "Cheese", "Butter"],
  "note": "Add tomatoes next time."
}
```

### Update a Saved Recipe Note

```http
PUT /api/saved/SAVED_RECIPE_ID
Content-Type: application/json
```

```json
{
  "note": "Use mozzarella cheese next time."
}
```

## Installation and Setup

### Prerequisites

Install the following software before running the project:

- Node.js
- npm
- MongoDB

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd sofra-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start MongoDB

Make sure the MongoDB service is running locally.

The project currently connects to:

```text
mongodb://localhost:27017/sofra
```

### 4. Seed the Database

Run the seed file to insert the sample recipes:

```bash
node seed.js
```

This command clears the old recipes and inserts the sample recipe collection.

### 5. Start the Server

```bash
node server.js
```

The terminal should display:

```text
MongoDB connected!
Server running on http://localhost:3000
```

## Suggested package.json Scripts

You can add these scripts inside `package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "seed": "node seed.js"
  }
}
```

Then run the project using:

```bash
npm start
```

To seed the database:

```bash
npm run seed
```

## Ingredient Matching Example

A simple frontend matching approach could be:

```javascript
const matchingRecipes = recipes.filter((recipe) =>
  recipe.all.every((ingredient) =>
    selectedIngredients.includes(ingredient)
  )
);
```

This returns recipes where all required ingredients are included in the user's selected fridge ingredients.

Another option is to rank recipes by the number of matching ingredients and display the closest matches first.

## Important Notes Before Uploading to GitHub

Rename these files before uploading:

```text
server(1).js  →  server.js
package(1).json  →  package.json
```

Also make sure the files are placed in the correct folders:

```text
Recipe.js       → models/Recipe.js
SavedRecipe.js  → models/SavedRecipe.js
recipes.js      → routes/recipes.js
savedRecipes.js → routes/savedRecipes.js
```

Do not upload the `node_modules` folder. It can be recreated using `npm install`.

Create a `.gitignore` file containing:

```gitignore
node_modules/
.env
.DS_Store
```

## Current Development Notes

- The MongoDB connection URL is currently written directly in the source code.
- For deployment, move the database URL to an environment variable.
- Authentication is not currently included.
- Saved recipes are currently shared globally and are not connected to individual users.
- Input validation and centralized error handling can be added in a future version.
- A dedicated recommendation endpoint can be added later.

## Future Improvements

- Add user registration and login.
- Associate saved recipes with individual users.
- Add a backend ingredient recommendation endpoint.
- Rank recipes by ingredient match percentage.
- Display missing ingredients for each suggested recipe.
- Add recipe instructions, preparation time, cuisine type, and difficulty.
- Add input validation and better API error responses.
- Use environment variables for configuration.
- Deploy the backend and MongoDB database online.
- Add automated API tests.

## Author

Developed as part of the **Sofra recipe application** project.

## License

This project is licensed under the ISC License.
