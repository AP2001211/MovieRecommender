import React, { useState } from "react";
import axios from "axios";
import { Container, Button, TextField, Grid, Card, CardContent, Typography } from "@mui/material";

function Recommendations() {
  const [userId, setUserId] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = () => {
    axios.get(`http://localhost:5001/recommendations?user_id=${userId}`)
      .then(response => {
        setRecommendations(response.data);
      })
      .catch(error => {
        console.error("Error fetching recommendations:", error);
      });
  };

  return (
    <Container>
      <Typography marginTop={6} variant="h4" gutterBottom>Movie Recommendations</Typography>
      <TextField
        label="User ID"
        variant="outlined"
        fullWidth
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={fetchRecommendations}>
        Get Recommendations
      </Button>
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        {recommendations.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.movieId}>
            <Card>
              <CardContent>
                <Typography variant="h6">{movie.title}</Typography>
                <Typography variant="body2">{movie.genres.join(", ")}</Typography>
                <Typography variant="body2">{movie.directors.join(", ")}</Typography>
                <Typography variant="body2">{movie.actors.join(", ")}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Recommendations;
