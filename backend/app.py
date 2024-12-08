from flask import Flask, jsonify, request
from flask_cors import CORS
from arangodb_setup import get_db

app = Flask(__name__)
CORS(app)

db = get_db()
users_collection = db.collection('users')
movies_collection = db.collection('movies')

def get_user_profile(user_id):
    user_id = f"{float(user_id):.1f}"
    print(user_id)
    user_profile = users_collection.get(user_id)
    if not user_profile:
        return None
    return user_profile

def recommend_movies(user_id, top_n=10):
    user_profile = get_user_profile(user_id)
    if not user_profile:
        return []

    favorite_genres = set(user_profile.get('favorite_genres', []))
    favorite_directors = set(user_profile.get('frequently_rated_directors', []))
    favorite_actors = set(user_profile.get('frequently_rated_actors', []))

    movies_cursor = movies_collection.all()
    recommendations = []

    for movie in movies_cursor:
        score = 0

        # Genre matching
        movie_genres = set(movie.get('genres', []))
        score += len(favorite_genres & movie_genres) * 2

        # Director matching
        movie_directors = set(movie.get('directors', []))
        score += len(favorite_directors & movie_directors) * 3

        # Actor matching
        movie_actors = set(movie.get('actors', []))
        score += len(favorite_actors & movie_actors) * 1

        if score > 0:
            recommendations.append({
                "movieId": movie["_key"],
                "title": movie["title"],
                "genres": movie.get("genres", []),
                "directors": movie.get("director", []),
                "actors": movie.get("actors", []),
                "score": score
            })

    recommendations = sorted(recommendations, key=lambda x: x['score'], reverse=True)
    return recommendations[:top_n]

@app.route('/recommendations', methods=['GET'])
def get_recommendations():
    user_id = request.args.get('user_id')  # Extract `user_id` from the query parameters
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400
    user_id = request.args.get('user_id')
    recommendations = recommend_movies(user_id)
    return jsonify(recommendations)

@app.route('/movies', methods=['GET'])
def get_paginated_movies():
    try:
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 9))
        start_index = (page - 1) * limit
        end_index = start_index + limit

        movies_cursor = movies_collection.all()
        all_movies = list(movies_cursor)  # Convert cursor to list for slicing
        paginated_movies = all_movies[start_index:end_index]

        return jsonify({
            "movies": [
                {
                    "_key": movie["_key"],
                    "title": movie.get("title", "Unknown Title"),
                    "genres": movie.get("genres", []),
                    "directors": movie.get("director", []),
                    "actors": movie.get("actors", []),
                }
                for movie in paginated_movies
            ],
            "totalPages": (len(all_movies) + limit - 1) // limit,
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/recommendations/movie/<movie_id>', methods=['GET'])
def recommend_movies_based_on_movie(movie_id):
    try:
        # Fetch the selected movie
        selected_movie = movies_collection.get(movie_id)
        if not selected_movie:
            return jsonify({"error": "Movie not found"}), 404

        selected_genres = set(selected_movie.get("genres", []))
        selected_directors = set(selected_movie.get("directors", []))
        selected_actors = set(selected_movie.get("actors", []))

        # Fetch all movies
        movies_cursor = movies_collection.all()
        recommendations = []

        for movie in movies_cursor:
            if movie["_key"] == movie_id:
                continue  # Skip the selected movie itself

            score = 0

            # Genre matching
            movie_genres = set(movie.get("genres", []))
            score += len(selected_genres & movie_genres) * 2

            # Director matching
            movie_directors = set(movie.get("directors", []))
            score += len(selected_directors & movie_directors) * 3

            # Actor matching
            movie_actors = set(movie.get("actors", []))
            score += len(selected_actors & movie_actors) * 1

            if score > 0:
                recommendations.append({
                    "movieId": movie["_key"],
                    "title": movie["title"],
                    "genres": movie.get("genres", []),
                    "directors": movie.get("director", []),
                    "actors": movie.get("actors", []),
                    "score": score
                })

        # Sort by score in descending order
        recommendations = sorted(recommendations[0:10], key=lambda x: x['score'], reverse=True)

        return jsonify(recommendations), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
@app.route('/')
def hello_world():
    return "Hello World!"
# @app.after_request
# def after_request(response):
#   response.headers.add('Access-Control-Allow-Origin', '*')
#   response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
#   response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
#   return response

if __name__ == "__main__":
    app.run(debug=True, port=5001)
