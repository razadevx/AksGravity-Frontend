import { useEffect, useState } from "react";
import {
  Users,
  CalendarCheck,
  CalendarX,
  Clock,
  Wallet,
} from "lucide-react";
import api from "../../services/api";
import MainHeader from "../../components/layout/MainHeader";

const currentMonth = new Date().toISOString().slice(0, 7);

export default function MonthlyWorkerSummary() {
  const [month, setMonth] = useState(currentMonth);
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSummary();
  }, [month]);

  const loadSummary = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/worker-attendance?month=${month}`);
      const records = res.data || [];

      const map = {};

      records.forEach((a) => {
        const w = a.workerId;
        if (!w) return;

        if (!map[w._id]) {
          map[w._id] = {
            id: w._id,
            name: w.name,
            dailyWage: w.dailyWage || 0,
            present: 0,
            halfDay: 0,
            absent: 0,
            overtime: 0,
            payable: 0,
          };
        }

        if (a.status === "present") {
          map[w._id].present += 1;
          map[w._id].payable += map[w._id].dailyWage;
        }

        if (a.status === "half-day") {
          map[w._id].halfDay += 1;
          map[w._id].payable += map[w._id].dailyWage / 2;
        }

        if (a.status === "absent") {
          map[w._id].absent += 1;
        }

        map[w._id].overtime += a.overtimeHours || 0;
      });

      setSummary(Object.values(map));
    } catch (err) {
      console.error("Failed to load monthly summary", err);
    } finally {
      setLoading(false);
    }
  };

  /* ===== OVERALL STATS ===== */
  const totalWorkers = summary.length;
  const totalPresent = summary.reduce((s, w) => s + w.present, 0);
  const totalAbsent = summary.reduce((s, w) => s + w.absent, 0);
  const totalOvertime = summary.reduce((s, w) => s + w.overtime, 0);
  const totalPayable = summary.reduce((s, w) => s + w.payable, 0);

  return (
    <>
      <MainHeader />

      <div className="min-h-screen bg-gray-50 px-6 py-6">
        {/* ===== PAGE HEADER ===== */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Monthly Worker Summary
          </h1>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-600">
              Select Month
            </label>
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="border rounded-lg px-3 py-1 bg-white shadow-sm"
            />
          </div>
        </div>

        {/* ===== SUMMARY CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
          <SummaryCard title="Workers" value={totalWorkers} icon={<Users />} />
          <SummaryCard
            title="Present Days"
            value={totalPresent}
            icon={<CalendarCheck />}
            color="bg-green-600"
          />
          <SummaryCard
            title="Absent Days"
            value={totalAbsent}
            icon={<CalendarX />}
            color="bg-red-500"
          />
          <SummaryCard
            title="Overtime Hours"
            value={totalOvertime}
            icon={<Clock />}
            color="bg-blue-600"
          />
          <SummaryCard
            title="Total Payable (Rs.)"
            value={Math.round(totalPayable)}
            icon={<Wallet />}
            color="bg-purple-600"
          />
        </div>

        {/* ===== TABLE ===== */}
        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              Worker Breakdown
            </h2>
          </div>

          {loading ? (
            <div className="p-6 text-gray-500">Loading summary...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left">Worker</th>
                    <th className="px-4 py-3 text-center">Present</th>
                    <th className="px-4 py-3 text-center">Half</th>
                    <th className="px-4 py-3 text-center">Absent</th>
                    <th className="px-4 py-3 text-center">Overtime</th>
                    <th className="px-4 py-3 text-center">Payable (Rs.)</th>
                  </tr>
                </thead>

                <tbody>
                  {summary.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-6 text-center text-gray-500"
                      >
                        No attendance data for this month
                      </td>
                    </tr>
                  ) : (
                    summary.map((w) => (
                      <tr
                        key={w.id}
                        className="border-t hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-3 font-medium">{w.name}</td>
                        <td className="px-4 py-3 text-center">{w.present}</td>
                        <td className="px-4 py-3 text-center">{w.halfDay}</td>
                        <td className="px-4 py-3 text-center">{w.absent}</td>
                        <td className="px-4 py-3 text-center">{w.overtime}</td>
                        <td className="px-4 py-3 text-center font-semibold text-green-700">
                          {Math.round(w.payable)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ===== SUMMARY CARD ===== */

function SummaryCard({ title, value, icon, color = "bg-indigo-600" }) {
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
