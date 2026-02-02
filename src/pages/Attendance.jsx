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

      // 1️⃣ Load workers
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

  // ✅ SAVE ALL — CORRECT & SAFE
  const saveAllAttendance = async () => {
    try {
      for (const w of workers) {
        await api.post("/worker-attendance", {
          workerId: w._id,
          date,
          status: w.status,
          overtimeHours: w.overtimeHours,
          remarks: w.remarks,
        });
      }
      alert("Attendance saved successfully");
      loadData();
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
          "Some attendance records could not be saved"
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Worker Attendance</h1>

      {/* DATE PICKER */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-2 py-1 rounded"
        />
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={saveAllAttendance}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Save All Attendance
      </button>

      {/* TABLE */}
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
            </tr>
          </thead>

          <tbody>
            {workers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No workers found
                </td>
              </tr>
            ) : (
              workers.map((w) => (
                <AttendanceRow
                  key={w._id}
                  worker={w}
                  onChange={(updated) =>
                    setWorkers((prev) =>
                      prev.map((x) =>
                        x._id === updated._id ? updated : x
                      )
                    )
                  }
                />
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

/* ================= ROW ================= */

function AttendanceRow({ worker, onChange }) {
  const [status, setStatus] = useState(worker.status);
  const [overtimeHours, setOvertimeHours] = useState(worker.overtimeHours);
  const [remarks, setRemarks] = useState(worker.remarks);

  useEffect(() => {
    onChange({
      ...worker,
      status,
      overtimeHours,
      remarks,
    });
  }, [status, overtimeHours, remarks]);

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
          onChange={(e) =>
            setOvertimeHours(Number(e.target.value))
          }
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
    </tr>
  );
}
