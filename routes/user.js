var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const user_utils = require("./utils/user_utils");
const recipe_utils = require("./utils/recipes_utils");

/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM users").then((users) => {
      if (users.find((x) => x.user_id === req.session.user_id)) {
        req.user_id = req.session.user_id;
        next();
      }
    }).catch(err => next(err));
  } else {
    res.sendStatus(401);
  }
});


/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
router.post('/favorites', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipe_id;
    if (!recipe_id) {
      throw { status: 400, message: "recipe id is missing" };
    }
    if (isNaN(recipe_id)) {
      throw { status: 400, message: "recipe_id must be an integer" };
    }
    await user_utils.markAsFavorite(user_id, recipe_id);
    res.send({ status: 200, message: "The recipe successfully saved as favorite" });
  } catch (error) {
    if (error.code == 'ER_DUP_ENTRY')
      error = { status: 409, message: "The recipe already saved as favorite" };
    next(error);
  }
})

/**
 * This path returns the favorites recipes that were saved by the logged-in user
 */
router.get('/favorites', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const recipes_id = await user_utils.getFavoriteRecipes(user_id);
    const arrayRecipes = await recipe_utils.getInfoRecipes(recipes_id);
    res.send(await recipe_utils.getPreviewRecipes(arrayRecipes, user_id));
  } catch (error) {
    next(error);
  }
});


/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
router.post('/watched', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipe_id;
    if (!recipe_id) {
      throw { status: 400, message: "recipe id is missing" };
    }
    if (isNaN(recipe_id)) {
      throw { status: 400, message: "recipe_id must be an integer" };
    }
    await user_utils.markAsWatched(user_id, recipe_id);
    res.send({ status: 200, message: "The recipe successfully saved as watched" });
  } catch (error) {
    if (error.code == 'ER_DUP_ENTRY')
      error = { status: 409, message: "The recipe already saved as watched" };
    next(error);
  }
})

/**
 * This path returns the favorites recipes that were saved by the logged-in user
 */
router.get('/watched', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const recipes_id = await user_utils.getWatchedRecipes(user_id);
    const arrayRecipes = await recipe_utils.getInfoRecipes(recipes_id);
    res.send(await recipe_utils.getPreviewRecipes(arrayRecipes, user_id));
  } catch (error) {
    next(error);
  }
});


/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
router.delete('/favorites/:recipe_id', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const recipe_id = req.params.recipe_id;
    if (isNaN(recipe_id)) {
      throw { status: 400, message: "recipe_id must be an integer" };
    }
    const result = await user_utils.removeFromFavorite(user_id, recipe_id);
    if (result.affectedRows === 0) {
      throw { status: 404, message: "The recipe is not in the favorite list" };
    }
    res.send({ status: 200, message: "The recipe successfully removed from favorite" });
  } catch (error) {
    next(error);
  }
})


/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
router.post('/createdRecipe', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;

    const results = await user_utils.addNewRecipe(user_id, req.body);
    if (results.affectedRows === 0) {
      throw { status: 400, message: "Invalid recipe supplied" };
    }
    res.send({ status: 200, message: "The recipe successfully added to my recipes" });
  } catch (error) {
    next(error);
  }
})


/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
router.get('/createdRecipe', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const results = await user_utils.getMyRecipes(user_id);
    res.send(results);
  } catch (error) {
    next(error);
  }
})

/**
 * This path returns all the family recipes
 */
router.get("/familyRecipes", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    res.send(await user_utils.getFamilyRecipes(user_id));
  } catch (error) {
    next(error);
  }
});


module.exports = router;
