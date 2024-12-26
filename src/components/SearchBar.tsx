import React, { useState } from 'react';

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
        <div style={{ marginBottom: '20px' }}>
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{ padding: '10px', fontSize: '16px', width: '250px'}}
            />
            <button
                onClick={handleSearch}
                style={{ marginLeft: '10px', padding: '10px 15px', fontSize: '16px' }}
            >
                Search
            </button>
        </div>
    );

};

export default SearchBar;
