import { useState } from "react";

export default function LeaveCard({
  leave,
  onApprove,
  onReject,
  onRevoke,
  onEdit,
  isManager,
}) {
  const [comment, setComment] = useState("");

  return (
    <div className="border rounded p-4 mb-3 bg-white shadow">

      {leave.employee && (
        <p className="font-semibold">
          {leave.employee.firstName} {leave.employee.lastName}
        </p>
      )}

      <p className="text-sm">
        {leave.leaveType} | {leave.startDate.slice(0, 10)} →{" "}
        {leave.endDate.slice(0, 10)}
      </p>

      <p className="text-xs text-gray-500 mb-2">
        Status:{" "}
        <span
          className={
            leave.status === "Approved"
              ? "text-green-600"
              : leave.status === "Rejected"
              ? "text-red-600"
              : "text-yellow-600"
          }
        >
          {leave.status}
        </span>
      </p>

 
      {leave.managerComment && (
        <div className="mt-2 p-2 bg-gray-100 rounded text-sm">
          <strong>Manager Comment:</strong>
          <p>{leave.managerComment}</p>
        </div>
      )}

  
      {isManager && leave.status === "Pending" && (
        <>
          <textarea
            className="w-full p-2 border rounded mb-3"
            placeholder="Add comment (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <div className="space-x-2">
            <button
              onClick={() => onApprove(leave._id, comment)}
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Approve
            </button>

            <button
              onClick={() => onReject(leave._id, comment)}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Reject
            </button>
          </div>
        </>
      )}


      {!isManager && leave.status === "Pending" && (
        <div className="mt-3 space-x-2">
          <button
            onClick={() => onEdit && onEdit(leave)}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Edit
          </button>

          <button
            onClick={() => onRevoke && onRevoke(leave._id)}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Revoke
          </button>
        </div>
      )}
    </div>
  );
}
