import axios from 'axios';


export const getMarcas = () => axios.get(`${API_URL}/marcas`);
export const getModelos = (marcaId) => axios.get(`${API_URL}/modelos/${marcaId}`);
export const getProductos = (modeloId) => axios.get(`${API_URL}/productos/${modeloId}`);
export const login = (credentials) => axios.post('http://localhost:3000/auth/login', credentials);
export const register = (data) => axios.post('http://localhost:3000/auth/register', data);