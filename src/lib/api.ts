
import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-domain.com' 
  : 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions for books
export const booksApi = {
  getAll: () => api.get('/api/books'),
  getById: (id: string) => api.get(`/api/books/${id}`),
  create: (book: any) => api.post('/api/books', book),
};

// API functions for payments
export const paymentsApi = {
  createPayment: (paymentData: any) => api.post('/api/payment/create', paymentData),
};
