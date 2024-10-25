from flask import Flask, jsonify, request
import pandas as pd
import numpy as np

app = Flask(__name__)

def process_data():
    df = pd.read_csv("MOCK_DATA-_4_.csv")

    bins = [0, 20, 25, 35, 45, 60, 100] 
    labels = ['<20', '20-25', '25-35', '35-45', '45-60', '60+']
    df['age_group'] = pd.cut(df['age'], bins=bins, labels=labels, right=False)

    age_food_group_counts = df.groupby(['age_group', 'meal_category']).size().unstack(fill_value=0)

    most_ordered_per_age_group = age_food_group_counts.idxmax(axis=1)
    most_ordered_counts = age_food_group_counts.max(axis=1)

    result = pd.DataFrame({
        'food_category': most_ordered_per_age_group,
        'Number of People': most_ordered_counts
    })
    
    result['Age Range'] = ' (' + result.index.astype(str) + ')'
    
    return result.to_dict(orient='records')

# API route to process and get the results
@app.route('/api/get_data', methods=['GET'])
def get_data():
    try:
        data = process_data()
        return jsonify({'success': True, 'data': data})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
