import DashboardLayout from "../components/dashboard/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
import QuickActions from "../components/dashboard/QuickActions";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import ProductionSummary from "../components/dashboard/ProductionSummary";
import { useLang } from "../i18n/LanguageContext";
import { translate as tr } from "../i18n/translate";

export default function Dashboard() {
  const { lang } = useLang();

  return (
    // ✅ Force LTR layout even in Urdu
    <div dir="ltr">
      <DashboardLayout>
        {/* Title */}
        <h2 className="text-3xl font-bold mb-8 tracking-tight flex items-center gap-2">
          📊 {tr("dashboard.title", lang)}
        </h2>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title={tr("dashboard.cashInHand", lang)}
            value="Rs. 0"
            color="bg-green-500"
            icon="💰"
          />
          <StatCard
            title={tr("dashboard.bankBalance", lang)}
            value="Rs. 0"
            color="bg-blue-500"
            icon="🏦"
          />
          <StatCard
            title={tr("dashboard.receivables", lang)}
            value="Rs. 0"
            color="bg-purple-500"
            icon="📈"
          />
          <StatCard
            title={tr("dashboard.payables", lang)}
            value="Rs. 0"
            color="bg-red-500"
            icon="📉"
          />
          <StatCard
            title={tr("dashboard.stockValue", lang)}
            value="Rs. 0"
            color="bg-orange-500"
            icon="📦"
          />
          <StatCard
            title={tr("dashboard.finishedItems", lang)}
            value="0"
            color="bg-indigo-500"
            icon="🏭"
          />
        </div>

        {/* Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProductionSummary />
          <QuickActions />
          <ActivityFeed />
        </div>
      </DashboardLayout>
    </div>
  );
}
