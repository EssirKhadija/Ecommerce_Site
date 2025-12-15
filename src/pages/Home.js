import React, { useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Home({ articles, addToCart }) {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("none");

  const filtered = [...articles]
    .filter(a => a.nomA.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (order === "asc") return a.pu - b.pu;
      if (order === "desc") return b.pu - a.pu;
      return 0;
    });

  return (
    <>
      <div className="filter-box">
        <div className="row g-3">
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Rechercher un produit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <select
              className="form-select"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="none">Trier par</option>
              <option value="asc">Prix : du moins cher</option>
              <option value="desc">Prix : du plus cher</option>
            </select>
          </div>
        </div>
      </div>

      <div className="catalog-grid">
        {filtered.map((a) => (
          <ProductCard key={a.id} a={a} onAdd={addToCart} />
        ))}
      </div>
    </>
  );
}
