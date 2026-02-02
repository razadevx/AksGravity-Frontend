import { useEffect, useState } from "react";
import api from "../services/api";

const today = new Date().toISOString().split("T")[0];

export default function Attendance() {
  const [date, setDate] = useState(today);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, [date]);

  const loadData = async () => {
    try {
      setLoading(true);

      // 1️⃣ Load workers (SAFE extraction)
      const workersRes = await api.get("/workers");
      const workersList = Array.isArray(workersRes.data)
        ? workersRes.data
        : workersRes.data.workers || [];

      // 2️⃣ Load attendance for selected date
      const attendanceRes = await api.get(
        `/worker-attendance?date=${date}`
      );

      const attendanceMap = {};
      attendanceRes.data.forEach((a) => {
        attendanceMap[a.workerId._id] = a;
      });

      // 3️⃣ Merge workers + attendance
      const merged = workersList.map((w) => {
        const att = attendanceMap[w._id];

        return {
          _id: w._id,
          name: w.name,
          status: att?.status || "present",
          overtimeHours: att?.overtimeHours || 0,
          remarks: att?.remarks || "",
        };
      });

      setWorkers(merged);
    } catch (err) {
      console.error("Failed to load attendance data", err);
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async (workerId, row) => {
    try {
      await api.post("/worker-attendance", {
        workerId,
        date,
        status: row.status,
        overtimeHours: row.overtimeHours,
        remarks: row.remarks,
      });
      alert("Attendance saved");
      loadData(); // refresh after save
    } catch (err) {
      alert(err.response?.data?.message || "Error saving attendance");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Worker Attendance</h1>

      <div className="mb-4">
        <label className="mr-2 font-medium">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-2 py-1 rounded"
        />
      </div>

      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Worker</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Overtime</th>
              <th className="border p-2">Remarks</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {workers.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-4 text-gray-500"
                >
                  No workers found
                </td>
              </tr>
            ) : (
              workers.map((w) => (
                <AttendanceRow
                  key={w._id}
                  worker={w}
                  onSave={markAttendance}
                />
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

/**
 * Inline row component
 */
function AttendanceRow({ worker, onSave }) {
  const [status, setStatus] = useState(worker.status);
  const [overtimeHours, setOvertimeHours] = useState(worker.overtimeHours);
  const [remarks, setRemarks] = useState(worker.remarks);

  // 🔁 Sync state when worker data changes (date switch)
  useEffect(() => {
    setStatus(worker.status);
    setOvertimeHours(worker.overtimeHours);
    setRemarks(worker.remarks);
  }, [worker]);

  return (
    <tr>
      <td className="border p-2">{worker.name}</td>

      <td className="border p-2">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border px-2 py-1"
        >
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="half-day">Half-day</option>
        </select>
      </td>

      <td className="border p-2">
        <input
          type="number"
          min="0"
          disabled={status === "absent"}
          value={overtimeHours}
          onChange={(e) => setOvertimeHours(Number(e.target.value))}
          className="border px-2 py-1 w-20"
        />
      </td>

      <td className="border p-2">
        <input
          type="text"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className="border px-2 py-1 w-full"
        />
      </td>

      <td className="border p-2 text-center">
        <button
          onClick={() =>
            onSave(worker._id, { status, overtimeHours, remarks })
          }
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Save
        </button>
      </td>
    </tr>
  );
}
