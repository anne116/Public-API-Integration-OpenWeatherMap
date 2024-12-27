import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

interface SearchBarProps {
    onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [city, setCity] = useState('');

    const handleSearch = () => {
        // if (city.trim()) {
        onSearch(city); // passes the input to the parent component
        setCity('');
        // }
    };

    return (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
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
    );

};

export default SearchBar;
