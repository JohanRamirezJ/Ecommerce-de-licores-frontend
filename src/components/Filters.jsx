import { useState } from 'react';

const Filters = ({ onFilterChange, categories }) => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortBy, setSortBy] = useState('name');

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedCategory(value);
        onFilterChange({ category: value, maxPrice, sortBy });
    };

    const handlePriceChange = (e) => {
        const value = e.target.value;
        setMaxPrice(value);
        onFilterChange({ category: selectedCategory, maxPrice: value, sortBy });
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortBy(value);
        onFilterChange({ category: selectedCategory, maxPrice, sortBy: value });
    };

    return (
        <div className="filters-container container">
            <div className="filter-group">
                <label>Categoría</label>
                <select className="filter-select" value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="all">Todas las categorías</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>Precio Máximo</label>
                <input 
                    type="number" 
                    className="filter-input" 
                    placeholder="Ej. 50000" 
                    value={maxPrice} 
                    onChange={handlePriceChange}
                />
            </div>

            <div className="filter-group">
                <label>Ordenar por</label>
                <select className="filter-select" value={sortBy} onChange={handleSortChange}>
                    <option value="name">Nombre</option>
                    <option value="price-asc">Precio: Menor a Mayor</option>
                    <option value="price-desc">Precio: Mayor a Menor</option>
                </select>
            </div>
        </div>
    );
};

export default Filters;
