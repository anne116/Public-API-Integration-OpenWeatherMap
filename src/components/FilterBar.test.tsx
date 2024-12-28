import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from './FilterBar';

test('renders the temperature and humidity sliders', () => {
  const filters = { tempRange: [-20, 50], humidityRange: [0, 100] };
  render(<FilterBar filters={filters} onFilterChange={() => {}} />);

  const tempMinSlider = screen.getByLabelText('Temperature Range Min (°C)');
  const tempMaxSlider = screen.getByLabelText('Temperature Range Max (°C)');
  const humidityMinSlider = screen.getByLabelText('Humidity Range Min (%)');
  const humidityMaxSlider = screen.getByLabelText('Humidity Range Max (%)');

  expect(tempMinSlider).toBeInTheDocument();
  expect(tempMaxSlider).toBeInTheDocument();
  expect(humidityMinSlider).toBeInTheDocument();
  expect(humidityMaxSlider).toBeInTheDocument();
});

test('calls onFilterChange when sliders are adjusted', () => {
  const filters = { tempRange: [-20, 50], humidityRange: [0, 100] };
  const mockOnFilterChange = jest.fn();

  render(<FilterBar filters={filters} onFilterChange={mockOnFilterChange} />);

  const tempMinSlider = screen.getByLabelText('Temperature Range Min (°C)');
  const humidityMinSlider = screen.getByLabelText('Humidity Range Min (%)');

  fireEvent.change(tempMinSlider, { target: { value: 0 } });
  expect(mockOnFilterChange).toHaveBeenCalledWith('tempRange', [0, 50]);

  fireEvent.change(humidityMinSlider, { target: { value: 20 } });
  expect(mockOnFilterChange).toHaveBeenCalledWith('humidityRange', [20, 100]);
});
