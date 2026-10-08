import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Menu from './Menu.jsx';
import Reservations from './Reservations.jsx';
import About from './About.jsx';

// Simple Home page component
function Home() {
  return (
      <div style={{ padding: '20px' }}>
        <h1>Home Page</h1>
        <p>Welcome to the FourPagesLinked application!</p>
      </div>
  );
}

export default function App() {
  return (
      <div>
        {/* Navigation Bar for all 4 pages */}
        <nav style={{ padding: '15px', backgroundColor: '#f0f0f0', display: 'flex', gap: '20px' }}>
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/reservations">Reservations</Link>
          <Link to="/about">About</Link>
        </nav>

        {/* Page Content Routes */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
  );
}