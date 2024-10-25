import openai

openai.api_key = 'sk-SIB6JvcQqdGxB26-iZIpNEj-vlpohJTf-7gWkvpITGT3BlbkFJ5KTP3yIG6issc3p2Ueibg3EBIB01ZBkXahes6ZS20A'

try:
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt="Suggest some foods for a diabetic patient.",
        max_tokens=100
    )
    print(response.choices[0].text.strip())
except Exception as e:
    print(f"Error during API call: {e}")
