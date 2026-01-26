import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AlertTriangle, Info, AlertCircle } from 'lucide-react';

const AlertsPanel = ({ alerts = [] }) => {
    const { t } = useTranslation();
    const { showBoth } = useSelector((state) => state.language);

    const getAlertIcon = (type) => {
        switch (type) {
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
            case 'error':
                return <AlertCircle className="w-5 h-5 text-red-500" />;
            default:
                return <Info className="w-5 h-5 text-blue-500" />;
        }
    };

    return (
        <div className="card-dark h-full">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                {t('dashboard.alerts')}
                {showBoth && <span className="text-sm font-urdu opacity-80">(الارمز / انتباہات)</span>}
            </h3>

            {alerts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-white/60">
                    <Info className="w-12 h-12 mb-3 opacity-50" />
                    <p>{t('dashboard.noAlerts')}</p>
                    {showBoth && <p className="text-sm font-urdu mt-1">کوئی فعال انتباہ نہیں</p>}
                </div>
            ) : (
                <div className="space-y-3">
                    {alerts.map((alert, index) => (
                        <div
                            key={index}
                            className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-start gap-3 hover:bg-white/20 transition-colors"
                        >
                            {getAlertIcon(alert.type)}
                            <div className="flex-1">
                                <p className="text-sm font-medium">{alert.message}</p>
                                {alert.messageUr && showBoth && (
                                    <p className="text-xs font-urdu opacity-80 mt-1">{alert.messageUr}</p>
                                )}
                                <p className="text-xs text-white/60 mt-1">{alert.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AlertsPanel;
