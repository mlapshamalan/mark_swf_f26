import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SiteNavbar from './components/SiteNavbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';
import CartPage from './pages/CartPage';
import Hiring from './pages/Hiring';
import NotFound from './pages/NotFound';
import './App.css';

export default function App() {
    const [cart, setCart] = useState([]);

    const addToCart = (item, quantity) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: Math.min(5, cartItem.quantity + quantity) }
                        : cartItem
                );
            }
            return [...prevCart, { ...item, quantity: Math.min(5, quantity) }];
        });
    };

    const updateQuantity = (id, quantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: Math.min(5, Math.max(1, quantity)) } : item
            )
        );
    };

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const clearCart = () => setCart([]);

    return (
        <Router>
            <div className="d-flex flex-column min-vh-100 bg-dark text-light">
                <SiteNavbar cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/menu" element={<Menu addToCart={addToCart} />} />
                    <Route path="/reservations" element={<Reservations />} />
                    <Route
                        path="/cart"
                        element={
                            <CartPage
                                cart={cart}
                                updateQuantity={updateQuantity}
                                removeFromCart={removeFromCart}
                                clearCart={clearCart}
                            />
                        }
                    />
                    <Route path="/hiring" element={<Hiring />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}