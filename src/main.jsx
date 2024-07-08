import React from "react";
import 'typeface-poppins';
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Accueil from "./vues/AccueilPage.jsx";
import ConnexionPage from "./vues/ConnexionPage.jsx";
import ContactPage from "./vues/ContactPage.jsx";
import Apropos from "./vues/Apropos.jsx";

// création du composant

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Accueil />} />
        <Route exact path="/connexion/" element={<ConnexionPage />} />
        <Route exact path="/contact/" element={<ContactPage />} />
        <Route exact path="/apropos/" element={<Apropos />} />
      </Routes>
    </Router>
  );
};

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<Root />);
