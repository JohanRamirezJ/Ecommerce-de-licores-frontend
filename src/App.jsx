import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Inventory from './pages/Inventory';

import { SearchProvider } from './context/SearchContext';

function App() {
  const [isWireframe, setIsWireframe] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <SearchProvider>
          <div className={isWireframe ? 'wireframe-active' : ''}>
            <Router>
              <Header />
              <Cart />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/productos" element={<Products />} />
                  <Route path="/login" element={<Login />} />

                  <Route path="/pago" element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  } />

                  <Route path="/inventario" element={
                    <ProtectedRoute>
                      <Inventory />
                    </ProtectedRoute>
                  } />

                </Routes>
              </main>
              <Footer />

              {/* Botón Flotante Interactivo: Modo Wireframe */}
              <button
                id="wireframe-toggle-btn"
                onClick={() => setIsWireframe(!isWireframe)}
                style={{
                  position: 'fixed',
                  bottom: '25px',
                  right: '25px',
                  zIndex: 99999,
                  backgroundColor: isWireframe ? '#222222' : '#edb312',
                  color: isWireframe ? '#ffffff' : '#0a0a0a',
                  border: isWireframe ? '2px solid #555555' : 'none',
                  borderRadius: '50px',
                  padding: '12px 24px',
                  fontWeight: '800',
                  fontSize: '12px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontFamily: '"Outfit", sans-serif'
                }}
              >
                <i className={isWireframe ? 'ri-eye-line' : 'ri-layout-line'} style={{ fontSize: '16px' }}></i>
                <span>{isWireframe ? 'Ver Diseño Real' : 'Modo Wireframe'}</span>
              </button>
            </Router>
          </div>
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;