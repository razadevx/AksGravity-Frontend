import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TrendingUp, TrendingDown } from 'lucide-react';

const KPICard = ({ title, titleUr, value, currency = 'Rs.', icon: Icon, trend, color = 'blue' }) => {
    const { showBoth } = useSelector((state) => state.language);
    const { t } = useTranslation();

    const colorClasses = {
        blue: 'from-blue-500 to-blue-600',
        purple: 'from-purple-500 to-purple-600',
        green: 'from-green-500 to-green-600',
        yellow: 'from-yellow-500 to-yellow-600',
        red: 'from-red-500 to-red-600',
        indigo: 'from-indigo-500 to-indigo-600',
    };

    return (
        <div className="card-dark group cursor-pointer">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-sm font-medium text-white/80 mb-1">
                        {title}
                    </h3>
                    {showBoth && titleUr && (
                        <p className="text-xs text-white/70 font-urdu">{titleUr}</p>
                    )}
                </div>
                {Icon && (
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                )}
            </div>

            <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">
                    {currency} {value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
            </div>

            {trend && (
                <div className={`flex items-center gap-1 mt-2 text-sm ${trend > 0 ? 'text-green-300' : 'text-red-300'}`}>
                    {trend > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span>{Math.abs(trend)}% from last month</span>
                </div>
            )}
        </div>
    );
};

export default KPICard;
