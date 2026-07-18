// Massive English Ingredient List
const categories = {
    "Pantry Staples":["Rice", "Pasta", "Flour", "Vegetable Oil", "Olive Oil", "Ghee", "Tomato Paste", "Fava Beans", "Brown Lentils", "Yellow Lentils", "Sugar", "White Beans", "Vinegar", "Vermicelli", "Oats", "Bread"],
    "Vegetables":["Tomatoes", "Onions", "Garlic", "Potatoes", "Bell Peppers", "Hot Peppers", "Lemons", "Zucchini", "Eggplant", "Okra", "Spinach", "Carrots", "Peas", "Cabbage"],
    "Dairy & Fridge":["Eggs", "Milk", "Roumy Cheese", "Feta Cheese", "Butter", "Yogurt", "Cheddar Cheese", "Mozzarella Cheese", "Cream"],
    "Proteins":["Minced Beef", "Beef Cubes", "Chicken Breast", "Whole Chicken", "Pastrami", "Hot Dogs", "Sausage", "Liver", "Fish", "Canned Tuna"],
    "Spices & Herbs":["Salt", "Black Pepper", "Cumin", "Coriander", "Fresh Parsley", "Fresh Dill", "Cardamom", "Cinnamon", "Bay Leaves"]
};



let selectedIngredients = new Set();

// Initialize the UI
function initFridge() {
    const container = document.getElementById("categoriesContainer");
    
    // Safety check just in case HTML hasn't loaded
    if (!container) {
        console.error("Error: Could not find the categoriesContainer in the HTML.");
        return;
    }
    
    for (const [catName, ingredients] of Object.entries(categories)) {
        const catDiv = document.createElement("div");
        catDiv.className = "category";
        catDiv.innerHTML = `<h4>${catName}</h4>`;
        
        const chipContainer = document.createElement("div");
        chipContainer.className = "chip-container";

        ingredients.forEach(ing => {
            const chip = document.createElement("div");
            chip.className = "chip ingredient-chip";
            chip.innerText = ing;
            chip.onclick = () => toggleIngredient(ing, chip);
            chipContainer.appendChild(chip);
        });

        catDiv.appendChild(chipContainer);
        container.appendChild(catDiv);
    }

    // Attach Event Listener to the new button
    const btn = document.getElementById("findRecipesBtn");
    if (btn) {
        btn.addEventListener("click", calculateRecipes);
    }

    // Run this once so the screen doesn't look completely empty on load
    updateSelectedUI();
}

// Handle Clicks 
function toggleIngredient(ing, element) {
    if (selectedIngredients.has(ing)) {
        selectedIngredients.delete(ing);
        element.classList.remove("selected");
    } else {
        selectedIngredients.add(ing);
        element.classList.add("selected");
    }
    updateSelectedUI();
}

// Update the Top "Selected" Box
function updateSelectedUI() {
    const area = document.getElementById("selectedChips");
    if (!area) return;

    area.innerHTML = "";
    
    if (selectedIngredients.size === 0) {
        area.innerHTML = "<p style='color: var(--rhino); font-weight: 700;'>None selected</p>";
    }

    selectedIngredients.forEach(ing => {
        const chip = document.createElement("div");
        chip.className = "chip selected";
        chip.innerText = ing + " (Remove)";
        chip.onclick = () => {
            const allChips = document.querySelectorAll('.ingredient-chip');
            allChips.forEach(c => { if(c.innerText === ing) toggleIngredient(ing, c) });
        };
        area.appendChild(chip);
    });
}

function calculateRecipes() {
    const resultsArea = document.getElementById("recipeResults");
    if (!resultsArea) return;

    resultsArea.innerHTML = "<div class='placeholder-msg'>Loading...</div>";

    if (selectedIngredients.size === 0) {
        resultsArea.innerHTML = `<div class="placeholder-msg">Select your ingredients and click "Find Recipes" to reveal meals.</div>`;
        return;
    }

    // AJAX call to our backend
    fetch('http://localhost:3000/api/recipes')
        .then(res => res.json())
        .then(recipes => {
            resultsArea.innerHTML = "";

            let matchedRecipes = [];
            let allScoredRecipes = [];

            recipes.forEach(recipe => {
                let matchCount = 0;
                recipe.all.forEach(reqIng => {
                    if (selectedIngredients.has(reqIng)) matchCount++;
                });

                const matchPercentage = matchCount / recipe.all.length;
                const hasMain = selectedIngredients.has(recipe.main);

                const scoredRecipe = { ...recipe, matchCount, matchPercentage, hasMain };
                allScoredRecipes.push(scoredRecipe);

                if (hasMain || matchPercentage >= 0.8) {
                    matchedRecipes.push(scoredRecipe);
                }
            });

            let isFallback = false;

            if (matchedRecipes.length === 0) {
                isFallback = true;
                allScoredRecipes.sort((a, b) => b.matchPercentage - a.matchPercentage);
                matchedRecipes = allScoredRecipes.slice(0, 3);

                const notice = document.createElement("p");
                notice.style.color = "var(--rhino)";
                notice.style.fontWeight = "900";
                notice.style.marginBottom = "1rem";
                notice.innerText = "No perfect matches, but here are the closest options:";
                resultsArea.appendChild(notice);
            } else {
                matchedRecipes.sort((a, b) => b.matchPercentage - a.matchPercentage);
            }

            matchedRecipes.forEach(recipe => {
                let ingHTML = "";
                recipe.all.forEach(ing => {
                    if (selectedIngredients.has(ing)) {
                        ingHTML += `<span class="ing-have">${ing}</span>`;
                    } else {
                        ingHTML += `<span class="ing-miss">${ing}</span>`;
                    }
                });

                let badgeClass = recipe.hasMain ? "perfect" : "good";
                let badgeText = recipe.hasMain ? "Main Ingredient Match" : "Strong Match";
                if (isFallback) { badgeClass = "good"; badgeText = "Closest Option"; }

                resultsArea.innerHTML += `
                    <div class="recipe-card" onclick="window.location.href='recipe.html?id=${recipe._id}'" style="cursor:pointer">
                        <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
                        <div class="recipe-content">
                            <h3>${recipe.name}</h3>
                            <span class="badge ${badgeClass}">${badgeText}</span>
                            <div class="ingredient-list">
                                <p>Ingredients:</p>
                                ${ingHTML}
                            </div>
                        </div>
                    </div>
                `;
            });
        })
        .catch(err => {
            resultsArea.innerHTML = "<div class='placeholder-msg'>Error loading recipes. Is the server running?</div>";
            console.error(err);
        });
}
// Ensure HTML loads entirely before trying to run the script
document.addEventListener("DOMContentLoaded", initFridge);