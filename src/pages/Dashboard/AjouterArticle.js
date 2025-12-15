import React, { useState } from "react";

export default function AjouterArticle({ articles, setArticles }) {
  const [nomA, setNomA] = useState("");
  const [pu, setPu] = useState("");
  const [desc, setDesc] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setImageFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const ajouter = (e) => {
    e.preventDefault();
    if (!nomA || !pu) return alert("Nom et prix requis");
    const imageUrl = preview || "default-product.jpg";
    const newArt = { id: Date.now(), nomA, pu: Number(pu), image: imageUrl, desc };
    setArticles([...articles, newArt]);
    // reset
    setNomA(""); setPu(""); setDesc(""); setImageFile(null); setPreview(null);
  };

  return (
    <div className="card p-4 shadow-sm">
      <h5>➕ Ajouter un article</h5>
      <form onSubmit={ajouter}>
        <div className="mb-2">
          <input className="form-control" value={nomA} onChange={(e)=>setNomA(e.target.value)} placeholder="Nom" />
        </div>
        <div className="mb-2">
          <input className="form-control" value={pu} onChange={(e)=>setPu(e.target.value)} placeholder="Prix" type="number" />
        </div>
        <div className="mb-2">
          <textarea className="form-control" value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="Description" />
        </div>
        <div className="mb-2">
          <input className="form-control" type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        {preview && <div className="mb-2"><img src={preview} alt="preview" style={{height:150, objectFit:"cover"}}/></div>}
        <button className="btn btn-success" type="submit">Ajouter</button>
      </form>
    </div>
  );
}
