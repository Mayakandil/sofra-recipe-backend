// Get the recipe ID from the URL
const params = new URLSearchParams(window.location.search);
const recipeId = params.get('id');

const detailArea = document.getElementById('recipeDetail');

// Fetch the specific recipe from the backend
fetch(`http://localhost:3000/api/recipes/${recipeId}`)
    .then(res => res.json())
    .then(recipe => {
        detailArea.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}" class="detail-image">
            <div class="detail-content">
                <h1>${recipe.name}</h1>
                <p class="main-ingredient">Main Ingredient: <span>${recipe.main}</span></p>
                <div class="ingredient-list">
                    <p>You'll need:</p>
                    ${recipe.all.map(ing => `<span class="ing-miss">${ing}</span>`).join('')}
                </div>
                <div class="note-section">
                    <textarea id="noteInput" placeholder="Add a personal note... (e.g. add less salt)"></textarea>
                </div>
                <div class="detail-buttons">
                    <button onclick="saveRecipe('${recipe._id}')" class="action-btn">Save Recipe</button>
                </div>
                <div id="saveMsg" class="placeholder-msg"></div>
            </div>
        `;
    });

// Save recipe to MongoDB
function saveRecipe(id) {
    fetch(`http://localhost:3000/api/recipes/${id}`)
        .then(res => res.json())
        .then(recipe => {
            const note = document.getElementById('noteInput').value;
            return fetch('http://localhost:3000/api/saved', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...recipe, recipeId: recipe._id, note })
            });
        })
        .then(res => res.json())
        .then(data => {
            const msg = document.getElementById('saveMsg');
            if (data.message === 'Already saved') {
                msg.innerText = 'Already in your saved recipes!';
            } else {
                msg.innerText = '✓ Recipe saved!';
            }
        });
}