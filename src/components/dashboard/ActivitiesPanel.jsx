import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Activity, CheckCircle, Clock } from 'lucide-react';

const ActivitiesPanel = ({ activities = [] }) => {
    const { t } = useTranslation();
    const { showBoth } = useSelector((state) => state.language);

    return (
        <div className="card-dark h-full">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                {t('dashboard.todayActivities')}
                {showBoth && <span className="text-sm font-urdu opacity-80">(آج کی سرگرمیاں)</span>}
            </h3>

            {activities.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-white/60">
                    <Clock className="w-12 h-12 mb-3 opacity-50" />
                    <p>{t('dashboard.noActivities')}</p>
                    {showBoth && <p className="text-sm font-urdu mt-1">ابھی تک کوئی سرگرمی ریکارڈ نہیں</p>}
                </div>
            ) : (
                <div className="space-y-3">
                    {activities.map((activity, index) => (
                        <div
                            key={index}
                            className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-start gap-3 hover:bg-white/20 transition-colors"
                        >
                            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">{activity.description}</p>
                                {activity.descriptionUr && showBoth && (
                                    <p className="text-xs font-urdu opacity-80 mt-1">{activity.descriptionUr}</p>
                                )}
                                <div className="flex items-center gap-3 mt-1">
                                    <p className="text-xs text-white/60">{activity.time}</p>
                                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded">{activity.user}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ActivitiesPanel;
