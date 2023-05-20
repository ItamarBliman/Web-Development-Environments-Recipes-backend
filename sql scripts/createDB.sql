DROP DATABASE IF EXISTS mydb;

CREATE DATABASE mydb;

USE mydb;

CREATE TABLE
    users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50),
        firstname VARCHAR(50),
        lastname VARCHAR(50),
        country VARCHAR(50),
        password VARCHAR(255),
        email VARCHAR(100)
    );

CREATE TABLE
    recipes (
        recipe_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        name VARCHAR(100),
        imageURL VARCHAR(255),
        preparationTimeInMinutes INT,
        numOfLikes INT,
        vegan TINYINT(1),
        vegetarian TINYINT(1),
        glutenFree TINYINT(1),
        instructions TEXT,
        servings INT,
        ingredients TEXT,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );

CREATE TABLE
    favoriteRecipes (
        user_id INT,
        recipe_id INT,
        PRIMARY KEY (user_id, recipe_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id)
    );

CREATE TABLE
    watchedRecipes (
        user_id INT,
        recipe_id INT,
        PRIMARY KEY (user_id, recipe_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id)
    );

CREATE TABLE
    familyRecipe (
        recipe_id INT AUTO_INCREMENT PRIMARY KEY,
        author VARCHAR(100),
        occasion VARCHAR(100),
        ingredients TEXT,
        instructions TEXT
    );