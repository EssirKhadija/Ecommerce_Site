import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function ProductPage({ articles, addToCart }) {
  const { id } = useParams();
  const prod = articles.find(a => String(a.id) === id);
  const [qty, setQty] = useState(1);

  if (!prod) return <div className="alert alert-warning">Produit non trouvé</div>;

  const src = prod.image.startsWith("blob:") ? prod.image : process.env.PUBLIC_URL + "/images/" + (prod.image || "default-product.jpg");

  return (
    <div className="row g-4">
      <div className="col-md-5">
        <img src={src} alt={prod.nomA} style={{ width: "100%", objectFit: "cover", maxHeight: 400 }} />
      </div>
      <div className="col-md-7">
        <h2>{prod.nomA}</h2>
        <p>{prod.desc}</p>
        <h4>{prod.pu} DH</h4>

        <div className="d-flex align-items-center gap-2 mb-3">
          <label>Quantité</label>
          <input type="number" min="1" value={qty} onChange={(e)=>setQty(Number(e.target.value)||1)} className="form-control w-auto"/>
        </div>

        <Button onClick={() => addToCart(prod, qty)} variant="success">Ajouter au panier</Button>
      </div>
    </div>
  );
}
