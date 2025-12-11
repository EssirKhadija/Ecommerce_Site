import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProductCard({ a, onAdd }) {
  const src = a.image.startsWith("blob:") ? a.image : process.env.PUBLIC_URL + "/images/" + (a.image || "default-product.jpg");

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={src} style={{ height: 180, objectFit: "cover" }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{a.nomA}</Card.Title>
        <Card.Text className="flex-grow-1">{a.desc || ""}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <strong>{a.pu} DH</strong>
          <div>
            <Button variant="primary" size="sm" as={Link} to={`/product/${a.id}`}>Voir</Button>{" "}
            <Button variant="success" size="sm" onClick={() => onAdd(a)}>Ajouter</Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
