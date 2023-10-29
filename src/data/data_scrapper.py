import requests
import json
import time
API_KEY = 'AIzaSyBG8-ZzBHlTA6e7WfcvUm1OZxXCNk7ErMU'

locations = {
    'Paris': ( 48.8566, 2.3522 ),
    'San Francisco': ( 37.7749, -122.4194 ),
    'Tokyo': ( 35.6895, 139.6917 ),
    'Rome': ( 41.9028, 12.4964 ),
    'Bali': ( -8.4095, 115.1889 ),
    'Greece': ( 39.0742, 21.8243 ),
    'New York': ( 40.7128, -74.0060 ),
    'Spain': ( 40.4637, -3.7492 )
}



def get_place_details(api_key, place_id):
    # Base URL for the Place Details request
    base_url = "https://maps.googleapis.com/maps/api/place/details/json"
    
    # Parameters for the API request
    params = {
        "place_id": place_id,
        "key": api_key
    }
    
    # Make the API request
    response = requests.get(base_url, params=params)
    
    # Convert the response to JSON
    place_details = response.json().get("result", {})
    
    # Extract the description or name if the description isn't available
    if 'editorial_summary' in place_details:
        return  place_details['editorial_summary']['overview']
    return 'No summary available for this place'



def get_places_nearby(api_key, lat, lang, place_type, radius, limit):
    base_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    print(limit)
    params = {
        "location": f"{lat},{lang}",
        "type": place_type,
        "radius": radius,
        "key": api_key
    }

    places = []
    while len(places) < limit:
        response = requests.get(base_url, params=params)
        results = response.json().get("results", [])
        places += results
        print(response.json()['status'])
        # Check if there's a "next_page_token" to fetch more results
        if "next_page_token" in response.json():
            print("here", response.json()["next_page_token"])
            time.sleep(2)
            params = {"pagetoken": response.json()["next_page_token"],"key": api_key}
        else:
            break
    print(len(places))
    return places

def extract_details(place, city, cat):
    name = place.get("name", "")
    latitude = place.get("geometry", {}).get("location", {}).get("lat", "")
    longitude = place.get("geometry", {}).get("location", {}).get("lng", "")
    price_point = place.get("price_level", -1)
    # Google Places API does not provide a direct "description", but user rating is available
    rating = place.get("rating", -1.0)
    photo_ref = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png'
    if 'photos' in place and len(place['photos'])>0:
        photo_ref = place['photos'][0]['photo_reference']


    return {
        "name": name,
        "latitude": latitude,
        "longitude": longitude,
        "price_point": price_point,
        "rating": rating,
        "city": city,
        "description":get_place_details(API_KEY,place.get('place_id')),
        "photo_url":f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference={photo_ref}&key=AIzaSyBG8-ZzBHlTA6e7WfcvUm1OZxXCNk7ErMU",
        "category": cat
    }

# Usage example:
# lat, lang = 40.7128, -74.0060  # Example coordinates for New York City

# places = get_places_nearby(API_KEY, lat, lang, place_type="restaurant", limit=20)
# details_list = [extract_details(place, "New York", "restaurant") for place in places]

# for details in details_list:
#     print(details)

data = []
for city in locations.keys():
    lat = locations[city][0]
    lang = locations[city][1]
    print(city,lat,lang)
    food_places = get_places_nearby(API_KEY, lat, lang, "restaurant", 400, 30)
    food_places_details = [extract_details(place, city, "restaurant") for place in food_places]

    attraction_places = get_places_nearby(API_KEY, lat, lang, "tourist_attraction", 400, 30)
    attraction_places_details = [extract_details(place, city, "tourist_attraction") for place in attraction_places]
    data += food_places_details
    data += attraction_places_details
    # data += attraction_places_details
# with open('starting_data.json', 'w') as file:
#     json.dump(data, file)

with open('final_data.jsonl', 'w') as jsonl_file:
    for entry in data:
        print(entry['city'])
        jsonl_file.write(json.dumps(entry) + '\n')




