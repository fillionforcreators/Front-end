import React from "react";
import { Navbar, Home, Footer, SignUp, LaunchPad, ArtistsAndCreators } from "./components";
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
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/launchpad" element={<LaunchPad />} />
          <Route exact path="/artists_creators" element={<ArtistsAndCreators />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
