import React, { useState } from "react";
import Bande from "../composants/Bande";
import Menu from "../composants/Menu";
import FootMenu from "../composants/FootMenu";
import PiedPage from "../composants/PiedPage";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Subject:", subject);
    console.log("Message:", message);
  };

  return (
    <>
      <Menu />
      <Bande />
      <div className="font-bold font-mono min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white py-8 px-8  max-md:px-0 rounded-lg shadow-lg w-full max-w-5xl">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Contactez-nous
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex max-md:flex-col md:flex-row flex-wrap items-center">
              <div className="w-[50%] flex flex-col max-md:pr-0 md:pr-10">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-blue-500 rounded-lg focus:outline-none focus:ring focus:border-blue-300 "
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 border-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-gray-700 mb-2">
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 border-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="w-[50%] flex flex-col max-md:pl-0 md:pl-10">
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 h-40 border-blue-500"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Envoyer
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <PiedPage />
    </>
  );
};

export default ContactPage;
