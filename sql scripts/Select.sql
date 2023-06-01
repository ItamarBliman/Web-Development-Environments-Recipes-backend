INSERT INTO
    familyRecipe (
        user_id,
        title,
        image,
        readyInMinutes,
        author,
        occasion,
        extendedIngredients,
        instructions
    )
VALUES (
        3,
        'Chicken Recipe',
        'https://example.com/chicken.jpg',
        60,
        'John Smith',
        'Family Dinner',
        'Chicken 5 lb,Salt 4 lb,Pepper 2 lb',
        '1. Preheat the oven to 350°F. 2. Season the chicken with salt and pepper. 3. Place the chicken in a baking dish. 4. Bake for 45 minutes or until cooked through.'
    ), (
        3,
        'French Toast',
        'https://example.com/french_toast.jpg',
        20,
        'Jane Doe',
        'Sunday Brunch',
        'Eggs 2 unit,Milk 6 lb,Bread 3 unit,Salt 8 lb',
        '1. In a bowl, whisk together eggs and milk. 2. Dip bread slices into the egg mixture. 3. Heat a skillet over medium heat and melt butter. 4. Cook the bread slices on the skillet until golden brown on each side.'
    ), (
        3,
        'Holiday Beef Roast',
        'https://example.com/beef_roast.jpg',
        180,
        'David Johnson',
        'Holiday Celebration',
        'Beef roast 1 unit,Potatoes 2 lb,Carrots 3 unit,Onion 2 unit,Garlic 9 unit',
        '1. Preheat the oven to 325°F. 2. Season the beef roast with salt and pepper. 3. Place the beef roast in a roasting pan. 4. Add potatoes, carrots, onion, and garlic around the roast. 5. Roast in the oven for 2-3 hours or until the beef is cooked to your desired level of doneness.'
    );

SELECT * FROM familyRecipe;

SELECT * FROM recipes;

USE mydb;

drop table familyrecipe;

ALTER USER
    'root' @'localhost' IDENTIFIED
WITH
    mysql_native_password BY 'samira32167';

flush privileges;

drop table favoriterecipes;

drop table watchedrecipes;

drop table recipes;

select * from users;

select * from favoriterecipes 