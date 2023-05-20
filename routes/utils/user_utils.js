const DButils = require("./DButils");

exports.markAsFavorite = async function markAsFavorite(user_id, recipe_id) {
    await DButils.execQuery(`insert into favoriterecipes values ('${user_id}',${recipe_id})`);
}

exports.removeFromFavorite = async function removeFromFavorite(user_id, recipe_id) {
    return await DButils.execQuery(`delete from favoriterecipes where user_id='${user_id}' and recipe_id=${recipe_id}`);
}

exports.getFavoriteRecipes = async function getFavoriteRecipes(user_id) {
    return await DButils.execQuery(`select recipe_id from favoriterecipes where user_id='${user_id}'`);
}

exports.markAsWatched = async function markAsWatched(user_id, recipe_id) {
    await DButils.execQuery(`insert into watchedrecipes values ('${user_id}',${recipe_id})`);
}

exports.getWatchedRecipes = async function getWatchedRecipes(user_id) {
    return await DButils.execQuery(`select recipe_id from watchedrecipes where user_id='${user_id}'`);
}

exports.addNewRecipe = async function addNewRecipe(user_id, { name, imageURL, preparationTimeInMinutes, numOfLikes, vegan, vegetarian, glutenFree, instructions, servings, ingredients }) {
    return await DButils.execQuery(`insert into recipes values ('${user_id}','${name}','${imageURL}',${preparationTimeInMinutes},${numOfLikes},${vegan},${vegetarian},${glutenFree},'${instructions}',${servings})`);
}

exports.getMyRecipes = async function getMyRecipes(user_id) {
    const myRecipes = await DButils.execQuery(`select * from recipes where user_id='${user_id}'`);
    return myRecipes;
}

