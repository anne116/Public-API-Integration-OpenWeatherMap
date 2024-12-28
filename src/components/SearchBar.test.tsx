import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

test('renders the search input and button', () => {
    render(<SearchBar onSearch={() => {}} />);
    const inputElement = screen.getByPlaceholderText('Enter city name');
    const buttonElement = screen.getByRole('button', { name: 'Search'});

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
});

test('calls onSearch when the button is clicked', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText('Enter city name');
    const buttonElement = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(inputElement, { target: {value: 'New York' } });
    fireEvent.click(buttonElement);

    expect(mockOnSearch).toHaveBeenCalledWith('New York');
});
