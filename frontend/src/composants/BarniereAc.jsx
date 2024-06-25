import React from "react";

export default function BarniereAc() {
  return (
    <div className="min-h-[98vh] bg-[url('/images/baniere0.jpg')] max-md:bg-center bg-no-repeat bg-cover">
      <div className="w-full min-h-[98vh] bg-[rgba(0,0,255,0.4)] flex items-center justify-center ">
        <div className="m-4 pb-4 pl-20 border-l-8">
          <h1 className="text-6xl md:text-9xl text-orange-500 font-mono font-bold">
            We Pratice
          </h1>{" "}
          <br />
          <br />
          <h2 className="text-2xl md:text-4xl text-white font-mono leading-10">
            Bienvenue sur la Plateforme de Soumission <br /> des Travaux
            Pratiques de l’IMSP
          </h2>
          <br />
          <h3 className="text-lg text-orange-500 font-mono my-4 mb-10 font-bold">
            Avec WeP, Facilitez la gestion et la soumission de vos travaux
            pratiques!
          </h3>
          <div className="my-5 flex gap-4 font-mono flex-wrap">
            <a
              href="#"
              className="py-2 px-5 bg-orange-400 text-white rounded hover:bg-blue-400 font-bold"
            >
              Se Connecter
            </a>

            <a
              href="#"
              className="py-2 px-5 bg-blue-400 text-white rounded hover:bg-orange-400 font-bold"
            >
              Nous rejoindre
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
