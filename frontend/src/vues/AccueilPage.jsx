import React from "react";
import Menu from "../composants/Menu";
import Institut from "../composants/Institut";
import BarniereAc from "../composants/BarniereAc";
import HeadPlace from "../composants/HeadPlace";
import PiedPage from "../composants/PiedPage";
import Bande from "../composants/Bande";
import Fonctionnalite from "../composants/Fonctionnalite";

export default function Accueil() {
  return (
    <>
      <HeadPlace />
      <Menu page={"a"} />
      <BarniereAc />
      <Bande id={"fonctions"} />
      <Fonctionnalite />
      <PiedPage />
    </>
  );
}
