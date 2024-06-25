import React from "react";
import FonctionnaliteElt from "./FonctionnaliteElt";
import Bande from "./Bande";

export default function Fonctionnalite() {
  return (
    <div className="w-[100%] p-5">
      <div className="w-[85%] m-auto">
        <h1 className="text-3xl font-mono font-bold pb-3">
          Fonctionnalités Principales
        </h1>
        <FonctionnaliteElt
          text={
            "Mettez en ligne vos travaux pratiques, gérez les soumissions et évaluez les travaux des étudiants en toute simplicité"
          }
          titre={"Pour les enseignants"}
          image="baniere0.jpg"
          type={2}
        />
        <Bande />
        <FonctionnaliteElt
          text={
            "Consultez les énoncés de travaux pratiques, soumettez vos résultats et consultez vos notes facilement"
          }
          titre={"Pour les Étudiants"}
          image="baniere0.jpg"
          type={1}
        />
        <Bande />
        <FonctionnaliteElt
          text={
            "Assurez une traçabilité complète des travaux soumis et résolvez les litiges rapidement."
          }
          titre={"Pour l'Administration"}
          image="baniere1.jpg"
          type={2}
        />
      </div>
    </div>
  );
}
