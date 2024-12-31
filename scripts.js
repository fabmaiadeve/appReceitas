/**
 * Lógica de Programação
 * [x] Pegar a informação do input, quando o botão for clicado
 * [x] Ir até a API, e trazer as receitas
 * [x] Colocar as receitas na tela
 * [x] Saber quando o usuário clicou na receita
 * [x] Buscar informações da receita individual na API
 * [x] Colocar a receita individual na tela
 * 
 */

//const input = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
const recipeList = document.querySelector('.recipe-list');
const recipeDetails = document.querySelector('.recipe-details');

form.addEventListener('submit', function(event){
    event.preventDefault();
    const inputValue = event.target[0].value;

    searchRecipe(inputValue);    
})

async function searchRecipe(ingredient) {
    recipeList.innerHTML = `<p>Carregando Receitas ...</p>`
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);

        const data = await response.json();
        //console.log(data);
        showRecipes(data.meals)
    } catch(err) {
        recipeList.innerHTML = `<p>Nenhuma receita encontrada</p>`

    }    
}

function showRecipes(recipes) {
    recipeList.innerHTML = recipes.map((item) => `
        <div class="recipe-card" onClick="getRecipeDetails(${item.idMeal})">
            <img src="${item.strMealThumb}" alt="${item.strMeal}" />
            <h3>${item.strMeal}</h3>
        </div>
        `).join('')
}

async function getRecipeDetails(id) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    console.log(id);
    const data = await response.json();
    console.log(data);
    const recipe = data.meals[0];
    console.log(recipe);

    let ingredients = '';

    for(let i = 1; i <= 20; i++) {
        if(recipe[`strIngredient${i}`]) {
            console.log(recipe[`strIngredient${i}`]);
            ingredients += `<li>${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}</li>`
        } else {
            break;
        }
    }

    recipeDetails.innerHTML = `
        <h2>${recipe.strMeal}</h2>
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" />
        <h3>${recipe.strCategory}</h3>
        <h3>${recipe.strArea}</h3>
        <h3>Ingredients:</h3>
        <ul>${ingredients}</ul>
        <h3>Instruções - Modo de Preparo:</h3>
        <p>${recipe.strInstructions}</p>
        <p>Tags: ${recipe.strTags}</p>
        <p>Vídeo: <a href="${recipe.strYoutube}" target="_blank">Assista no YouTube</a></p>    
    `
}
