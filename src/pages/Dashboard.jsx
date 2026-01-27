import DashboardLayout from "../components/dashboard/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
import QuickActions from "../components/dashboard/QuickActions";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import ProductionSummary from "../components/dashboard/ProductionSummary";

export default function Dashboard() {
  return (
    <DashboardLayout>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-6">Dashboard - Today's Overview</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard title="Cash in Hand" value="Rs. 0" color="bg-green-500" icon="💰" />
        <StatCard title="Bank Balance" value="Rs. 0" color="bg-blue-500" icon="🏦" />
        <StatCard title="Receivables" value="Rs. 0" color="bg-purple-500" icon="📊" />
        <StatCard title="Payables" value="Rs. 0" color="bg-red-500" icon="📉" />
        <StatCard title="Stock Value" value="Rs. 0" color="bg-orange-500" icon="📦" />
        <StatCard title="Finished Items" value="0" color="bg-indigo-500" icon="🏭" />
      </div>

      {/* Bottom Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProductionSummary />
        <QuickActions />
        <ActivityFeed />
      </div>

    </DashboardLayout>
  );
}
