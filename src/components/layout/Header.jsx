import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Clock, User, ChevronDown } from 'lucide-react';
import { logout } from '../../store/slices/authSlice';
import LanguageToggle from '../common/LanguageToggle';

const Header = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { showBoth } = useSelector((state) => state.language);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showUserMenu, setShowUserMenu] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="gradient-bg text-white shadow-lg">
            {/* Top Header Row */}
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Left: Logo + Brand */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                AKS
                            </span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">{t('common.companyName')}</h1>
                            <p className="text-xs text-white/80">{t('common.tagline')}</p>
                        </div>
                    </div>

                    {/* Center: Company Name */}
                    <div className="hidden md:block">
                        <h2 className="text-2xl font-bold text-center">
                            {user?.company?.name || 'AKS Ceramics Factory'}
                        </h2>
                        {showBoth && (
                            <p className="text-sm text-white/90 text-center font-urdu">
                                {user?.company?.nameUrdu || 'اے کے ایس سیرامکس فیکٹری'}
                            </p>
                        )}
                    </div>

                    {/* Right: Time, Language, User */}
                    <div className="flex items-center gap-4">
                        {/* Live Time & Date */}
                        <div className="hidden lg:flex flex-col items-end bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span className="text-lg font-bold font-mono">{formatTime(currentTime)}</span>
                            </div>
                            <span className="text-xs text-white/90">{formatDate(currentTime)}</span>
                        </div>

                        {/* Language Toggle */}
                        <LanguageToggle />

                        {/* User Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 hover:bg-white/20 transition-all"
                            >
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="hidden xl:block text-left">
                                    <p className="text-sm font-medium">{user?.name || 'Admin User'}</p>
                                    <p className="text-xs text-white/80">{user?.role || 'Administrator'}</p>
                                </div>
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            {/* Dropdown Menu */}
                            {showUserMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                                    <button
                                        onClick={() => {
                                            setShowUserMenu(false);
                                            navigate('/profile');
                                        }}
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        {t('common.profile')}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowUserMenu(false);
                                            navigate('/settings');
                                        }}
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        {t('common.settings')}
                                    </button>
                                    <hr className="my-2" />
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        {t('common.logout')}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Close dropdown when clicking outside */}
            {showUserMenu && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                />
            )}
        </div>
    );
};

export default Header;
