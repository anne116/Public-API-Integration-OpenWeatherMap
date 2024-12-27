import React from 'react';
import { Box, Typography, Slider } from '@mui/material';

interface FilterBarProps {
    filters: {
        tempRange: number[];
        humidityRange: number[];
    };
    onFilterChange: ( name: string, value: number[] ) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
    return (
        <Box sx={{ marginBottom: 4 }}>
            <Typography variant="h6" gutterBottom>Filter Weather Data</Typography>
            <Box sx={{ marginBottom: 2}}>
                <Typography variant="subtitle1" gutterBottom>Temperature Range (°C)</Typography>
                <Slider
                    value={filters.tempRange}
                    onChange={(e, value) => onFilterChange('tempRange', value as number[])}
                    valueLabelDisplay="auto"
                    min={-20}
                    max={50}
                />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="subtitle1" gutterBottom>Humidity Range (%)</Typography>
                <Slider
                    value={filters.humidityRange}
                    onChange={(e, value) => onFilterChange('humidityRange', value as number[])}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100}
                />
            </Box>
        </Box>
    );
};

export default FilterBar;
