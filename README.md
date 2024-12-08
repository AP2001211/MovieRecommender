
# Movie Recommendation System using ArangoDB

This project is a feature-based movie recommendation system that utilizes ArangoDB's multi-model capabilities. By combining user preferences from the MovieLens dataset with enriched metadata from the TMDb API, it provides personalized movie recommendations based on genres, directors, and actors.

## Features

- **Multi-Model Database**: Combines graph and document data models for efficient querying.  
- **Feature-Based Recommendations**: Recommends movies based on shared attributes like genre, directors, and actors.  
- **Dataset Integration**: Merges user preferences from the MovieLens dataset with enriched metadata from the TMDb API.  
- **Graph-Based Relationships**: Uses ArangoDB’s graph capabilities to link movies, genres, directors, and actors.

## Tools and Technologies

- **ArangoDB Community Edition**: Multi-model database supporting graph and document data models.  
- **MovieLens Dataset**: Provides data on user-genre interactions.  
- **TMDb API**: Fetches movie metadata, including information about directors, actors, and more.  
- **Docker**: Simplifies the setup and deployment of ArangoDB.

## Usage

1. Clone the repository:  
   ```bash
   git clone https://github.com/AP302001/movie-recommendation-arangodb.git
   ```

2. Set up ArangoDB (using Docker):
   ```bash
   docker-compose up
   ```

3. Load the MovieLens dataset into ArangoDB. (Refer to the **data-loading** section below)

4. Use the TMDb API to fetch additional metadata (e.g., directors, actors) for movie enrichment.

5. Query the database to get movie recommendations based on genres, directors, and actors.

## Data Loading

- Load the **MovieLens** dataset into ArangoDB using the provided scripts.
- Use the **TMDb API** to enrich the dataset with additional metadata, linking movies to directors, actors, and genres.

## Contributing

Feel free to fork, clone, or contribute to this project! Pull requests are welcome.

## License

This project is licensed under the MIT License.

