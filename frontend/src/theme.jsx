import { createTheme, ThemeProvider, CssBaseline, darkScrollbar } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#252330", // General background color
      paper: "#595165",   // Cards and other surfaces
    },
    text: {
      primary: "#F5F9F8", // General text
      secondary: "#A1A2AB", // Highlight text
    },
    primary: {
      main: "#575669", // Button highlights or other primary elements
    },
    secondary: {
      main: "#3B3A4A", // Secondary elements
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif", // Adjust to your preferred font
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#595165", // Card background
          color: "#A1A2AB",           // Card text color
          borderRadius: "12px",       // Add some rounding for aesthetics
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",      // Avoid uppercase for buttons
          borderRadius: "8px",
        },
      },
    },
  },
});

export default darkTheme;