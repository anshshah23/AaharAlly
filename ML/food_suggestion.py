from flask import Flask, jsonify
import openai
import os

app = Flask(__name__)

# Set up OpenAI API key (replace with your actual OpenAI key)
openai.api_key = 'sk-SIB6JvcQqdGxB26-iZIpNEj-vlpohJTf-7gWkvpITGT3BlbkFJ5KTP3yIG6issc3p2Ueibg3EBIB01ZBkXahes6ZS20A'

# Function to ask GPT for suggestions of foods to eat and avoid for each disease
def get_food_suggestions(disease):
    try:
        # Construct the input prompt
        prompt = f"""
        For the disease {disease}, suggest which foods should be eaten to help manage the disease and which foods should be avoided.
        Provide the response in the following format:
        Foods to Eat: [list of foods]
        Foods to Avoid: [list of foods]
        """

        # Generate text with OpenAI GPT-3.5 model (or GPT-4 if available)
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=150,
            n=1,
            stop=None,
            temperature=0.7
        )

        # Extract the response text
        suggestions = response.choices[0].text.strip()
        return suggestions
    except Exception as e:
        print(f"Error generating suggestions: {e}")
        return None

# Function to analyze multiple diseases and get suggestions for each
def get_disease_suggestions():
    try:
        # List of diseases we want to analyze
        diseases = [
            "Diabetes", "Hypoglycemia", "Gastroparesis", "Pregnancy", 
            "IBS", "Peptic Ulcer", "Hyperthyroidism", "Chronic Kidney Disease", 
            "Cystic Fibrosis", "Adrenal Insufficiency", "Anorexia", "Liver Disease",
            "Metabolic Disorders", "Post-Surgical Recovery"
        ]

        food_suggestions = {}

        # Get food suggestions for each disease using GPT
        for disease in diseases:
            print(f"Getting suggestions for {disease}...")  # Log the current disease
            suggestions = get_food_suggestions(disease)
            if suggestions:
                food_suggestions[disease] = suggestions
            else:
                print(f"Failed to get suggestions for {disease}")

        return food_suggestions
    except Exception as e:
        print(f"Error generating disease suggestions: {e}")
        return None

# Flask route to fetch foods to eat/avoid based on diseases
@app.route('/api/food_suggestions', methods=['GET'])
def get_food_suggestions_api():
    try:
        # Get food suggestions for all diseases
        food_suggestions = get_disease_suggestions()

        if food_suggestions:
            return jsonify({'success': True, 'data': food_suggestions})
        else:
            return jsonify({'success': False, 'message': 'Error generating food suggestions'})
    except Exception as e:
        print(f"Error in API endpoint: {e}")  # Log the detailed error
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    # Run the Flask app in debug mode
    app.run(debug=True)
