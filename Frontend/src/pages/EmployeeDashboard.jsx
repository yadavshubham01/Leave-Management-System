import DashboardLayout from "../components/DashboardLayout";
import { Link } from "react-router-dom";

export default function EmployeeDashboard() {
  return (
    <DashboardLayout title="Employee Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Apply Leave</h3>
          <p className="text-sm text-gray-500">
            Submit a new leave request
          </p>
          <Link
            to="/apply"
            className="inline-block mt-3 text-white bg-black px-4 py-2 rounded"
          >
            Apply
          </Link>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Calendar</h3>
          <p className="text-sm text-gray-500">
            View team availability
          </p>
          <Link
            to="/calendar"
            className="inline-block mt-3 text-white bg-black px-4 py-2 rounded"
          >
            View
          </Link>
        </div>
        
         <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Apply Leave</h3>
          <p className="text-sm text-gray-500">
            Submit a new leave request
          </p>
          <Link
            to="/history"
            className="inline-block mt-3 text-white bg-black px-4 py-2 rounded"
          >
            View Leave history
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
