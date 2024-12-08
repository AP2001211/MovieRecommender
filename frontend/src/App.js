import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { CssBaseline, AppBar, Toolbar, Typography, Button } from "@mui/material";
import AllMovies from "./AllMovies";
import Recommendations from "./Recommendations";
import { ThemeProvider } from "@mui/material";
import darkTheme from "./theme.jsx";

function App() {
  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Movie Recommendation System
            </Typography>
            <Button color="inherit" component={Link} to="/">
              All Movies
            </Button>
            <Button color="inherit" component={Link} to="/recommendations">
              Recommendations
            </Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<AllMovies />} />
          <Route path="/recommendations" element={<Recommendations />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
