import streamlit as st
import requests

# Set up the Unsplash API
UNSPLASH_ACCESS_KEY = 'zIMhcBZiRPBZERXrzTrg26kLgJ6JgWqa7ieneksEjmo'  

# Function to fetch images from Unsplash
def search_unsplash(query, num_images=10):
    url = "https://api.unsplash.com/search/photos"
    params = {
        "query": query,
        "client_id": UNSPLASH_ACCESS_KEY,
        "per_page": num_images
    }
    
    response = requests.get(url, params=params)
    data = response.json()
    
    return data['results'] if 'results' in data else []

# Streamlit app layout
st.title("Unsplash Image Search")
st.write("Search for images using the Unsplash API.")

# Input for image search query
search_query = st.text_input("Enter a search term:", "")

# Number of images to display
num_images = st.slider("Number of images to display", 1, 20, 5)

# If search term is provided, search and display images
if search_query:
    st.write(f"Showing results for: {search_query}")
    images = search_unsplash(search_query, num_images)
    
    if images:
        for image in images:
            st.image(image['urls']['regular'], caption=f"Photo by {image['user']['name']} on Unsplash")
    else:
        st.write("No results found.")
