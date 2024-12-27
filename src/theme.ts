import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' }, // Blue for buttons, sliders, etc.
    secondary: { main: '#ff4081' }, // Pink for highlights.
    background: {
      default: '#f5f5f5', // Light background for the app.
      paper: '#ffffff',   // Background for cards and containers.
    },
    text: {
      primary: '#333333', // Dark text.
      secondary: '#555555', // Softer text.
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h3: { fontWeight: 700, fontSize: '2.4rem' }, // Heading for your app title.
    h5: { fontWeight: 600 }, // Subheading.
    body1: { lineHeight: 1.6 }, // Normal text.
    subtitle1: { fontWeight: 500 }, // Filter labels.
  },
  shape: {
    borderRadius: 8, // Apply soft rounded corners.
  },
});

export default theme;
