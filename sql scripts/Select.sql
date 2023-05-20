INSERT INTO familyRecipe (name, imageURL, preparationTimeInMinutes, author, occasion, ingredients, instructions)
VALUES
    ('Chicken Recipe', 'https://example.com/chicken.jpg', 60, 'John Smith', 'Family Dinner', 'Chicken, Salt, Pepper', '1. Preheat the oven to 350°F. 2. Season the chicken with salt and pepper. 3. Place the chicken in a baking dish. 4. Bake for 45 minutes or until cooked through.'),
    ('French Toast', 'https://example.com/french_toast.jpg', 20, 'Jane Doe', 'Sunday Brunch', 'Eggs, Milk, Bread, Salt', '1. In a bowl, whisk together eggs and milk. 2. Dip bread slices into the egg mixture. 3. Heat a skillet over medium heat and melt butter. 4. Cook the bread slices on the skillet until golden brown on each side.'),
    ('Holiday Beef Roast', 'https://example.com/beef_roast.jpg', 180, 'David Johnson', 'Holiday Celebration', 'Beef roast, Potatoes, Carrots, Onion, Garlic', '1. Preheat the oven to 325°F. 2. Season the beef roast with salt and pepper. 3. Place the beef roast in a roasting pan. 4. Add potatoes, carrots, onion, and garlic around the roast. 5. Roast in the oven for 2-3 hours or until the beef is cooked to your desired level of doneness.');

SELECT * FROM familyRecipe;

drop table familyrecipe;


ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'samira32167';

flush privileges;

drop table favoriterecipes;
drop table watchedrecipes;
-- drop table recipes;

select * from users;

select * from favoriterecipes