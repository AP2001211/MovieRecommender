import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Pagination,
  Collapse,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function AllMovies() {
  const [movies, setMovies] = useState([]);
  const [recommendations, setRecommendations] = useState({});
  const [expanded, setExpanded] = useState(null); // Track expanded card
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const moviesPerPage = 9; // Number of movies per page

  // Fetch paginated movies
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5001/movies?page=${currentPage}&limit=${moviesPerPage}`)
      .then((response) => {
        setMovies(response.data.movies); // Assuming backend sends paginated movies in `movies`
        setTotalPages(response.data.totalPages); // Assuming backend sends total pages
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [currentPage]);

  // Fetch recommendations for a movie
  const fetchMovieRecommendations = (movieId) => {
    if (!recommendations[movieId]) {
      // Fetch only if not already fetched
      axios
        .get(`http://127.0.0.1:5001/recommendations/movie/${movieId}`)
        .then((response) => {
          setRecommendations((prev) => ({ ...prev, [movieId]: response.data }));
        })
        .catch((error) => {
          console.error("Error fetching recommendations:", error);
        });
    }
  };

  // Handle expand/collapse
  const handleExpandClick = (movieId) => {
    const isExpanded = expanded === movieId ? null : movieId; // Toggle expand state
    setExpanded(isExpanded);
    if (isExpanded) fetchMovieRecommendations(movieId); // Fetch recommendations on expand
  };

  return (
    <Container>
      <Typography marginTop={8} variant="h4" gutterBottom>
        All Movies
      </Typography>

      {/* Display Movies */}
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <React.Fragment key={movie._key}>
            <Grid item xs={12} md={expanded === movie._key ? 12 : 4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{movie.title}</Typography>
                  <Typography variant="body2">Genres: {movie.genres.join(", ")}</Typography>
                  <Typography variant="body2">Directors: {movie.directors.join(", ")}</Typography>
                  <IconButton
                    onClick={() => handleExpandClick(movie._key)}
                    aria-expanded={expanded === movie._key}
                    aria-label="show recommendations"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardContent>

                {/* Collapse for Recommendations */}
                <Collapse in={expanded === movie._key} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Recommendations:
                    </Typography>
                    <Grid container spacing={2}>
                      {recommendations[movie._key] ? (
                        recommendations[movie._key].map((recMovie, index) => (
                          <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                              <CardContent>
                                <Typography variant="body1">{recMovie.title}</Typography>
                                <Typography variant="body2">
                                  Genres: {recMovie.genres.join(", ")}
                                </Typography>
                                <Typography variant="body2">
                                  Directors: {recMovie.directors.join(", ")}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))
                      ) : (
                        <Typography variant="body2">Loading...</Typography>
                      )}
                    </Grid>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>

      {/* Pagination */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      />
    </Container>
  );
}

export default AllMovies;
