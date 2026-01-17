import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import api from "../api/axios";
import LoadingButton from "../components/LoadingButton";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login(){
     const { login } = useContext(AuthContext);
     const [ email ,setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [loading, setLoading] = useState(false);
     const navigate = useNavigate();
     const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await api.post("/login", { email, password });
      login(res.data);
      toast.success("Login successful");

      window.location.href =
        res.data.user.role === "Manager" ? "/manager" : "/employee";
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

     return (
         <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-6 rounded shadow w-80">
      <form
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          className="w-full mb-3 p-2 border"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full mb-3 p-2 border"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoadingButton loading={loading}>Login</LoadingButton>
      </form>
      <span className="py-2 pl-3">New User? <button className="text-blue-500 cursor-pointer font-medium" onClick={() => navigate('/signup')}> Sign up</button></span>
     </div>
    </div>
    );
}