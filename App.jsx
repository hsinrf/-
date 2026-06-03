import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Analytics from "./pages/Analytics.jsx";
import Data from "./pages/Data.jsx";
import Settings from "./pages/Settings.jsx";
import Users from "./pages/Users.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="sticky top-0 z-40 backdrop-blur bg-slate-950/80 border-b border-white/10">
        <nav className="max-w-6xl mx-auto flex items-center gap-2 px-4 py-3 overflow-x-auto">
          <Link to="/" className="font-bold text-base mr-2 whitespace-nowrap">dashboard-premium</Link>
          <div className="flex gap-1 ml-auto">
          <Link to="/" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">Home</Link>
          <Link to="/analytics" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">Analytics</Link>
          <Link to="/data" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">Data Management</Link>
          <Link to="/settings" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">Settings & Security</Link>
          <Link to="/users" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">Users & Roles</Link>
          </div>
        </nav>
      </header>
      <main className="flex-1">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/data" element={<Data />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/users" element={<Users />} />
        </Routes>
      </main>
      <footer className="border-t border-white/10 py-4 text-center text-xs text-slate-500">
        © 2026 dashboard-premium
      </footer>
    </div>
  );
}
