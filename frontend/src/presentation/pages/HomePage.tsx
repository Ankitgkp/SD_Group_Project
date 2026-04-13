import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("http://localhost:8000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-slate-800 bg-slate-900">
        <h1 className="text-xl font-bold">⚡ EV Dashboard</h1>

        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-300">
            {user?.getFullName?.() || user?.firstName}
          </span>

          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-slate-700 rounded-lg hover:border-red-500 hover:text-red-400 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="p-6 max-w-7xl mx-auto">

        {/* HERO */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-2xl mb-8">
          <h2 className="text-3xl font-bold">
            Welcome {user?.firstName} 👋
          </h2>
          <p className="mt-2 text-blue-100">
            Start exploring EV charging stations near you.
          </p>

          <button className="mt-4 bg-white text-black px-5 py-2 rounded-xl font-semibold hover:opacity-90">
            Find Stations
          </button>
        </div>

        {/* CARDS */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <div className="card">
            <p className="text-slate-400 text-sm">Nearby Stations</p>
            <h3 className="text-2xl font-bold mt-2">--</h3>
          </div>

          <div className="card">
            <p className="text-slate-400 text-sm">Active Bookings</p>
            <h3 className="text-2xl font-bold mt-2">--</h3>
          </div>

          <div className="card">
            <p className="text-slate-400 text-sm">Completed</p>
            <h3 className="text-2xl font-bold mt-2">--</h3>
          </div>

          <div className="card">
            <p className="text-slate-400 text-sm">Payments</p>
            <h3 className="text-2xl font-bold mt-2">--</h3>
          </div>

        </div>
      </main>
    </div>
  );
}