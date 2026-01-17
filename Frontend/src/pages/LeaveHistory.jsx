import { useEffect, useState } from "react";
import api from "../api/axios";
import DashboardLayout from "../components/DashboardLayout";
import LeaveCard from "../components/LeaveCard";
import toast from "react-hot-toast";

export default function LeaveHistory() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    api.get("/leave/my").then(res => setLeaves(res.data));
  }, []);

  const revokeLeave = async (id) => {
    try {
      await api.delete(`/leave/${id}`);
      toast.success("Leave revoked");
      setLeaves(prev => prev.filter(l => l._id !== id));
    } catch {
      toast.error("Failed to revoke leave");
    }
  };

  return (
    <DashboardLayout title="My Leave History">
      {leaves.length === 0 && (
        <p className="text-gray-500">No leave records</p>
      )}

      {leaves.map(leave => (
        <LeaveCard
          key={leave._id}
          leave={leave}
          onRevoke={revokeLeave}
        />
      ))}
    </DashboardLayout>
  );
}
