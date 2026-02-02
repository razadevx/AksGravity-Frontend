import { useEffect, useState } from "react";
import api from "../../services/api";

const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM

export default function MonthlySummary() {
  const [month, setMonth] = useState(currentMonth);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSummary();
  }, [month]);

  const loadSummary = async () => {
    try {
      setLoading(true);

      // Load workers
      const workersRes = await api.get("/workers");
      const workers = workersRes.data;

      // Load attendance for whole month
      const attendanceRes = await api.get(
        `/worker-attendance?month=${month}`
      );

      const attendance = attendanceRes.data;

      // Group attendance by worker
      const attendanceMap = {};
      attendance.forEach((a) => {
        const id = a.workerId._id;
        if (!attendanceMap[id]) attendanceMap[id] = [];
        attendanceMap[id].push(a);
      });

      const summary = workers.map((w) => {
        const records = attendanceMap[w._id] || [];

        const presentDays = records.filter(
          (r) => r.status === "present"
        ).length;

        const absentDays = records.filter(
          (r) => r.status === "absent"
        ).length;

        const overtimeHours = records.reduce(
          (sum, r) => sum + (r.overtimeHours || 0),
          0
        );

        const payable =
          presentDays * w.dailyWage; // overtime later

        return {
          name: w.name,
          category: w.categoryId?.name || "-",
          presentDays,
          absentDays,
          overtimeHours,
          payable,
        };
      });

      setRows(summary);
    } catch (err) {
      console.error("Monthly summary error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">
        Monthly Worker Summary
      </h1>

      {/* Month Selector */}
      <div>
        <label className="mr-2 font-medium">Month:</label>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border px-2 py-1 rounded"
        />
      </div>

      {/* Table */}
      <div className="bg-white border rounded overflow-x-auto">
        {loading ? (
          <div className="p-4 text-gray-500">Loading...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left">Worker</th>
                <th className="p-2">Category</th>
                <th className="p-2">Present</th>
                <th className="p-2">Absent</th>
                <th className="p-2">Overtime (hrs)</th>
                <th className="p-2 text-right">Payable (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="p-4 text-center text-gray-500"
                  >
                    No data found
                  </td>
                </tr>
              ) : (
                rows.map((r, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2">{r.name}</td>
                    <td className="p-2 text-center">{r.category}</td>
                    <td className="p-2 text-center">{r.presentDays}</td>
                    <td className="p-2 text-center">{r.absentDays}</td>
                    <td className="p-2 text-center">{r.overtimeHours}</td>
                    <td className="p-2 text-right font-semibold">
                      {r.payable.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <p className="text-sm text-gray-500">
        * Payable amount is calculated from attendance only.
      </p>
    </div>
  );
}
