import React from "react";
import 'typeface-poppins';
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Destination from "./Destination";
import ConnexionEtudiant from "./etudiant/Connexion";
import DashboardEtudiant from "./etudiant/Dashboard";
import ConnexionEnseignant from "./enseignant/Connexion";
import DashboardEnseignant from "./enseignant/Dashboard";
import ConnexionAdmin from "./admin/Connexion";
import DashboardAdmin from "./admin/Dashboard";
import NotFound from "./NotFound";


const Root = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Destination />} />
                <Route exact path="/etudiant-connexion/" element={<ConnexionEtudiant />} />
                <Route exact path="/enseignant-connexion/" element={<ConnexionEnseignant />} />
                <Route exact path="/admin-connexion/" element={<ConnexionAdmin />} />
                <Route exact path="/etudiant/" element={<DashboardEtudiant />} />
                <Route exact path="/enseignant/" element={<DashboardEnseignant />} />
                <Route exact path="/admin/" element={<DashboardAdmin />} />
                <Route exact path="/admin/dashboard/" element={<DashboardAdmin />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<Root />);
