import React from "react";

export default function FootMenu() {
  return (
    <div className="min-h-[150px] bg-blue-600 flex flex-col items-center justify-center">
      <div className="flex flex-wrap max-w-[85%] m-auto mb-8 text-left">
        <a
          href="#"
          className="text-white font-bold hover:text-orange-400 py-2 px-5 hover:border-b-2 hover:border-b-orange-400"
        >
          FAQ
        </a>
        <a
          href="#"
          className="text-white font-bold hover:text-orange-400 py-2 px-5 hover:border-b-2 hover:border-b-orange-400"
        >
          Conditions d'Utilisations
        </a>
        <a
          href="#"
          className="text-white font-bold hover:text-orange-400 py-2 px-5 hover:border-b-2 hover:border-b-orange-400"
        >
          Politiques & Confidentialités
        </a>
      </div>
      <div className="text-white text-center font-mono font-bold w-[85%] border-t-2 pt-3 pb-4">
        &copy; Copyright <span className="text-orange-400">WeP</span> 2024
      </div>
    </div>
  );
}
