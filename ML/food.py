from serpapi import GoogleSearch

params = {
  "engine": "google_food",
  "q": "Coffee",
  "location": "Austin, Texas, United States",
  "api_key": "554b1c31e58d4f5c62a3cbb9557c1c4ff3b49a6e0082ce0002f7891d56536c08"  
}

search = GoogleSearch(params)
results = search.get_dict()
local_results = results["local_results"]

print(local_results)
