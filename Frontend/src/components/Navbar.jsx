import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return null;

  return (
    <nav className="bg-black text-white px-6 py-3 flex justify-between items-center">
      <h1 className="font-bold text-lg">Leave System</h1>

      <div className="space-x-4">
        {user.role === "Employee" && (
          <>
            <Link to="/employee">Dashboard</Link>
            <Link to="/apply">Apply Leave</Link>
          </>
        )}

        {user.role === "Manager" && (
          <>
            <Link to="/manager">Dashboard</Link>
          </>
        )}

        <Link to="/calendar">Calendar</Link>
        <button
          onClick={logout}
          className="ml-4 bg-red-600 px-3 py-1 rounded cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
