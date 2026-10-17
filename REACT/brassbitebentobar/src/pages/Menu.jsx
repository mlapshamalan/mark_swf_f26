import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import MenuFilter from '../components/MenuFilter';
import MenuItemCard from '../components/MenuItemCard';
import { menuItems } from '../data/menuData';
import bgMenu from '../assets/images/bg-menu.png';

export default function MenuPage({ addToCart }) {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredItems = selectedCategory === 'All'
        ? menuItems
        : menuItems.filter((item) => item.category === selectedCategory);

    return (
        <div
            className="flex-grow-1 d-flex flex-column"
            style={{
                background: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${bgMenu}) no-repeat center center fixed`,
                backgroundSize: 'cover'
            }}
        >
            <Container className="my-5 flex-grow-1">
                <header className="text-center mb-4">
                    <h1 className="display-4 page-heading fw-bold text-warning">Mechanical Bento Provisions</h1>
                    <p className="lead text-light">Pressurized flavors transmitted directly via subterranean copper pipeline.</p>
                </header>

                <MenuFilter
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />

                <Row className="g-4">
                    {filteredItems.map((item) => (
                        <Col key={item.id} sm={12} md={6} lg={4}>
                            <MenuItemCard item={item} onAddToCart={addToCart} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}