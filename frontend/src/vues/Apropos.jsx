import React from "react";
import Menu from "../composants/Menu";
import Bande from "../composants/Bande";
import PiedPage from "../composants/PiedPage";

const AboutPage = () => {
  return (
    <>
      <Menu />
      <Bande />
      <div className="min-h-screen">
        <div className="container mx-auto p-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">
              À propos de nous
            </h1>
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Notre Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                Notre mission est de fournir une plateforme éducative innovante
                et efficace pour les étudiants et les enseignants. Nous nous
                efforçons de faciliter la soumission des travaux pratiques et
                d'améliorer la traçabilité des activités académiques pour
                assurer une évaluation transparente et équitable.
              </p>
            </section>
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Notre Équipe</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="text-center">
                  <img
                    src="team-member-1.jpg"
                    alt="Membre de l'équipe"
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold">Nom de Membre 1</h3>
                  <p className="text-gray-600">Poste</p>
                </div>
                <div className="text-center">
                  <img
                    src="team-member-2.jpg"
                    alt="Membre de l'équipe"
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold">Nom de Membre 2</h3>
                  <p className="text-gray-600">Poste</p>
                </div>
                <div className="text-center">
                  <img
                    src="team-member-3.jpg"
                    alt="Membre de l'équipe"
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold">Nom de Membre 3</h3>
                  <p className="text-gray-600">Poste</p>
                </div>
                {/* Ajoutez plus de membres de l'équipe ici */}
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-4">Notre Histoire</h2>
              <p className="text-gray-700 leading-relaxed">
                Nous avons commencé en tant que petite équipe de passionnés de
                technologie avec l'objectif de révolutionner le monde de
                l'éducation. Depuis notre création, nous avons grandi et évolué
                pour devenir une plateforme de confiance utilisée par des
                milliers d'étudiants et d'enseignants à travers le pays.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Bande />
      <PiedPage />
    </>
  );
};

export default AboutPage;
