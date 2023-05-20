const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";
const DButils = require("./DButils");



/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info 
 */


async function getRecipeInformation(recipe_id) {
    return await axios.get(`${api_domain}/${recipe_id}/information`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey
        }
    });
}



exports.getRecipeDetails = async function getRecipeDetails(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_info.data;

    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,

    }
}

exports.getFamilyRecipes = async function getFamilyRecipes() {
    return await DButils.execQuery(`select * from familyRecipe`);
}


exports.getThreeRandomRecipes = async function getThreeRandomRecipes() {
    const data = await axios.get(`${api_domain}/random`, {
        params: {
            number: 3,
            apiKey: process.env.spooncular_apiKey
        }
    });
    console.log(data.data.recipes.length);
    return data.data.recipes;
}

exports.getFromSearchRecipes = async function getFromSearchRecipes({ searchTerm, quantity, cuisine, diet, intolerances }) {
    const finalQuantity = quantity ? quantity : 5;
    
    const data = await axios.get(`${api_domain}/complexSearch`, {
        params: {
            query: searchTerm,
            number: finalQuantity,
            cuisine: cuisine,
            diet: diet,
            intolerances: intolerances,
            apiKey: process.env.spooncular_apiKey
        }
    });
    console.log(data.data.results);
    return data.data.results;
}

