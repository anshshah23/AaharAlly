from flask import Flask, jsonify, request
from textblob import TextBlob

app = Flask(__name__)

# Function for sentiment analysis on English reviews
def analyze_sentiment(review):
    try:
        # Perform sentiment analysis using TextBlob
        sentiment_polarity = TextBlob(review).sentiment.polarity

        # Classify as Positive, Neutral, or Negative based on polarity value
        if sentiment_polarity > 0:
            return "Positive"
        elif sentiment_polarity == 0:
            return "Neutral"
        else:
            return "Negative"
    except Exception as e:
        print(f"Error during sentiment analysis: {e}")
        return "Error in sentiment analysis"

# Function to compute the average sentiment based on individual review results
def calculate_average_sentiment(sentiments):
    positive_count = sentiments.count("Positive")
    neutral_count = sentiments.count("Neutral")
    negative_count = sentiments.count("Negative")

    total = len(sentiments)
    sentiment_distribution = {
        "Positive": round((positive_count / total) * 100, 2),
        "Neutral": round((neutral_count / total) * 100, 2),
        "Negative": round((negative_count / total) * 100, 2)
    }
    
    # Find the sentiment with the highest average proportion
    final_sentiment = max(sentiment_distribution, key=sentiment_distribution.get)
    return final_sentiment, sentiment_distribution

# Flask route for sentiment analysis from POST request
@app.route('/api/sentiment', methods=['POST'])
def sentiment_analysis():
    try:
        # Get the list of reviews from the POST request
        reviews = request.json.get('reviews', [])
        
        if not reviews:
            return jsonify({'success': False, 'message': 'No reviews provided'})

        # Perform sentiment analysis on each review
        sentiments = [analyze_sentiment(review) for review in reviews]
        
        # Calculate the overall average sentiment
        final_sentiment, sentiment_distribution = calculate_average_sentiment(sentiments)
        
        # Return the results as JSON
        return jsonify({
            'success': True,
            'average_sentiment': final_sentiment,
            'sentiment_distribution': sentiment_distribution
        })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    # Run the Flask app in debug mode
    app.run(debug=True)
