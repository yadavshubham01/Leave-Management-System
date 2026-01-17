import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import LoadingButton from "../components/LoadingButton";
import Navbar from "../components/Navbar";

export default function ApplyLeave() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    leaveType: "vacation",
    startDate: "",
    endDate: "",
    reason: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitLeave = async (e) => {
    e.preventDefault();

    if (!form.startDate || !form.endDate) {
      return toast.error("Please select dates");
    }

    try {
      setLoading(true);
      await api.post("/leave/apply", form);
      toast.success("Leave request submitted");
      setForm({ ...form, startDate: "", endDate: "", reason: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit leave");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Apply Leave</h2>

        <form onSubmit={submitLeave} className="space-y-3 flex flex-col gap-4">
          <select className="input " name="leaveType" onChange={handleChange}>
            <option value="vacation">Vacation</option>
            <option value="sick">Sick</option>
          </select>

          <input type="date" className="input" name="startDate" onChange={handleChange} />
          <input type="date" className="input" name="endDate" onChange={handleChange} />
          <textarea className="input" name="reason" placeholder="Reason" onChange={handleChange} />

          <LoadingButton loading={loading}>Submit</LoadingButton>
        </form>
      </div>
    </>
  );
}
