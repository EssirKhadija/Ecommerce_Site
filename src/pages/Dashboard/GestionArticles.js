import React, { useState } from "react";

export default function GestionArticles({ articles, setArticles }) {
  const [editId, setEditId] = useState(null);
  const [nomA, setNomA] = useState("");
  const [pu, setPu] = useState("");
  const [desc, setDesc] = useState("");
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const startEdit = (a) => {
    setEditId(a.id);
    setNomA(a.nomA);
    setPu(a.pu);
    setDesc(a.desc || "");
    setPreview(a.image && a.image.startsWith("blob:") ? a.image : process.env.PUBLIC_URL + "/images/" + a.image);
    setImageFile(null);
  };

  const handleImageChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setImageFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const modifier = () => {
    if (!nomA || !pu) return alert("Nom et prix requis");
    const imageUrl = preview || "default-product.jpg";
    setArticles(articles.map(a => a.id === editId ? { ...a, nomA, pu: Number(pu), desc, image: imageFile ? preview : (a.image || imageUrl) } : a));
    // reset
    setEditId(null); setNomA(""); setPu(""); setDesc(""); setPreview(null); setImageFile(null);
  };

  const supprimer = (id) => {
    if (window.confirm("Supprimer l'article ?")) {
      setArticles(articles.filter(a => a.id !== id));
    }
  };

  return (
    <div>
      <h3>⚙️ Gestion des articles</h3>
      <div className="row g-3">
        {articles.map(a => (
          <div className="col-md-4" key={a.id}>
            <div className="card h-100 shadow-sm">
              <img src={a.image && a.image.startsWith("blob:") ? a.image : process.env.PUBLIC_URL + "/images/" + (a.image || "default-product.jpg")} alt={a.nomA} style={{height:150, objectFit:"cover"}} />
              <div className="card-body">
                <h5>{a.nomA}</h5>
                <p>{a.pu} DH</p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-warning btn-sm" onClick={() => startEdit(a)}>Modifier</button>
                  <button className="btn btn-danger btn-sm" onClick={() => supprimer(a.id)}>Supprimer</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editId && (
        <div className="card p-3 mt-4">
          <h5>Modifier l'article</h5>
          <div className="row g-2">
            <div className="col-md-4">
              <input className="form-control" value={nomA} onChange={(e)=>setNomA(e.target.value)} />
            </div>
            <div className="col-md-2">
              <input className="form-control" type="number" value={pu} onChange={(e)=>setPu(e.target.value)} />
            </div>
            <div className="col-md-4">
              <input className="form-control" type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="col-md-2">
              <button className="btn btn-warning w-100" onClick={modifier}>Enregistrer</button>
            </div>
          </div>
          {preview && <div className="mt-3"><h6>Aperçu</h6><img src={preview} alt="preview" style={{height:150, objectFit:"cover"}} /></div>}
        </div>
      )}
    </div>
  );
}
