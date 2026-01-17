import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../components/LoadingButton";
import toast from "react-hot-toast";
import { validateEmail ,validatePassword } from "../utils/validate";

export default function SignUp(){
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    role: "Employee"
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
     console.log(e.target.name)
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!validateEmail(form.email)) {
      return toast.error("Invalid email address");
    }
    if (!validatePassword(form.password)) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      setLoading(true);
      const res = await api.post("/register", form);
      login(res.data);
      toast.success("Account created successfully");

      window.location.href =
        res.data.user.role === "Manager" ? "/manager" : "/employee";
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
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
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <input
          className="w-full mb-3 p-2 border"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          className="w-full mb-3 p-2 border"
          placeholder="firstName"
          name="firstName"
          onChange={handleChange}
        />
        <input
          className="w-full mb-3 p-2 border"
          placeholder="lastName"
          name="lastName"
          onChange={handleChange}
        />
        <input
          type="password"
          className="w-full mb-3 p-2 border"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <select className="w-full mb-3 p-2 border" name="role" onChange={handleChange}>
          <option value="Employee">Employee</option>
          <option value="Manager">Manager</option>
        </select>
          
         <LoadingButton loading={loading}>Register</LoadingButton>
      </form>
      <span className="py-2 pl-3">Already have account? <button className="text-blue-500 cursor-pointer font-medium" onClick={() => navigate('/')}> Login</button></span>
     </div>
    </div>
    );
}