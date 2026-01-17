import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Calendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/leave/calendar").then(res => {
      const formatted = res.data.map(l => ({
        title: `${l.employeeName} (${l.leaveType})`,
        start: l.startDate,
        end: l.endDate,
      }));
      setEvents(formatted);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Leave Calendar</h2>

        <div className="bg-white p-4 rounded shadow">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            height="auto"
          />
        </div>
      </div>
    </>
  );
}
