import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // ✅ Added
import Home from "./pages/Home";
import Donor from "./pages/Donor";
import Recipient from "./pages/Recipient";
import Ledger from "./pages/Ledger";
import Match from "./pages/Match";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />

      <Navbar />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/donor" element={<Donor />} />
          <Route path="/recipient" element={<Recipient />} />
          <Route path="/ledger" element={<Ledger />} />
          <Route path="/match" element={<Match />} />
        </Routes>
      </div>

      <Footer /> {/* ✅ Footer always visible */}
    </Router>
  );
}

export default App;
