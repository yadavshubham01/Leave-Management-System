import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/login";
import SignUp from "./pages/Signup";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import ApplyLeave from "./pages/ApplyLeave";
import Calendar from "./pages/Calender";
import ProtectedRoute from "./components/ProtectedRoute";
import LeaveHistory from "./pages/LeaveHistory";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/employee"
            element={
              <ProtectedRoute roles={["Employee"]}>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manager"
            element={
              <ProtectedRoute roles={["Manager"]}>
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/apply" element={<ApplyLeave />} />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute roles={["Employee", "Manager"]}>
                <Calendar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute roles={["Employee"]}>
                <LeaveHistory />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
