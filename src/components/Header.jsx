import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { useAuth } from '../context/AuthContext';

import logoImg from '../assets/images/logo.svg';

const Header = () => {
    const { cartCount, toggleCart } = useCart();
    const { searchQuery, setSearchQuery } = useSearch();
    const { user, logout } = useAuth();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        if (window.location.pathname !== '/productos') {
            navigate('/productos');
        }
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    return (
        <header>
            {/* Search Overlay */}
            <div className={`search-container ${isSearchOpen ? 'active' : ''}`}>
                <div className="search-inner">
                    <i className="ri-search-line search-icon"></i>
                    <input
                        type="text"
                        placeholder="¿Qué licor buscas hoy?"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search-input"
                        autoFocus={isSearchOpen}
                    />
                </div>
                <div className="search-close" onClick={toggleSearch}>
                    <i className="ri-close-line"></i>
                </div>
            </div>

            <div className="menu container">
                {/* Checkbox and Overlay for Side Menu */}
                <input type="checkbox" id="menu" style={{ display: 'none' }} />
                <label htmlFor="menu" className="menu-overlay"></label>

                <div className="header-left">
                    <label htmlFor="menu" className="menu-label">
                        <i className="ri-menu-line"></i>
                    </label>
                    <Link to="/" className="logo"><img src={logoImg} alt="Logo" /></Link>
                </div>

                <nav className="navbar">
                    <div className="navbar-header">
                        <img src={logoImg} alt="Logo" style={{ height: '30px' }} />
                        <label htmlFor="menu" className="menu-close">
                            <i className="ri-close-line"></i>
                        </label>
                    </div>
                    <ul>
                        <li> <Link to="/" onClick={() => document.getElementById('menu').checked = false}>Inicio</Link></li>
                        <li> <Link to="/productos" onClick={() => document.getElementById('menu').checked = false}>Productos</Link></li>
                        {(user && user.role && user.role.toLowerCase() === 'admin') ? (
                            <li> <Link to="/inventario" onClick={() => document.getElementById('menu').checked = false}>Inventario</Link></li>
                        ) : null}
                        {user ? (
                            <>
                                <li>
                                    <button className="enlace" onClick={() => {
                                        logout();
                                        navigate('/');
                                    }}>
                                        Cerrar sesión
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li> <Link to="/login" onClick={() => document.getElementById('menu').checked = false}>Iniciar Sesión</Link></li>
                        )}
                    </ul>
                </nav>

                <div className="header-actions">
                    <div className="search-icon-btn" onClick={toggleSearch}>
                        <i className="ri-search-line"></i>
                    </div>

                    <div className="cart-icon" onClick={toggleCart}>
                        <i className="ri-shopping-bag-line"></i>
                        {cartCount > 0 && <span className="cart-item-count">{cartCount}</span>}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
