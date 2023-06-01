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
    const { data } = await getRecipeInformation(recipe_id);
    const { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree, extendedIngredients, instructions, servings } = data;

    let extendedIngredientsString = "";
    extendedIngredients?.forEach(ingredient => {
        extendedIngredientsString += ingredient.name + " " + ingredient.amount + " " + (ingredient.unit || "unit") + ",";
    });

    if (extendedIngredientsString.length > 0) {
        extendedIngredientsString = extendedIngredientsString.substring(0, extendedIngredientsString.length - 1);
    }

    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        aggregateLikes: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        extendedIngredients: extendedIngredientsString,
        instructions: instructions,
        servings: servings,
        favorite: false,
        watched: false
    }
}


exports.getFavoriteWatched = async function getFavoriteWatched(recipe, user_id) {
    const favoriteRecipes = await DButils.execQuery(`select recipe_id from favoriteRecipes where user_id=${user_id} and recipe_id=${recipe.id}`);
    const watchedRecipes = await DButils.execQuery(`select recipe_id from watchedRecipes where user_id=${user_id} and recipe_id=${recipe.id}`);
    if (favoriteRecipes.length > 0) {
        recipe.favorite = true;
    }
    if (watchedRecipes.length > 0) {
        recipe.watched = true;
    }
    return recipe;
}


exports.getMyRecipeDetails = async function getMyRecipeDetails(minus_recipe_id, user_id) {
    const recipe_info = await DButils.execQuery(`select * from recipes where recipe_id='${minus_recipe_id * (-1)}' and user_id='${user_id}'`);
    if (recipe_info.length == 0) {
        throw { status: 404, message: "Recipe not found" };
    }
    const { recipe_id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree, extendedIngredients, instructions, servings } = recipe_info[0];

    return {
        id: recipe_id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        aggregateLikes: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        extendedIngredients: extendedIngredients,
        instructions: instructions,
        servings: servings
    }
}


exports.getThreeRandomRecipes = async function getThreeRandomRecipes() {
    const data = await axios.get(`${api_domain}/random`, {
        params: {
            number: 3,
            apiKey: process.env.spooncular_apiKey
        }
    });
    return data.data.recipes;
}

exports.getFromSearchRecipes = async function getFromSearchRecipes({ searchTerm, quantity, cuisine, diet, intolerances, sortBy }) {
    const finalQuantity = quantity ? quantity : 5;

    const data = await axios.get(`${api_domain}/complexSearch`, {
        params: {
            query: searchTerm,
            number: finalQuantity,
            cuisine: cuisine,
            diet: diet,
            intolerances: intolerances,
            instructionsRequired: true,
            addRecipeInformation: true,
            sort: sortBy,
            apiKey: process.env.spooncular_apiKey
        }
    });
    return data.data.results;
}

exports.checkSession = async function checkSession(req) {
    let user_id;
    if (req.session && req.session.user_id) {
        await DButils.execQuery("SELECT user_id FROM users").then((users) => {
            if (users.find((x) => x.user_id === req.session.user_id)) {
                user_id = req.session.user_id;
            }
        });
    }
    return user_id;
}


exports.getPreviewRecipes = async function getPreviewRecipes(arrayRecipes, user_id) {
    const arrayPreviewRecipes = arrayRecipes.map(recipe => {
        return {
            id: recipe.id,
            title: recipe.title,
            readyInMinutes: recipe.readyInMinutes,
            image: recipe.image,
            aggregateLikes: recipe.aggregateLikes,
            vegan: recipe.vegan,
            vegetarian: recipe.vegetarian,
            glutenFree: recipe.glutenFree,
            favorite: false,
            watched: false
        };
    });

    if (user_id) {
        const favoriteRecipes = await DButils.execQuery(`select recipe_id from favoriteRecipes where user_id = '${user_id}'`);
        const watchedRecipes = await DButils.execQuery(`select recipe_id from watchedRecipes where user_id = '${user_id}'`);
        arrayPreviewRecipes.forEach(recipe => {
            if (favoriteRecipes.find(element => element.recipe_id === recipe.id)) {
                recipe.favorite = true;
            }
            if (watchedRecipes.find(element => element.recipe_id === recipe.id)) {
                recipe.watched = true;
            }
        });
    }
    return arrayPreviewRecipes;
}

exports.getInfoRecipes = async function getInfoRecipes(recipes_id) {
    const promises = [];
    recipes_id.map(element => {
        promises.push(exports.getRecipeDetails(element.recipe_id));
    });
    return await Promise.all(promises);
}

