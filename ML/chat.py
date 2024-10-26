from flask import Flask, jsonify, request
import google.generativeai as gen_ai
import os

app = Flask(__name__)

# Load your Google API key for Gemini
gen_ai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Initialize predefined dietary recommendations
dietary_recommendations = {
    "Diabetes": {
        "Foods to Eat": ["Leafy greens", "Whole grains", "Lean protein", "Non-starchy vegetables"],
        "Foods to Avoid": ["Sugary drinks", "Processed carbs", "High-sugar fruits", "High-fat dairy"]
    },
    "Hypertension": {
        "Foods to Eat": ["Leafy greens", "Berries", "Potassium-rich foods", "Whole grains"],
        "Foods to Avoid": ["Salt", "Processed foods", "High-fat dairy", "Caffeine"]
    },
    "Hyperthyroidism": {
        "Foods to Eat": ["Cruciferous vegetables", "Calcium-rich foods", "Lean proteins"],
        "Foods to Avoid": ["Iodine-rich foods", "Caffeine", "Processed sugars", "High-fat foods"]
    },
    "Celiac Disease": {
        "Foods to Eat": ["Fruits", "Vegetables", "Lean proteins", "Gluten-free grains"],
        "Foods to Avoid": ["Wheat", "Barley", "Rye", "Processed foods with gluten"]
    },
    "Anemia": {
        "Foods to Eat": ["Leafy greens", "Red meat", "Legumes", "Iron-fortified cereals"],
        "Foods to Avoid": ["Tea", "Coffee", "Calcium-rich foods with meals"]
    },
    "Kidney Disease": {
        "Foods to Eat": ["Red bell peppers", "Cabbage", "Cauliflower", "Apples"],
        "Foods to Avoid": ["High-potassium foods", "Dairy products", "Processed meats", "Salty foods"]
    },
    "High Cholesterol": {
        "Foods to Eat": ["Oats", "Barley", "Fruits", "Nuts", "Fatty fish"],
        "Foods to Avoid": ["Trans fats", "Red meat", "Full-fat dairy", "Fried foods"]
    },
    "Heart Disease": {
        "Foods to Eat": ["Whole grains", "Berries", "Leafy greens", "Healthy fats (olive oil)"],
        "Foods to Avoid": ["Saturated fats", "Sugary beverages", "High-sodium foods", "Processed meats"]
    },
    "Gastritis": {
        "Foods to Eat": ["High-fiber foods", "Lean proteins", "Low-acid fruits"],
        "Foods to Avoid": ["Spicy foods", "Caffeine", "Alcohol", "Fried foods"]
    },
    "Obesity": {
        "Foods to Eat": ["Vegetables", "Lean proteins", "Whole grains", "Fruits"],
        "Foods to Avoid": ["Sugary snacks", "Processed foods", "High-calorie beverages", "Refined carbs"]
    }
}

# Helper function to generate a Gemini response for dietary suggestions
def get_gemini_response(user_input):
    for condition, recommendations in dietary_recommendations.items():
        if condition.lower() in user_input.lower():
            foods_to_eat = ", ".join(recommendations["Foods to Eat"])
            foods_to_avoid = ", ".join(recommendations["Foods to Avoid"])
            response_text = (f"For {condition}, here are some recommendations:\n\n"
                             f"**Foods to Eat:** {foods_to_eat}\n\n"
                             f"**Foods to Avoid:** {foods_to_avoid}")
            return response_text

    # Default message if no condition is matched
    return ("I'm sorry, I can only provide dietary recommendations for specific medical conditions. "
            "Please mention one of the following conditions: " + ", ".join(dietary_recommendations.keys()))

# Flask route to handle the chatbot endpoint
@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    user_input = request.json.get('message', '').strip()

    # Get a response based on dietary recommendations
    gemini_response = get_gemini_response(user_input)

    return jsonify({
        "success": True,
        "message": gemini_response
    })

if __name__ == '__main__':
    app.run(debug=True, port=5002)
