import { useEffect, useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductCard from '../components/ProductCard';
import Breadcrumbs from '../components/Breadcrumbs';
import Filters from '../components/Filters';
import SkeletonCard from '../components/SkeletonCard';
import { obtenerProductos } from '../services/productService';
import { mapImage } from '../utils/imageMapper';
import { useSearch } from '../context/SearchContext';
import '../productos.css';

const Products = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { searchQuery } = useSearch();
    const [filters, setFilters] = useState({ category: 'all', maxPrice: '', sortBy: 'name' });

    const fetchProducts = async () => {
        setError(null);
        setLoading(true);
        try {
            const data = await obtenerProductos();
            setProductos(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error loading products:", error);
            setError(error.message || "Error desconocido");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchProducts();
    }, []);

    const categories = useMemo(() => {
        const cats = new Set();
        productos.forEach(p => {
            if (p.categoria) cats.add(p.categoria);
        });
        return Array.from(cats);
    }, [productos]);

    const filteredProductos = useMemo(() => {
        let result = [...productos];

        // Search Filter
        if (searchQuery) {
            result = result.filter(p => 
                p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.descripcion && p.descripcion.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Category Filter
        if (filters.category !== 'all') {
            result = result.filter(p => p.categoria === filters.category);
        }

        // Price Filter
        if (filters.maxPrice) {
            result = result.filter(p => p.precio <= parseFloat(filters.maxPrice));
        }

        // Sorting
        if (filters.sortBy === 'name') {
            result.sort((a, b) => a.nombre.localeCompare(b.nombre));
        } else if (filters.sortBy === 'price-asc') {
            result.sort((a, b) => a.precio - b.precio);
        } else if (filters.sortBy === 'price-desc') {
            result.sort((a, b) => b.precio - a.precio);
        }

        return result;
    }, [productos, searchQuery, filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <>
            <Breadcrumbs />
            <section className="categorias">
                <div className="container">
                    <h1 className="titulo-categorias1">Nuestros Productos</h1>
                    <h3 className="titulo-categorias2">Explora nuestra selección premium de licores.</h3>

                    <Filters onFilterChange={handleFilterChange} categories={categories} />

                    {error ? (
                        <div style={{ textAlign: 'center', marginTop: '50px', color: '#fff' }}>
                            <p>Error al cargar los productos: {error}</p>
                            <button
                                onClick={fetchProducts}
                                className="btn-buy"
                                style={{ marginTop: '20px', padding: '12px 28px' }}
                            >
                                Reintentar
                            </button>
                        </div>
                    ) : loading ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                            gap: '30px',
                            paddingBottom: '50px'
                        }}>
                            {[...Array(6)].map((_, index) => (
                                <SkeletonCard key={index} />
                            ))}
                        </div>
                    ) : filteredProductos.length === 0 ? (
                        <div style={{ textAlign: 'center', marginTop: '50px', color: '#fff' }}>
                            {searchQuery ? `No se encontraron resultados para "${searchQuery}"` : "No hay productos que coincidan con los filtros."}
                        </div>
                    ) : (
                        <div style={{ position: 'relative', marginTop: '30px' }}>
                            <div className="product-grid" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                gap: '30px',
                                paddingBottom: '50px'
                            }}>
                                {filteredProductos.map((product, index) => (
                                    <ProductCard
                                        key={product.id || index}
                                        title={product.nombre}
                                        description={product.descripcion}
                                        price={product.precio}
                                        imgString={mapImage(product.imagen)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Products;
