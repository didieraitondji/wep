import React from "react";
import Institut from "./Institut";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

export default function Menu({ page }) {
  const toggleFonction = () => {
    const menu = document.querySelector(".mobile-menu");
    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden");
    } else {
      menu.classList.add("hidden");
    }
  };

  return (
    <nav className="bg-blue-600 shadow-lg m-0 font-mono text-md fixed top-0 left-0 right-0">
      <div className=" w-11/12 lg:w-10/12 mx-auto px-0">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div className="py-0">
              <a
                href="#"
                className="flex items-center py-3 text-gray-700 hover:text-gray-900"
              >
                <img
                  className=" w-[80px] mb-[-1px] m-0 p-0"
                  src="/images/logo_wep1.png"
                  alt="Logo Wep"
                />
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              <a
                href="/"
                className={
                  page == "a"
                    ? "py-3 px-3 text-white font-bold hover:text-orange-400 capitalize border-b-4 border-b-orange-400"
                    : "py-3 px-3 text-white font-bold hover:text-orange-400 capitalize"
                }
              >
                Accueil
              </a>

              <ScrollLink
                to="fonctions"
                smooth={true}
                duration={500}
                className={
                  page == "b"
                    ? "py-3 px-3 text-white font-bold hover:text-orange-400 capitalize border-b-4 border-b-orange-400"
                    : "py-3 px-3 text-white font-bold hover:text-orange-400 capitalize cursor-pointer"
                }
              >
                Fonctionnalités
              </ScrollLink>

              <a
                href="/apropos/"
                className={
                  page == "c"
                    ? "py-3 px-3 text-white font-bold hover:text-orange-400 capitalize border-b-4 border-b-orange-400"
                    : "py-3 px-3 text-white font-bold hover:text-orange-400 capitalize"
                }
              >
                à propos
              </a>
              <a
                href="/contact/"
                className={
                  page == "d"
                    ? "py-3 px-3 text-white font-bold hover:text-orange-400 capitalize border-b-4 border-b-orange-400"
                    : "py-3 px-3 text-white font-bold hover:text-orange-400 capitalize"
                }
              >
                Contact
              </a>
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <a
              href="/connexion/"
              className="py-1 px-3 bg-orange-400 text-white rounded hover:bg-blue-400 font-bold"
            >
              Se connecter
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button" onClick={toggleFonction}>
              <svg
                className="w-6 h-6 text-white hover:text-orange-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        className="mobile-menu float-end w-3/6 max-sm:w-4/6 bg-blue-600 p-2 fixed right-0 hidden md:hidden"
      >
        <a
          href="/"
          className={
            page == "a"
              ? "block py-2 px-3 text-white font-bold hover:text-orange-400 capitalize border-b-4 border-b-orange-400"
              : "block py-2 px-3 text-white font-bold hover:text-orange-400 capitalize"
          }
        >
          Accueil
        </a>

        <ScrollLink
          to="fonctions"
          smooth={true}
          duration={500}
          className={
            page == "b"
              ? "block py-2 px-3 text-white font-bold hover:text-orange-400 capitalize border-b-4 border-b-orange-400"
              : "block py-2 px-3 text-white font-bold hover:text-orange-400 capitalize cursor-pointer"
          }
        >
          Fonctionnalités
        </ScrollLink>
        <a
          href="/apropos/"
          className={
            page == "c"
              ? "block py-2 px-3 text-white font-bold hover:text-orange-400 capitalize border-b-4 border-b-orange-400"
              : "block py-2 px-3 text-white font-bold hover:text-orange-400 capitalize"
          }
        >
          à propos
        </a>
        <a
          href="/contact"
          className={
            page == "d"
              ? "block py-2 px-3 text-white font-bold hover:text-orange-400 capitalize border-b-4 border-b-orange-400"
              : "block py-2 px-3 text-white font-bold hover:text-orange-400 capitalize"
          }
        >
          Contact
        </a>
        <a
          href="/connexion/"
          className="block py-2 px-3 bg-orange-400 text-white rounded hover:bg-blue-400 font-bold text-center w-36 m-auto my-4"
        >
          Se connecter
        </a>
      </div>
    </nav>
  );
}
