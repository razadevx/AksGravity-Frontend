import { useEffect, useState } from "react";
import api from "../../services/api";
import MainHeader from "../../components/layout/MainHeader";

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

      const workersRes = await api.get("/workers");
      const workersList = Array.isArray(workersRes.data)
        ? workersRes.data
        : workersRes.data.workers || [];

      const attendanceRes = await api.get(
        `/worker-attendance?date=${date}`,
      );

      const attendanceMap = {};
      attendanceRes.data.forEach((a) => {
        attendanceMap[a.workerId._id] = a;
      });

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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
      alert("Some attendance records could not be saved");
    }
  };

  return (
    <>
      <MainHeader />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">Worker Attendance</h1>

          <div className="flex items-center gap-3">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm"
            />

            <button
              onClick={saveAllAttendance}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Save All
            </button>
          </div>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-xl shadow border overflow-hidden">
          {loading ? (
            <div className="p-6 text-gray-500">Loading attendance…</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 text-sm text-gray-600">
                <tr>
                  <th className="text-left p-4">Worker</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Overtime</th>
                  <th className="p-4">Remarks</th>
                </tr>
              </thead>

              <tbody>
                {workers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center p-6 text-gray-500"
                    >
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
                            x._id === updated._id ? updated : x,
                          ),
                        )
                      }
                    />
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

/* ================= ROW ================= */

function AttendanceRow({ worker, onChange }) {
  const [status, setStatus] = useState(worker.status);
  const [overtimeHours, setOvertimeHours] = useState(
    worker.overtimeHours,
  );
  const [remarks, setRemarks] = useState(worker.remarks);

  useEffect(() => {
    onChange({
      ...worker,
      status,
      overtimeHours,
      remarks,
    });
  }, [status, overtimeHours, remarks]);

  const statusColor =
    status === "present"
      ? "bg-green-100 text-green-700"
      : status === "absent"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="p-4 font-medium">{worker.name}</td>

      <td className="p-4 text-center">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}
        >
          <option value="present">present</option>
          <option value="absent">absent</option>
          <option value="half-day">half-day</option>
        </select>
      </td>

      <td className="p-4 text-center">
        <input
          type="number"
          min="0"
          disabled={status === "absent"}
          value={overtimeHours}
          onChange={(e) =>
            setOvertimeHours(Number(e.target.value))
          }
          className="border rounded-lg px-2 py-1 w-20 text-center"
        />
      </td>

      <td className="p-4">
        <input
          type="text"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Optional note…"
          className="border rounded-lg px-3 py-1 w-full text-sm"
        />
      </td>
    </tr>
  );
}
