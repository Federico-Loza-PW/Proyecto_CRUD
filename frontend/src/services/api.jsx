import axios from 'axios';

const API_URL = 'http://localhost:3000';

const getToken = () => localStorage.getItem('token');

// 
export const getMarcas = () =>
  axios.get(`${API_URL}/api/marcas`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getModelos = (marcaId) =>
  axios.get(`${API_URL}/api/modelos/${marcaId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getProductos = (modeloId) =>
  axios.get(`${API_URL}/api/productos/${modeloId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

// 
export const login = (credentials) =>
  axios.post(`${API_URL}/auth/login`, credentials);

export const register = (data) =>
  axios.post(`${API_URL}/auth/register`, data);