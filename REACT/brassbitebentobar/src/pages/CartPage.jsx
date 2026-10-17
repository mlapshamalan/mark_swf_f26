import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Container,
    Card,
    CardBody,
    Table,
    Button,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import bgMenu from '../assets/images/bg-menu.png';

export default function CartPage({ cart, updateQuantity, removeFromCart, clearCart }) {
    const navigate = useNavigate();

    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showThankYouModal, setShowThankYouModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const TAX_RATE = 0.0825; // 8.25% fixed rate

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    const handleConfirmCancel = () => {
        clearCart();
        setShowCancelModal(false);
        setModalMessage('Your order has been canceled. Returning to menu...');
        setShowThankYouModal(true);
    };

    const handleSubmitOrder = () => {
        clearCart();
        setModalMessage('Thank you for your order! Your bento dispatch request has been received.');
        setShowThankYouModal(true);
    };

    const handleCloseThankYou = () => {
        setShowThankYouModal(false);
        navigate('/menu');
    };

    return (
        <div
            className="flex-grow-1 d-flex flex-column"
            style={{
                background: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${bgMenu}) no-repeat center center fixed`,
                backgroundSize: 'cover'
            }}
        >
            <Container className="my-5 flex-grow-1">
                <Card className="bg-dark text-light border-warning shadow-lg mx-auto p-3" style={{ maxWidth: '900px' }}>
                    <CardBody>
                        <h1 className="text-warning mb-4 h2 page-heading">Pneumatic Order Manifest</h1>

                        {cart.length === 0 ? (
                            <div className="text-center py-5">
                                <h3 className="text-secondary mb-3">Your cart is empty.</h3>
                                <Link to="/menu" className="btn btn-warning fw-bold text-dark">
                                    Browse Provisions Menu
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Table responsive dark hover className="border-warning align-middle">
                                    <thead>
                                    <tr className="text-warning">
                                        <th>Item</th>
                                        <th>Price</th>
                                        <th style={{ width: '120px' }}>Quantity</th>
                                        <th>Total</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cart.map((item) => (
                                        <tr key={item.id}>
                                            <td className="fw-bold">{item.name}</td>
                                            <td>${item.price.toFixed(2)}</td>
                                            <td>
                                                <Input
                                                    type="number"
                                                    min="1"
                                                    max="5"
                                                    value={item.quantity}
                                                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                                                    className="bg-dark text-light border-warning text-center"
                                                />
                                            </td>
                                            <td className="text-warning fw-bold">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </td>
                                            <td>
                                                <Button
                                                    color="danger"
                                                    size="sm"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>

                                <div className="p-3 border border-warning rounded mb-4 bg-black">
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Subtotal:</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Tax (8.25%):</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <hr className="border-warning" />
                                    <div className="d-flex justify-content-between fs-4 text-warning fw-bold">
                                        <span>Total:</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <Button outline color="danger" onClick={() => setShowCancelModal(true)}>
                                        Cancel Order
                                    </Button>
                                    <Button color="warning" className="text-dark fw-bold px-4" onClick={handleSubmitOrder}>
                                        Submit Order
                                    </Button>
                                </div>
                            </>
                        )}
                    </CardBody>
                </Card>
            </Container>

            <Modal isOpen={showCancelModal} toggle={() => setShowCancelModal(false)} centered className="text-dark">
                <ModalHeader toggle={() => setShowCancelModal(false)}>Confirm Cancellation</ModalHeader>
                <ModalBody>
                    Are you sure you want to cancel your order? All selected items will be removed.
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setShowCancelModal(false)}>Back</Button>
                    <Button color="danger" onClick={handleConfirmCancel}>Confirm Cancel</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={showThankYouModal} toggle={handleCloseThankYou} centered className="text-dark">
                <ModalHeader toggle={handleCloseThankYou}>Dispatch Update</ModalHeader>
                <ModalBody>{modalMessage}</ModalBody>
                <ModalFooter>
                    <Button color="warning" onClick={handleCloseThankYou}>Continue to Menu</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}