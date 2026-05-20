import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
  return (
    <AuthProvider>
      <CartProvider>
        <SearchProvider>
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
          </Router>
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;