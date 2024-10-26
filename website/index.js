const {
    GoogleGenerativeAI,
} = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyBxAvenefIszqqw9gatdb9_tfrJuVL6KWk");
async function call(disease) {
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
    });
    const prompt = `I have ${disease}. Suggest me only 20 best food items from this food item array: [\n  "Tofu Scramble",\n  "Vegan Burger",\n  "Falafel",\n  "Vegan Sushi",\n  "Vegan Pizza",\n  "Vegan Chili",\n  "Vegan Pasta",\n  "Vegan Salad",\n  "Vegan Smoothie",\n  "Vegan Ice Cream",\n  "Jackfruit Tacos",\n  "Vegan Curry",\n  "Vegan Ramen",\n  "Vegan Stir-Fry",\n  "Vegan Quesadillas",\n  "Vegan Nachos",\n  "Vegan Pancakes",\n  "Vegan Waffles",\n  "Vegan Shepherd's Pie",\n  "Vegan Lasagna",\n  "Chocolate Chip Cookies",\n  "Cheesecake",\n  "Brownie",\n  "Ice Cream Sundae",\n  "Apple Pie",\n  "Tiramisu",\n  "Fruit Tart",\n  "Crème brûlée",\n  "Pancakes",\n  "Waffles",\n  "Donut",\n  "Cupcake",\n  "Mousse",\n  "Flan",\n  "Pie",\n  "Pudding",\n  "Ice Cream",\n  "Sorbet",\n  "Cake",\n  "Macarons",\n  "Tacos",\n  "Hot Dogs",\n  "Pizza by the Slice",\n  "Falafel",\n  "Empanadas",\n  "Chicken and Waffles",\n  "Ice Cream",\n  "Fried Chicken",\n  "Sushi",\n  "Popcorn",\n  "Pretzels",\n  "Waffles",\n  "Grilled Cheese",\n  "Poutine",\n  "Spring Rolls",\n  "Arepas",\n  "Crepes",\n  "Shawarma",\n  "Chicken Skewers",\n  "Fruit Smoothies",\n  "Spicy Kimchi Fried Rice",\n  "Buffalo Wings",\n  "Spicy Sichuan Noodles",\n  "Jalapeño Popper Pizza",\n  "Spicy Tuna Roll",\n  "Jerk Chicken",\n  "Spicy Thai Curry",\n  "Nashville Hot Chicken Sandwich",\n  "Spicy Shrimp Tacos",\n  "Sriracha Mayo Fries",\n  "Sambal Fried Rice",\n  "Ghost Pepper Wings",\n  "Spicy Korean BBQ",\n  "Spicy Arrabiata Pasta",\n  "Spicy Beef & Broccoli",\n  "Chilli Con Carne",\n  "Spicy Tuna Poke Bowl",\n  "Spicy Chorizo Quesadilla",\n  "Spicy Shrimp Pad Thai",\n  "Spicy Black Bean Burgers",\n  "Mac and Cheese",\n  "Cheese Pizza",\n  "Grilled Cheese Sandwich",\n  "Cheese Quesadilla",\n  "Cheesy Fries",\n  "Cheese Fondue",\n  "Cheese Curds",\n  "Cheesy Bread",\n  "Cheese and Broccoli Soup",\n  "Cheesecake",\n  "Mozzarella Sticks",\n  "Cheesy Potatoes",\n  "Macaroni and Cheese Bites",\n  "Cheese Ravioli",\n  "Cheese Tortellini",\n  "Cheese Stuffed Peppers",\n  "Cheese Ball",\n  "Cheese and Sausage Pizza",\n  "Cheesy Chicken Alfredo",\n  "Nachos",\n  "Kung Pao Chicken",\n  "Mapo Tofu",\n  "Chow Mein",\n  "Egg Rolls",\n  "Sweet and Sour Pork",\n  "General Tso's Chicken",\n  "Fried Rice",\n  "Wonton Soup",\n  "Peking Duck",\n  "Dim Sum",\n  "Spring Rolls",\n  "Moo Shu Pork",\n  "Sesame Chicken",\n  "Beef and Broccoli",\n  "Dan Dan Noodles",\n  "Hot and Sour Soup",\n  "Szechuan Green Beans",\n  "Steamed Fish",\n  "Lo Mein",\n  "Pot Stickers",\n  "Butter Chicken",\n  "Chicken Tikka Masala",\n  "Saag Paneer",\n  "Aloo Gobi",\n  "Chana Masala",\n  "Vindaloo",\n  "Malai Kofta",\n  " Rogan Josh",\n  "Biryani",\n  "Palak Paneer",\n  "Tandoori Chicken",\n  "Daal Makhani",\n  "Kadai Paneer",\n  "Chicken Curry",\n  "Fish Curry",\n  "Lamb Curry",\n  "Matar Paneer",\n  "Baingan Bharta",\n  "Chicken Tikka",\n  "Vegetable Curry",\n  "Potato Chips",\n  "Popcorn",\n  "Trail Mix",\n  "Fruit Snacks",\n  "Pretzels",\n  "Chocolate Bar",\n  "Yogurt",\n  "Crackers",\n  "Fruit",\n  "Energy Bars",\n  "Rice Cakes",\n  "Beef Jerky",\n  "Cheese",\n  "Nuts",\n  "Hummus",\n  "Hard-Boiled Eggs",\n  "Frozen Yogurt",\n  "Smoothie",\n  "Granola Bars",\n  "Candy",\n  "Salmon",\n  "Tuna",\n  "Shrimp",\n  "Crab",\n  "Lobster",\n  "Scallops",\n  "Oysters",\n  "Mussels",\n  "Clams",\n  "Cod",\n  "Haddock",\n  "Halibut",\n  "Swordfish",\n  "Mahi-Mahi",\n  "Snapper",\n  "Grouper",\n  "Octopus",\n  "Squid",\n  "Clam Chowder",\n  "Sushi",\n  "Avocado",\n  "Salmon",\n  "Broccoli",\n  "Quinoa",\n  "Blueberries",\n  "Sweet Potatoes",\n  "Spinach",\n  "Chickpeas",\n  "Almonds",\n  "Brown Rice",\n  "Lentils",\n  "Edamame",\n  "Greek Yogurt",\n  "Apples",\n  "Eggs",\n  "Oats",\n  "Tomatoes",\n  "Kale",\n  "Bananas",\n  "Tofu\"\n]   which will be good for me also make sure to give me proper json containing list of items from this and not other things in output\n`
    try {
        const result = await model.generateContent(prompt);

        // Get the response text
        const responseText = result.response.text();

        // Use a regex to extract the JSON array from the response text
        const jsonMatch = responseText.match(/(\[.*?\])/s);
        if (jsonMatch && jsonMatch[1]) {
            // Parse the extracted JSON
            const jsonResponse = JSON.parse(jsonMatch[1]);

            // Log the proper JSON response
            console.log(JSON.stringify(jsonResponse, null, 2));
        } else {
            console.error('No valid JSON found in the response.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
call('diabetes')