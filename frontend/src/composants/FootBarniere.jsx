import React from "react";

export default function FootBarniere() {
  return (
    <div className="min-h-[600px] bg-[url('/images/baniere6.jpg')] bg-no-repeat bg-cover bg-fixed">
      <div className="min-h-[600px] bg-[rgba(0,0,255,0.4)] flex items-center justify-center">
        <div className="text-center p-10">
          <h1 className="my-10 text-6xl font-bold font-mono text-orange-400">
            Rejoignez-nous dès maintenant !
          </h1>
          <div className="my-10 text-center text-2xl text-white">
            Inscrivez-vous et découvrez comment notre plateforme peut <br />
            faciliter la gestion de vos travaux pratiques.
          </div>
          <div className="my-10 flex items-center justify-center gap-4 font-mono flex-wrap">
            <a
              href="#"
              className="py-2 px-5 bg-blue-400 text-white rounded hover:bg-orange-400 font-bold"
            >
              S'inscrire Maintenant
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
