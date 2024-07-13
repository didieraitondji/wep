import React from "react";
import 'typeface-poppins';
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Destination from "./Destination";
import ConnexionEtudiant from "./etudiant/Connexion";


const Root = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Destination />} />
        <Route exact path="/etudiant-connexion/" element={<ConnexionEtudiant />} />
      </Routes>
    </Router>
  );
};

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<Root />);
