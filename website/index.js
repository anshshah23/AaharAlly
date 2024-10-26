const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyD2-jJbabe3yJ_jaY0LFsWBGo3AdpsqWEE");

async function fetchIngredients(item) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
    const prompt = `List the ingredients for ${item} as a JSON array.`;

    // Pass the prompt directly as a string to generateContent
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    console.log("Response from model:", responseText); // Inspect the raw response

    // Attempt to find JSON array of ingredients in the response
    const jsonMatch = responseText.match(/\[(.*?)\]/s);
    if (jsonMatch) {
      const ingredients = JSON.parse(jsonMatch[0]);
      console.log("Ingredients:", ingredients);
    } else {
      console.warn("No JSON array found in response");
    }
  } catch (error) {
    console.error("Error fetching ingredients:", error);
  }
}

fetchIngredients("apple pie");
