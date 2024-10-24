import os
import requests
from openai import OpenAI

# Set the API key (for testing purposes)
os.environ['OPENAI_API_KEY'] = 'sk-SIB6JvcQqdGxB26-iZIpNEj-vlpohJTf-7gWkvpITGT3BlbkFJ5KTP3yIG6issc3p2Ueibg3EBIB01ZBkXahes6ZS20A'
api_key = os.getenv('OPENAI_API_KEY')

client = OpenAI(api_key=api_key)

# Define the prompt
prompt = input("Enter your prompt : ")

# Generate the image
response = client.images.generate(
    model="dall-e-3",
    prompt=prompt,
    size="1024x1024",
    quality="standard",
    n=1,
)

# Get the image URL
image_url = response.data[0].url
print(f"Image URL: {image_url}")

# Download the image
image_response = requests.get(image_url)

# Create a safe filename from the prompt
filename = prompt.replace(" ", "_") + ".png"  

# Save the image
if image_response.status_code == 200:
    with open(filename, 'wb') as f:
        f.write(image_response.content)
    print(f"Image saved as: {filename}")
else:
    print("Failed to download image")
