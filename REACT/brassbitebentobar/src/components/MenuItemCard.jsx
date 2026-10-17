import React, { useState } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Input, FormGroup, Label, Badge } from 'reactstrap';

export default function MenuItemCard({ item, onAddToCart }) {
    const [quantity, setQuantity] = useState(1);

    const handleAdd = () => {
        onAddToCart(item, Number(quantity));
        setQuantity(1);
    };

    return (
        <Card className="h-100 bg-dark text-light border-warning shadow">
            {item.img && (
                <CardImg
                    top
                    src={`/images/${encodeURIComponent(item.img)}`}
                    alt={item.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                    className="border-bottom border-warning"
                />
            )}
            <CardBody className="d-flex flex-column justify-content-between">
                <div>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <CardTitle tag="h5" className="text-warning mb-0">
                            {item.name}
                        </CardTitle>
                        <Badge color="warning" className="text-dark">
                            {item.category}
                        </Badge>
                    </div>
                    <CardSubtitle tag="h6" className="text-warning mb-3 fw-bold fs-5">
                        ${item.price.toFixed(2)}
                    </CardSubtitle>
                    <CardText className="text-secondary">
                        {item.description}
                    </CardText>
                </div>

                <div className="mt-3 pt-3 border-top border-secondary">
                    <FormGroup className="d-flex align-items-center gap-2 mb-2">
                        <Label htmlFor={`qty-${item.id}`} className="mb-0 text-nowrap small">
                            Qty (1-5):
                        </Label>
                        <Input
                            id={`qty-${item.id}`}
                            type="number"
                            min="1"
                            max="5"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, Math.min(5, Number(e.target.value))))}
                            className="bg-dark text-light border-warning text-center"
                            style={{ width: '80px' }}
                        />
                    </FormGroup>
                    <Button color="warning" block className="text-dark fw-bold" onClick={handleAdd}>
                        <i className="fa-solid fa-cart-plus me-1"></i> Add to Cart
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
}