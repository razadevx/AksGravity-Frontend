import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    Home,
    LayoutDashboard,
    Database,
    Users,
    Wallet,
    CreditCard,
    Layers,
    Package,
    FileText,
} from 'lucide-react';

const Navigation = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const { showBoth } = useSelector((state) => state.language);

    const navItems = [
        { path: '/', label: t('nav.home'), labelUr: 'ہوم', icon: Home },
        { path: '/dashboard', label: t('nav.dashboard'), labelUr: 'ڈیش بورڈ', icon: LayoutDashboard },
        { path: '/master-data', label: t('nav.masterData'), labelUr: 'ماسٹر ڈیٹا', icon: Database },
        { path: '/workers', label: t('nav.workers'), labelUr: 'کارکنان', icon: Users },
        { path: '/cash-register', label: t('nav.dailyCashRegister'), labelUr: 'کیش رجسٹر', icon: Wallet },
        { path: '/bank-cheques', label: t('nav.bankCheques'), labelUr: 'بینک اور چیک', icon: CreditCard },
        { path: '/composition', label: t('nav.compositionManager'), labelUr: 'کمپوزیشن', icon: Layers },
        { path: '/production', label: t('nav.production'), labelUr: 'پیداوار', icon: Package },
        { path: '/reports', label: t('nav.reports'), labelUr: 'رپورٹس', icon: FileText },
    ];

    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className="gradient-bg border-t border-white/10">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-center gap-2 py-3 overflow-x-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);

                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`nav-button flex items-center gap-2 ${active ? 'nav-button-active' : ''}`}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="whitespace-nowrap">{item.label}</span>
                                {showBoth && (
                                    <span className="text-xs font-urdu opacity-80">({item.labelUr})</span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Navigation;
