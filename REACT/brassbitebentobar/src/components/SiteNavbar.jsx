import React, { useState } from 'react';
import { NavLink as RRNavLink, Link } from 'react-router-dom';
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    Badge
} from 'reactstrap';

export default function SiteNavbar({ cartCount }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <header className="navbar-header">
            <Navbar color="dark" dark expand="lg" sticky="top" className="border-bottom border-warning">
                <div className="container-fluid max-nav-width">
                    <NavbarBrand tag={Link} to="/" className="d-flex align-items-center gap-2">
                        <img
                            src="/images/Brass&BiteBentoBarLogo.png"
                            alt="Logo"
                            style={{ height: '40px' }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <span className="brand-title text-warning">Brass &amp; Bite</span>
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar className="justify-content-end">
                        <Nav navbar className="gap-lg-2">
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/">
                                    <i className="fa-solid fa-house me-1"></i> Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/about">
                                    <i className="fa-solid fa-book-open me-1"></i> About
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/menu">
                                    <i className="fa-solid fa-utensils me-1"></i> Menu
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/reservations">
                                    <i className="fa-solid fa-calendar-check me-1"></i> Reservations
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/cart">
                                    <i className="fa-solid fa-cart-shopping me-1"></i> Cart
                                    {cartCount > 0 && (
                                        <Badge color="warning" pill className="text-dark ms-1">
                                            {cartCount}
                                        </Badge>
                                    )}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/hiring">
                                    <i className="fa-solid fa-user-plus me-1"></i> Hiring
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        </header>
    );
}