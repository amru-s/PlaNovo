// API configuration for PlaNovo
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? process.env.NEXT_PUBLIC_API_URL || 'https://planovo-backend.onrender.com'
  : 'http://localhost:8000';

export const API_ENDPOINTS = {
  SRS_GENERATE: `${API_BASE_URL}/api/srs/generate`,
  HEALTH: `${API_BASE_URL}/health`,
  DB_TEST: `${API_BASE_URL}/db-test`,
} as const;

export { API_BASE_URL };