import React, { useState } from "react";
import Menu from "../composants/Menu";
import PiedPage from "../composants/PiedPage";
import FootMenu from "../composants/FootMenu";

const ConnexionPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <>
      <Menu />
      <div className="min-h-screen flex items-center justify-center bg-c1 font-poppins">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="font-bold block text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-blue-500 w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block font-bold text-gray-700 mb-2"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-blue-500 w-full font-bold p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Se connecter
            </button>
          </form>
          <div className="mt-6 text-center">
            <a
              href="#forgot-password"
              className="text-blue-500 hover:underline pb-5"
            >
              Mot de passe oublié?
            </a>
          </div>
          <div className="mt-2 text-center">
            <a href="#signup" className="text-blue-500 hover:underline my-4">
              Nous Rejoindre
            </a>
          </div>
        </div>
      </div>
      <PiedPage />
    </>
  );
};

export default ConnexionPage;
