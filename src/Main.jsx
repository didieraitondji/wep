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
import TpsAdmin from "./admin/Tps";
import TravauxAdmin from "./admin/Travaux";
import Utilisateurs from "./admin/Users";
import TpsEnseignant from "./enseignant/Tps";
import TravauxEnseignant from "./enseignant/Travaux";
import ProfilEnseignant from "./enseignant/Profil";
import TpsEtudiant from "./etudiant/Tps";
import TravauxEtudiant from "./etudiant/Travaux";
import ProfilEtudiant from "./etudiant/Profil";


const Root = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Destination />} />
                {
                    // routes etudiant
                }
                <Route exact path="/etudiant-connexion/" element={<ConnexionEtudiant />} />
                <Route exact path="/etudiant/" element={<DashboardEtudiant />} />
                <Route exact path="/etudiant/dashboard/" element={<DashboardEtudiant />} />
                <Route exact path="/etudiant/tps/" element={<TpsEtudiant />} />
                <Route exact path="/etudiant/travaux/" element={<TravauxEtudiant />} />
                <Route exact path="/etudiant/profil/" element={<ProfilEtudiant />} />
                {
                    // routes enseignant
                }
                <Route exact path="/enseignant-connexion/" element={<ConnexionEnseignant />} />
                <Route exact path="/enseignant/" element={<DashboardEnseignant />} />
                <Route exact path="/enseignant/dashboard/" element={<DashboardEnseignant />} />
                <Route exact path="/enseignant/tps/" element={<TpsEnseignant />} />
                <Route exact path="/enseignant/travaux/" element={<TravauxEnseignant />} />
                <Route exact path="/enseignant/profil/" element={<ProfilEnseignant />} />
                {
                    // routes admin
                }
                <Route exact path="/admin-connexion/" element={<ConnexionAdmin />} />
                <Route exact path="/admin/" element={<DashboardAdmin />} />
                <Route exact path="/admin/dashboard/" element={<DashboardAdmin />} />
                <Route exact path="/admin/tps/" element={<TpsAdmin />} />
                <Route exact path="/admin/travaux/" element={<TravauxAdmin />} />
                <Route exact path="/admin/users/" element={<Utilisateurs />} />
                {
                    // routes pages par défaut
                }
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<Root />);
