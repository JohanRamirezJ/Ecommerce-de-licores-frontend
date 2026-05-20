import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useForm } from '../hooks/useForm'; 
import '../inventario.css';
import { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } from '../services/productService';
import { mapImage } from '../utils/imageMapper';
import Breadcrumbs from '../components/Breadcrumbs';

const Inventory = () => {
    const { user } = useAuth();

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const data = await obtenerProductos();
            setProductos(Array.isArray(data) ? data : []);
            setSelectedProductId(null);
        } catch (error) {
            console.error("Error al cargar inventario:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const [formData, handleInputChange, resetForm, setFormValues] = useForm({
        nombre: '',
        descripcion: '',
        imagen: '',
        precio: ''
    });

    const handleOpenAddModal = () => {
        setEditingProduct(null);
        resetForm();
        setIsModalOpen(true);
    };

    const handleOpenEditModal = () => {
        if (!selectedProductId) {
            alert("Selecciona un producto para editar");
            return;
        }
        const productToEdit = productos.find(p => p.id === Number(selectedProductId));
        if (productToEdit) {
            setEditingProduct(productToEdit);
            setFormValues({
                nombre: productToEdit.nombre,
                descripcion: productToEdit.descripcion,
                imagen: productToEdit.imagen || '',
                precio: productToEdit.precio.toString()
            });
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => setIsModalOpen(false);

    const handleDeleteProduct = async () => {
        if (!selectedProductId) {
            alert("Selecciona un producto para eliminar");
            return;
        }
        if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
            try {
                await eliminarProducto(selectedProductId);
                loadProducts(); 
            } catch (error) {
                alert(error.message || "Error al eliminar producto");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataObj = new FormData();
        formDataObj.append('nombre', formData.nombre);
        formDataObj.append('descripcion', formData.descripcion);
        formDataObj.append('precio', formData.precio);
        if (formData.imagen) formDataObj.append('imagen', formData.imagen);

        try {
            if (editingProduct) {
                await actualizarProducto(editingProduct.id, formDataObj);
            } else {
                await crearProducto(formDataObj);
            }
            handleCloseModal();
            loadProducts(); 
        } catch (error) {
            alert(error.message || "Error al guardar el producto");
        }
    };

    const formatCOP = (n) =>
        new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n || 0);

    return (
        <main className="bee">
            <Breadcrumbs />
            <section className="container">
                <h1 className="titulo-categorias1">Gestión de Inventario</h1>
                <p className="titulo-categorias2">Administra el stock de tus licores premium.</p>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '30px' }}>
                    <button className="btn-add" onClick={handleOpenAddModal} style={{ background: '#27ae60' }}>
                        <i className="ri-add-line"></i> Nuevo
                    </button>
                    <button className="btn-edit" onClick={handleOpenEditModal}>
                        <i className="ri-edit-line"></i> Editar
                    </button>
                    <button className="btn-delete" onClick={handleDeleteProduct} style={{ background: '#e74c3c' }}>
                        <i className="ri-delete-bin-line"></i> Eliminar
                    </button>
                </div>

                <div className="table-container" style={{ 
                    background: 'var(--bg-card)', 
                    borderRadius: '16px', 
                    padding: '20px', 
                    border: '1px solid var(--glass-border)',
                    overflowX: 'auto'
                }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--primary)' }}>
                                <th style={{ padding: '12px', textAlign: 'center' }}>SEL</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>NOMBRE</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>DESCRIPCIÓN</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>PRECIO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map(p => (
                                <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>
                                        <input
                                            type="radio"
                                            name="selectedProduct"
                                            checked={selectedProductId === p.id.toString()}
                                            onChange={() => setSelectedProductId(p.id.toString())}
                                        />
                                    </td>
                                    <td style={{ padding: '12px', fontWeight: '700' }}>{p.nombre}</td>
                                    <td style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '13px' }}>{p.descripcion}</td>
                                    <td style={{ padding: '12px', fontWeight: '700', color: 'var(--primary)' }}>{formatCOP(p.precio)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {isModalOpen && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <div className="login-card">
                        <h2 style={{ color: 'var(--primary)', marginBottom: '25px', textAlign: 'center' }}>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Nombre</label>
                                <div className="form-input-container">
                                    <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Descripción</label>
                                <div className="form-input-container">
                                    <input type="text" name="descripcion" value={formData.descripcion} onChange={handleInputChange} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Precio (COP)</label>
                                <div className="form-input-container">
                                    <input type="number" name="precio" value={formData.precio} onChange={handleInputChange} required />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
                                <button type="button" onClick={handleCloseModal} className="enlace" style={{ flex: 1, background: '#444' }}>Cerrar</button>
                                <button type="submit" className="enlace" style={{ flex: 1 }}>Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Inventory;
