import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getMarcas = () => axios.get(`${API_URL}/marcas`);
export const getModelos = (marcaId) => axios.get(`${API_URL}/modelos/${marcaId}`);
export const getProductos = (modeloId) => axios.get(`${API_URL}/productos/${modeloId}`);
export const login = (credentials) => axios.post(`${API_URL}/auth/login`, credentials);
export const register = (data) => axios.post(`${API_URL}/auth/register`, data);