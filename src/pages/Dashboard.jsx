import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Wallet, CreditCard, TrendingUp, TrendingDown, Package, Boxes } from 'lucide-react';
import KPICard from '../components/dashboard/KPICard';
import AlertsPanel from '../components/dashboard/AlertsPanel';
import ActivitiesPanel from '../components/dashboard/ActivitiesPanel';

const Dashboard = () => {
    const { t } = useTranslation();
    const { showBoth } = useSelector((state) => state.language);

    // Sample data - will be replaced with API data
    const kpiData = [
        {
            title: t('dashboard.cashInHand'),
            titleUr: 'ہاتھ میں نقد',
            value: 0.00,
            icon: Wallet,
            color: 'blue',
            trend: 0
        },
        {
            title: t('dashboard.bankBalance'),
            titleUr: 'بینک بیلنس',
            value: 0.00,
            icon: CreditCard,
            color: 'purple',
            trend: 0
        },
        {
            title: t('dashboard.receivables'),
            titleUr: 'وصولی',
            value: 0.00,
            icon: TrendingUp,
            color: 'green',
            trend: 0
        },
        {
            title: t('dashboard.payables'),
            titleUr: 'ادائیگی',
            value: 0.00,
            icon: TrendingDown,
            color: 'yellow',
            trend: 0
        },
        {
            title: t('dashboard.stockValue'),
            titleUr: 'اسٹاک ویلیو',
            value: 0.00,
            icon: Boxes,
            color: 'indigo',
            trend: 0
        },
        {
            title: t('dashboard.finishedItems'),
            titleUr: 'تیار اشیاء',
            value: 0.00,
            icon: Package,
            color: 'red',
            trend: 0
        },
    ];

    const sampleAlerts = [];
    const sampleActivities = [];

    return (
        <div className="min-h-screen gradient-bg py-8">
            <div className="container mx-auto px-6">
                {/* Page Title */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        {t('dashboard.title')}
                    </h1>
                    {showBoth && (
                        <p className="text-white/80 font-urdu mt-1">ڈیش بورڈ - آج کا جائزہ</p>
                    )}
                </div>

                {/* KPI Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {kpiData.map((kpi, index) => (
                        <KPICard
                            key={index}
                            title={kpi.title}
                            titleUr={kpi.titleUr}
                            value={kpi.value}
                            icon={kpi.icon}
                            color={kpi.color}
                            trend={kpi.trend}
                        />
                    ))}
                </div>

                {/* Alerts and Activities Panels */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AlertsPanel alerts={sampleAlerts} />
                    <ActivitiesPanel activities={sampleActivities} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
