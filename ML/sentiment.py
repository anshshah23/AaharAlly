from flask import Flask, jsonify, request
from textblob import TextBlob
from googletrans import Translator

app = Flask(__name__)

# Initialize translator
translator = Translator()

# Function for sentiment analysis
def translate_and_analyze_sentiment(review):
    try:
        # Detect the language of the review
        detected_language = translator.detect(review).lang

        # Translate the review to English if it is not already in English
        if detected_language != 'en':
            translated_review = translator.translate(review, dest='en').text
        else:
            translated_review = review

        # Perform sentiment analysis on the translated text
        sentiment_polarity = TextBlob(translated_review).sentiment.polarity

        # Classify as Positive, Neutral, or Negative based on polarity value
        if sentiment_polarity > 0:
            return "Positive"
        elif sentiment_polarity == 0:
            return "Neutral"
        else:
            return "Negative"
    except Exception as e:
        # Handle errors in detection or translation
        return "Error in sentiment analysis"

# Flask route for sentiment analysis
@app.route('/api/sentiment', methods=['POST'])
def sentiment_analysis():
    try:
        # Get the review data from the POST request
        reviews = request.json.get('reviews')

        # If it's a single review, wrap it in a list
        if isinstance(reviews, str):
            reviews = [reviews]

        # Apply sentiment analysis to each review
        sentiment_results = [{'review': review, 'sentiment': translate_and_analyze_sentiment(review)} for review in reviews]

        return jsonify({'success': True, 'data': sentiment_results})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
