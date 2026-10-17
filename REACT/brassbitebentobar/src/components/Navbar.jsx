import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <header className="navbar-header">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top border-bottom border-warning">
                <div className="container-fluid max-nav-width">
                    <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
                        <img src="/images/Brass&BiteBentoBarLogo.png" alt="Logo" className="nav-logo" style={{ height: '40px' }} onError={(e) => e.target.style.display = 'none'} />
                        <span className="brand-title text-warning">Brass & Bite</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="mainNavbar">
                        <ul className="navbar-nav gap-lg-2">
                            <li className="nav-item">
                                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                                    <i className="fa-solid fa-house me-1"></i> Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                                    <i className="fa-solid fa-book-open me-1"></i> About
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/menu" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                                    <i className="fa-solid fa-utensils me-1"></i> Menu
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/reservations" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                                    <i className="fa-solid fa-calendar-check me-1"></i> Reservations
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/hiring" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                                    <i className="fa-solid fa-user-plus me-1"></i> Hiring
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}