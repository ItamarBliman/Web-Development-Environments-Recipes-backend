var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");

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
    res.send(await recipes_utils.getThreeRandomRecipes());
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns all the family recipes
 */
router.get("/search", async (req, res, next) => {
  try {
    res.send(await recipes_utils.getFromSearchRecipes(req.query));
  } catch (error) {
    next(error);
  }
});


/**
 * This path returns a full details of a recipe by its id
 */
router.get("/:recipeId", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getRecipeDetails(req.params.recipeId);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
