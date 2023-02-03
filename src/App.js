import React from "react";
import { Navbar, Home, Footer } from "./components";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="font-mod flex flex-col relative overflow-x-hidden dark:bg-[#202020] transition-all duration-300 ease-in-out">
        <Navbar />
        <div>
          <Toaster position="bottom-right" reverseOrder={false} />
        </div>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
