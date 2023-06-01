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
        title VARCHAR(100),
        image VARCHAR(255),
        readyInMinutes INT,
        aggregateLikes INT,
        vegan TINYINT(1),
        vegetarian TINYINT(1),
        glutenFree TINYINT(1),
        instructions TEXT,
        servings INT,
        extendedIngredients TEXT,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );

CREATE TABLE
    favoriteRecipes (
        user_id INT,
        recipe_id INT,
        PRIMARY KEY (user_id, recipe_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );

CREATE TABLE
    watchedRecipes (
        user_id INT,
        recipe_id INT,
        PRIMARY KEY (user_id, recipe_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );

CREATE TABLE
    familyRecipe (
        recipe_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        title VARCHAR(100),
        image VARCHAR(255),
        readyInMinutes INT,
        author VARCHAR(100),
        occasion VARCHAR(100),
        extendedIngredients TEXT,
        instructions TEXT,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );