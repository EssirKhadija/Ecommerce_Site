import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProductCard({ a, onAdd }) {
  const src = a.image.startsWith("blob:")
    ? a.image
    : process.env.PUBLIC_URL + "/images/" + (a.image || "default-product.jpg");

  return (
    <Card className="h-100 shadow-sm product-card">
      <Card.Img variant="top" src={src} style={{ height: 200, objectFit: "cover" }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{a.nomA}</Card.Title>
        <Card.Text className="text-muted" style={{ fontSize: "0.9rem" }}>
          {a.desc?.slice(0, 60)}...
        </Card.Text>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <strong style={{ fontSize: "1.1rem" }}>{a.pu} DH</strong>
          <div>
            <Button as={Link} to={`/product/${a.id}`} variant="primary" size="sm">Voir</Button>{" "}
            <Button variant="success" size="sm" onClick={() => onAdd(a)}>Ajouter</Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
