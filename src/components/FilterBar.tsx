import React from 'react';

interface FilterBarProps {
    filters: {
        minTemp: string;
        maxTemp: string;
        minHumidity: string;
        maxHumidity: string
    };
    onFilterChange: (
        name: string,
        value: string
    ) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
    return (
        <div>
            <h3>Filter Weather Data</h3>
            <label>
                Min Temperature:
                <input
                    type="number"
                    value={filters.minTemp}
                    onChange={(e) => onFilterChange('minTemp', e.target.value)}
                />
            </label>
            <label>
                Max Temperature:
                <input
                    type="number"
                    value={filters.maxTemp}
                    onChange={(e) => onFilterChange('maxTemp', e.target.value)}
                />
            </label>
            <label>
                Mix Humidity:
                <input
                    type="number"
                    value={filters.minHumidity}
                    onChange={(e) => onFilterChange('minHumidity', e.target.value)}
                />
            </label>
            <label>
                Max Humidity:
                <input
                    type="number"
                    value={filters.maxHumidity}
                    onChange={(e) => onFilterChange('maxHumidity', e.target.value)}
                />
            </label>
        </div>
    );
};

export default FilterBar;
