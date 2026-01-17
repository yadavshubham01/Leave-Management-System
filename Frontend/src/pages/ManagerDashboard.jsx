import { useEffect, useState } from "react";
import api from "../api/axios";
import DashboardLayout from "../components/DashboardLayout";
import LeaveCard from "../components/LeaveCard";
import toast from "react-hot-toast";

export default function ManagerDashboard() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    api.get("/leave/pending").then(res => setLeaves(res.data.leaves));
  }, []);

  const approve = async (id, comment) => {
    try {
      await api.patch(`/leave/${id}/approve`, { comment });
      toast.success("Leave approved");
      setLeaves(prev => prev.filter(l => l._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Approval failed");
    }
  };

  const reject = async (id, comment) => {
    try {
      await api.patch(`/leave/${id}/reject`, { comment });
      toast.success("Leave rejected");
      setLeaves(prev => prev.filter(l => l._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Rejection failed");
    }
  };

  return (
    <DashboardLayout title="Manager Dashboard">
      <div className="max-w-3xl">
        {leaves.length === 0 && (
          <p className="text-gray-500">No pending leave requests</p>
        )}

        {leaves.map(leave => (
          <LeaveCard
            key={leave._id}
            leave={leave}
            isManager
            onApprove={approve}
            onReject={reject}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}
