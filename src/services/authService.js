import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al iniciar sesión" };
  }
};

export const register = async (name, email, role, password) => {
  try {
    const response = await api.post('/api/auth/register', { name, email, role:"USER", password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al registrar usuario" };
  }
};