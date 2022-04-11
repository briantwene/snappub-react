// #Filename: App.jsx
// #Author: Brian Twene (@bt521)
// #Date:12/12/21

import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import View from "./pages/View";
import Settings from "./pages/Settings";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view" element={<View />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
