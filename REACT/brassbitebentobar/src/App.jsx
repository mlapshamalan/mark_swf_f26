import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';
import Hiring from './pages/Hiring';
import NotFound from './pages/NotFound';
import './App.css';

export default function App() {
    return (
        <Router>
            <div className="d-flex flex-column min-vh-100 bg-dark">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/reservations" element={<Reservations />} />
                    <Route path="/hiring" element={<Hiring />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}