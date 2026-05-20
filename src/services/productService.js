import api from './api';

export const obtenerProductos = async () => {
  try {
    const response = await api.get('/api/productos');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al obtener productos" };
  }
};

export const obtenerProductoPorId = async (id) => {
  try {
    const response = await api.get(`/api/productos/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al buscar producto" };
  }
};

export const crearProducto = async (formData) => {
  try {
    const response = await api.post('/api/productos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al crear producto" };
  }
};

export const actualizarProducto = async (id, formData) => {
  try {
    const response = await api.put(`/api/productos/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al actualizar producto" };
  }
};

export const eliminarProducto = async (id) => {
  try {
    const response = await api.delete(`/api/productos/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al eliminar producto" };
  }
};