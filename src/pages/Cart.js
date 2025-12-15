import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Cart({ cart, updateCartQty, clearCart }) {
  const total = cart.reduce((s, p) => s + p.pu * p.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="card p-4 shadow-sm">
        <h3>Votre panier est vide</h3>
        <p><Link to="/">Retour au catalogue</Link></p>
      </div>
    );
  }

  return (
    <div className="card p-4 shadow-sm">
      <h3>Panier</h3>
      <Table responsive>
        <thead>
          <tr>
            <th>Produit</th><th>Prix</th><th>Quantité</th><th>Sous-total</th><th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map(p => (
            <tr key={p.id}>
              <td>{p.nomA}</td>
              <td>{p.pu} DH</td>
              <td>
                <input type="number" className="form-control w-auto" min="1" value={p.qty} onChange={(e)=>updateCartQty(p.id, Number(e.target.value)||1)} />
              </td>
              <td>{p.pu * p.qty} DH</td>
              <td>
                <Button variant="danger" size="sm" onClick={()=>updateCartQty(p.id, 0)}>Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center">
        <strong>Total : {total} DH</strong>
        <div>
          <Button variant="secondary" className="me-2" onClick={clearCart}>Vider</Button>
          <Button variant="primary" onClick={() => alert("Simulation paiement — merci pour votre commande !")}>Passer la commande</Button>
        </div>
      </div>
    </div>
  );
}
