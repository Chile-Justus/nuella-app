import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import SplashScreen from "./pages/SplashScreen";
import Inventory from "./pages/Inventory";
import SalesTracker from "./pages/SalesTracker";
import MonthlySales from "./pages/MonthlySales";
import { Menu, X } from "lucide-react"; // lightweight icons

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <Router>
      <div className="h-screen flex flex-col">
        {/* Navigation */}
        <nav className="bg-[#2A0C5C] text-white p-4 flex justify-between items-center shadow-md relative">
          {/* Logo / Title */}
          <h1 className="font-playfair text-xl sm:text-2xl">Nuella Creatives</h1>

          {/* Desktop Links */}
          <div className="hidden sm:flex space-x-6 text-sm sm:text-base">
            <Link to="/" className="hover:text-purple-300">Inventory</Link>
            <Link to="/sales" className="hover:text-purple-300">Sales Tracker</Link>
            <Link to="/monthly" className="hover:text-purple-300">Monthly Sales</Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="sm:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Mobile Dropdown Menu */}
          {menuOpen && (
            <div className="absolute top-16 left-0 w-full bg-[#2A0C5C] flex flex-col items-center space-y-4 py-4 sm:hidden z-50">
              <Link
                to="/"
                className="hover:text-purple-300"
                onClick={() => setMenuOpen(false)}
              >
                Inventory
              </Link>
              <Link
                to="/sales"
                className="hover:text-purple-300"
                onClick={() => setMenuOpen(false)}
              >
                Sales Tracker
              </Link>
              <Link
                to="/monthly"
                className="hover:text-purple-300"
                onClick={() => setMenuOpen(false)}
              >
                Monthly Sales
              </Link>
            </div>
          )}
        </nav>

        {/* Page Content */}
        <div className="flex-1 overflow-auto bg-[#F8F5FF] p-6">
          <Routes>
            <Route path="/" element={<Inventory />} />
            <Route path="/sales" element={<SalesTracker />} />
            <Route path="/monthly" element={<MonthlySales />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
