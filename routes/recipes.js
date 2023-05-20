var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");
const { check } = require("express-validator");

// router.get("/", (req, res) => res.send("im here"));

/**
 * This path returns all the family recipes
 */
router.get("/familyRecipes", async (req, res, next) => {
  try {
    res.send(await recipes_utils.getFamilyRecipes());
  } catch (error) {
    next(error);
  }
});


/**
 * This path returns all the family recipes
 */
router.get("/random", async (req, res, next) => {
  try {
    const user_id = recipes_utils.checkSession(req);
    const arrayRecipes = await recipes_utils.getThreeRandomRecipes();
    res.send(await recipes_utils.getPreviewRecipes(arrayRecipes, user_id));
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns all the family recipes
 */
router.get("/search", async (req, res, next) => {
  try {
    const user_id = recipes_utils.checkSession(req);
    const arrayRecipes = await recipes_utils.getFromSearchRecipes(req.query);
    if (arrayRecipes.length == 0) {
      throw { status: 404, message: "No recipes found" };
    }
    res.send(await recipes_utils.getPreviewRecipes(arrayRecipes, user_id));

  } catch (error) {
    next(error);
  }
});


/**
 * This path returns a full details of a recipe by its id
 */
router.get("/:recipe_id", async (req, res, next) => {
  try {
    const value = req.params.recipe_id;
    if (isNaN(value)) {
      throw { status: 400, message: "recipe_id must be an integer" };
    }
    const recipe = await recipes_utils.getRecipeDetails(value);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
