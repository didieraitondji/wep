import React from "react";
import 'typeface-poppins';
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={} />
      </Routes>
    </Router>
  );
};

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<Root />);
