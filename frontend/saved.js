function loadSaved() {
    fetch('http://localhost:3000/api/saved')
        .then(res => res.json())
        .then(recipes => {
            const list = document.getElementById('savedList');
            list.innerHTML = '';

            if (recipes.length === 0) {
                list.innerHTML = "<div class='placeholder-msg'>No saved recipes yet!</div>";
                return;
            }

            recipes.forEach(recipe => {
                list.innerHTML += `
                    <div class="recipe-card" id="card-${recipe._id}">
                        <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
                        <div class="recipe-content">
                            <h3>${recipe.name}</h3>
                            <div class="ingredient-list">
                                <p>Ingredients:</p>
                                ${recipe.all.map(ing => `<span class="ing-miss">${ing}</span>`).join('')}
                            </div>
                            <div class="note-section" style="margin-top: 1rem;">
                                <textarea id="note-${recipe._id}" placeholder="Your note...">${recipe.note}</textarea>
                                <button onclick="updateNote('${recipe._id}')" class="action-btn" style="width:auto; padding: 0.6rem 1.2rem; margin-top: 0.5rem; font-size: 0.9rem;">Save Note</button>
                            </div>
                            <button onclick="removeRecipe('${recipe._id}')" class="action-btn" style="width:auto; padding: 0.6rem 1.2rem; margin-top: 0.8rem; font-size: 0.9rem; background: var(--barley);">✕ Remove</button>
                            <div id="msg-${recipe._id}" class="placeholder-msg" style="margin-top: 0.5rem;"></div>
                        </div>
                    </div>
                `;
            });
        });
}

function updateNote(id) {
    const note = document.getElementById(`note-${id}`).value;
    fetch(`http://localhost:3000/api/saved/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note })
    })
    .then(res => res.json())
    .then(() => {
        document.getElementById(`msg-${id}`).innerText = '✓ Note saved!';
    });
}

function removeRecipe(id) {
    fetch(`http://localhost:3000/api/saved/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(() => {
            document.getElementById(`card-${id}`).remove();
        });
}

loadSaved();