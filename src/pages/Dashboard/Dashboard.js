import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import AjouterArticle from "./AjouterArticle";
import GestionArticles from "./GestionArticles";
import Login from "../Login";

export default function DashboardRoute({ loggedIn, setLoggedIn, articles, setArticles }) {
  if (!loggedIn) return <Login onLogin={setLoggedIn} />;

  // Calcul des statistiques
  const totalArticles = articles.length;
  const totalValue = articles.reduce((sum, a) => sum + a.pu, 0);
  const avgPrice = totalArticles > 0 ? (totalValue / totalArticles).toFixed(2) : 0;
  const mostExpensive = totalArticles > 0 ? Math.max(...articles.map(a => a.pu)) : 0;

  return (
    <div className="dashboard-container">
      <div className="row g-4">
        {/* Sidebar */}
        <div className="col-lg-3 col-md-4">
          <Sidebar setLoggedIn={setLoggedIn} />
        </div>

        {/* Contenu principal */}
        <div className="col-lg-9 col-md-8">
          <Routes>
            {/* Page d'accueil du dashboard avec statistiques */}
            <Route
              path="/"
              element={
                <div className="dashboard-home">
                  {/* Header avec bienvenue */}
                  <div className="dashboard-welcome">
                    <div>
                      <h2>Tableau de bord</h2>
                      <p>Bienvenue, Admin ! Voici un aperçu de votre boutique.</p>
                    </div>
                    <div className="welcome-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                    </div>
                  </div>

                  {/* Cartes de statistiques */}
                  <div className="stats-grid">
                    <div className="stat-card stat-primary">
                      <div className="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                          <line x1="3" y1="6" x2="21" y2="6"></line>
                          <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                      </div>
                      <div className="stat-content">
                        <div className="stat-value">{totalArticles}</div>
                        <div className="stat-label">Articles Total</div>
                      </div>
                      <div className="stat-trend positive">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                          <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                        +12.5%
                      </div>
                    </div>

                    <div className="stat-card stat-success">
                      <div className="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="1" x2="12" y2="23"></line>
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                      </div>
                      <div className="stat-content">
                        <div className="stat-value">{totalValue} DH</div>
                        <div className="stat-label">Valeur Totale</div>
                      </div>
                      <div className="stat-trend positive">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                          <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                        +8.3%
                      </div>
                    </div>

                    <div className="stat-card stat-warning">
                      <div className="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                          <path d="M12 18V6"></path>
                        </svg>
                      </div>
                      <div className="stat-content">
                        <div className="stat-value">{avgPrice} DH</div>
                        <div className="stat-label">Prix Moyen</div>
                      </div>
                      <div className="stat-trend neutral">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        0.0%
                      </div>
                    </div>

                    <div className="stat-card stat-danger">
                      <div className="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                      </div>
                      <div className="stat-content">
                        <div className="stat-value">{mostExpensive} DH</div>
                        <div className="stat-label">Prix Max</div>
                      </div>
                      <div className="stat-trend positive">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                          <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                        +5.0%
                      </div>
                    </div>
                  </div>

                  {/* Actions rapides */}
                  <div className="quick-actions">
                    <h4>Actions Rapides</h4>
                    <div className="action-grid">
                      <a href="/dashboard/ajouter" className="action-card">
                        <div className="action-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </div>
                        <h5>Ajouter Article</h5>
                        <p>Créer un nouveau produit</p>
                      </a>

                      <a href="/dashboard/gestion" className="action-card">
                        <div className="action-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M12 1v6m0 6v6m5.657-13.657l-4.243 4.243m-4.243 4.243l-4.242 4.242m13.97 0l-4.243-4.242m-4.243-4.243l-4.242-4.242"></path>
                          </svg>
                        </div>
                        <h5>Gérer Articles</h5>
                        <p>Modifier ou supprimer</p>
                      </a>

                      <a href="/" className="action-card">
                        <div className="action-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                          </svg>
                        </div>
                        <h5>Voir la Boutique</h5>
                        <p>Aperçu client</p>
                      </a>

                      <a href="/cart" className="action-card">
                        <div className="action-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                          </svg>
                        </div>
                        <h5>Commandes</h5>
                        <p>Voir les paniers</p>
                      </a>
                    </div>
                  </div>

                  {/* Articles récents */}
                  <div className="recent-products">
                    <h4>Articles Récents</h4>
                    <div className="products-list">
                      {articles.slice(0, 3).map(a => (
                        <div key={a.id} className="product-item">
                          <img 
                            src={a.image && a.image.startsWith("blob:") 
                              ? a.image 
                              : process.env.PUBLIC_URL + "/images/" + (a.image || "default-product.jpg")} 
                            alt={a.nomA}
                          />
                          <div className="product-info">
                            <h6>{a.nomA}</h6>
                            <p>{a.desc?.slice(0, 50)}...</p>
                          </div>
                          <div className="product-price">{a.pu} DH</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="ajouter" element={<AjouterArticle articles={articles} setArticles={setArticles} />} />
            <Route path="gestion" element={<GestionArticles articles={articles} setArticles={setArticles} />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}