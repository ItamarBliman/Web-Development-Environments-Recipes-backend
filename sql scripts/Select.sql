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
        1,
        'Chicken Recipe',
        'https://natashaskitchen.com/wp-content/uploads/2020/07/General-Tsos-Chicken-4-500x375.jpg',
        60,
        'John Smith',
        'Family Dinner',
        'Chicken 5 lb,Salt 4 lb,Pepper 2 lb',
        '1. Preheat the oven to 350°F. 2. Season the chicken with salt and pepper. 3. Place the chicken in a baking dish. 4. Bake for 45 minutes or until cooked through.'
    ), (
        1,
        'French Toast',
        'https://www.thespruceeats.com/thmb/MDioJIXM7Yaw5ZtJhzhG5wiO05Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-basic-french-toast-3056820-hero-01-6ed70ff7901a4e64995d890b03946ac0.jpg',
        20,
        'Jane Doe',
        'Sunday Brunch',
        'Eggs 2 unit,Milk 6 lb,Bread 3 unit,Salt 8 lb',
        '1. In a bowl, whisk together eggs and milk. 2. Dip bread slices into the egg mixture. 3. Heat a skillet over medium heat and melt butter. 4. Cook the bread slices on the skillet until golden brown on each side.'
    ), (
        1,
        'Holiday Beef Roast',
        'https://blog-content.omahasteaks.com/wp-content/uploads/2022/06/blogwp_how-to-cook-the-perfect-holiday-roast-scaled-1.jpg',
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

drop table users;

ALTER USER
    'root' @'localhost' IDENTIFIED
WITH
    mysql_native_password BY 'pass_root@123';

flush privileges;

drop table favoriterecipes;

drop table watchedrecipes;

drop table recipes;

select * from users;

select * from favoriterecipes 