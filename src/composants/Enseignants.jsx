import React from "react";

export default function Enseignants() {
  const propsPerso1 = `w-[40%] max-sm:hidden max-lg:m-auto max-lg:w-[80%] max-lg:mb-12 h-[500px] bg-[url('/images/${image}')] bg-center bg-no-repeat bg-cover ${
    type === 2 ? "hidden" : ""
  }`;

  const propsPerso2 = `w-[40%] max-sm:hidden max-lg:m-auto max-lg:w-[80%] max-lg:mb-12 h-[500px] bg-[url('/images/${image}')] bg-center bg-no-repeat bg-cover ${
    type === 2 ? "" : "hidden"
  }`;

  return (
    <div
      className={
        type === 2
          ? "px-5 text-lg font-[Arial] text-justify border-l-2 border-l-orange-500"
          : "px-5 text-lg font-[Arial] text-justify border-r-2 border-r-orange-500"
      }
    >
      <div className="bg-purple-100">
        <h1 className="text-white font-[Arial] font-bold text-2xl capitalize p-4 border-b-2 border-b-orange-300 bg-blue-600 flex">
          {titre}
        </h1>
        <div className="p-4 flex flex-col lg:flex-row">
          <div className={propsPerso1}></div>
          <div className="w-[100%] lg:w-[60%] px-8 flex items-center justify-center flex-col">
            <img
              className="w-[100px] mb-8 pb-8 border-b-2 border-b-orange-500"
              src="/images/logo_wep1.png"
              alt="Logo Wep"
            />
            <div className="text-center leading-loose mb-5">{text}</div>
            <div className="my-5 flex gap-4 font-mono flex-wrap">
              <a
                href="/connexion/"
                className="py-2 px-5 bg-orange-400 text-white rounded hover:bg-blue-400 font-bold"
              >
                Se Connecter
              </a>
            </div>
          </div>
          <div className={propsPerso2}></div>
        </div>
      </div>
    </div>
  );
}
