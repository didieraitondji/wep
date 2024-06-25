import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/css/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Accueil from "./vues/AccueilPage.jsx";
import ConnexionPage from "./vues/ConnexionPage.jsx";
import ContactPage from "./vues/ContactPage.jsx";
import Apropos from "./vues/Apropos.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Accueil />,
  },
  {
    path: "/connexion/",
    element: <ConnexionPage />,
  },
  {
    path: "/contact/",
    element: <ContactPage />,
  },
  {
    path: "/apropos/",
    element: <Apropos />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>
);
