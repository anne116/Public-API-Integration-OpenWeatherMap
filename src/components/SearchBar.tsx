import React, { useState } from 'react';
import { TextField, Button, Snackbar, Alert } from '@mui/material';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [error, setError] = useState(false);

  const handleSearch = () => {
    const sanitizedCity = city.trim().replace(/[^a-zA-Z0-9\s]/g, '');
    if (sanitizedCity) {
      onSearch(sanitizedCity);
      setCity('');
    } else {
      setError(true);
    }
    setCity('');
  };

  const handleCloseError = () => {
    setError(false);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <TextField
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: '100% ' }}
        >
          Please enter a valid city name.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SearchBar;
