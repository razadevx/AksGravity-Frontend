import { useEffect, useState } from "react";
import { Users, CalendarCheck, CalendarX, Wallet, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const today = new Date().toISOString().split("T")[0];

export default function WorkerDashboard() {
  const navigate = useNavigate();

  const [workers, setWorkers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // 1️⃣ Load workers
      const workersRes = await api.get("/workers");
      const workersList = Array.isArray(workersRes.data)
        ? workersRes.data
        : workersRes.data.workers || [];

      // 2️⃣ Load today's attendance
      const attendanceRes = await api.get(
        `/worker-attendance?date=${today}`
      );

      setWorkers(workersList);
      setAttendance(attendanceRes.data || []);
    } catch (err) {
      console.error("Failed to load worker dashboard", err);
    } finally {
      setLoading(false);
    }
  };

  // 📊 CALCULATIONS
  const totalWorkers = workers.length;

  const presentToday = attendance.filter(
    (a) => a.status === "present" || a.status === "half-day"
  ).length;

  const absentToday = attendance.filter(
    (a) => a.status === "absent"
  ).length;

  const labourCost = attendance.reduce((sum, a) => {
    const dailyWage = a.workerId?.dailyWage || 0;

    if (a.status === "present") return sum + dailyWage;
    if (a.status === "half-day") return sum + dailyWage / 2;

    return sum;
  }, 0);

  return (
      <div className="max-w-7xl mx-auto px-0 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Workers Dashboard
        </h1>

        {/* ===== STATS ===== */}
        {loading ? (
          <div className="text-gray-500">Loading dashboard...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Workers"
                value={totalWorkers}
                icon={<Users />}
                color="bg-indigo-600"
              />
              <StatCard
                title="Present Today"
                value={presentToday}
                icon={<CalendarCheck />}
                color="bg-green-600"
              />
              <StatCard
                title="Absent Today"
                value={absentToday}
                icon={<CalendarX />}
                color="bg-red-500"
              />
              <StatCard
                title="Labour Cost (Rs.)"
                value={labourCost}
                icon={<Wallet />}
                color="bg-purple-600"
              />
            </div>

            {/* ===== ATTENDANCE TABLE ===== */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-800">
                  Today’s Attendance
                </h2>

                <button
                  onClick={() => navigate("/attendance")}
                  className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                >
                  Go to Attendance <ArrowRight size={16} />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="text-left px-6 py-3">Worker</th>
                      <th className="text-left px-6 py-3">Category</th>
                      <th className="text-left px-6 py-3">Status</th>
                      <th className="text-left px-6 py-3">Overtime</th>
                    </tr>
                  </thead>

                  <tbody>
                    {attendance.length === 0 ? (
                      <tr>
                        <td
                          colSpan="4"
                          className="px-6 py-6 text-center text-gray-500"
                        >
                          No attendance marked today
                        </td>
                      </tr>
                    ) : (
                      attendance.map((a) => (
                        <tr
                          key={a._id}
                          className="border-t hover:bg-gray-50 transition"
                        >
                          <td className="px-6 py-3 font-medium">
                            {a.workerId?.name}
                          </td>
                          <td className="px-6 py-3">
                            {a.workerId?.categoryId?.name || "-"}
                          </td>
                          <td className="px-6 py-3">
                            <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                              {a.status}
                            </span>
                          </td>
                          <td className="px-6 py-3">
                            {a.overtimeHours || 0}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* ===== ACTION BUTTONS ===== */}
              <div className="flex gap-4 px-6 py-4 border-t bg-gray-50">
                <button
                  onClick={() => navigate("/attendance")}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Mark Attendance
                </button>

                <button
                  onClick={() => navigate("/workers/monthly-summary")}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Monthly Summary
                </button>
              </div>
            </div>
          </>
        )}
      </div>
  );
}

/* ===== STAT CARD ===== */

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
      </div>

      <div
        className={`w-12 h-12 ${color} text-white rounded-lg flex items-center justify-center`}
      >
        {icon}
      </div>
    </div>
  );
}
