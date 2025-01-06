import { AxiosError } from 'axios';

export const getErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError) {
        switch (error.response?.status) {
            case 404:
                return 'City not found. Please try another city.';
            case 429:
                return 'API quota exceeded. Please try again later.';
            default:
                return 'An unexpected error occurred. Please try again.';
        }
    }
    return 'An unknown error occured. Please try again.';
}