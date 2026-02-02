import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function WorkerDashboard() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({
    total: 0,
    present: 0,
    absent: 0,
    cost: 0,
  });
  const [todayList, setTodayList] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];

      const workersRes = await api.get("/workers");
      const attendanceRes = await api.get(`/worker-attendance?date=${today}`);

      const workers = workersRes.data;
      const attendance = attendanceRes.data;

      const attendanceMap = {};
      attendance.forEach((a) => {
        attendanceMap[a.workerId._id] = a;
      });

      let present = 0;
      let absent = 0;
      let cost = 0;

      const list = workers.map((w) => {
        const att = attendanceMap[w._id];
        const status = att?.status || "present";
        const overtime = att?.overtimeHours || 0;

        if (status === "present") {
          present++;
          cost += w.dailyWage;
        } else {
          absent++;
        }

        cost += overtime * 0; // overtime rate later

        return {
          name: w.name,
          category: w.categoryId?.name || "-",
          status,
          overtime,
        };
      });

      setSummary({
        total: workers.length,
        present,
        absent,
        cost,
      });

      setTodayList(list);
    } catch (err) {
      console.error("Worker dashboard error", err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Workers Dashboard</h1>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard title="Total Workers" value={summary.total} />
        <SummaryCard title="Present Today" value={summary.present} />
        <SummaryCard title="Absent Today" value={summary.absent} />
        <SummaryCard title="Labour Cost (Rs.)" value={summary.cost} />
      </div>

      {/* TODAY TABLE */}
      <div className="bg-white border rounded">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold">Today’s Attendance</h2>
          <button
            onClick={() => navigate("/attendance")}
            className="text-sm text-blue-600 hover:underline"
          >
            Go to Attendance →
          </button>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">Worker</th>
              <th className="p-2">Category</th>
              <th className="p-2">Status</th>
              <th className="p-2">Overtime</th>
            </tr>
          </thead>
          <tbody>
            {todayList.map((w, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{w.name}</td>
                <td className="p-2 text-center">{w.category}</td>
                <td className="p-2 text-center capitalize">{w.status}</td>
                <td className="p-2 text-center">{w.overtime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* QUICK ACTIONS */}
      <div className="flex gap-3">
        <ActionButton
          label="Mark Attendance"
          onClick={() => navigate("/attendance")}
        />
        <ActionButton
          label="Monthly Summary"
          onClick={() => navigate("/workers/summary")}
        />
      </div>
    </div>
  );
}

const SummaryCard = ({ title, value }) => (
  <div className="bg-white border rounded p-4">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-semibold">{value}</p>
  </div>
);

const ActionButton = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
  >
    {label}
  </button>
);
