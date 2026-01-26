import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setLanguage } from '../../store/slices/languageSlice';

const LanguageToggle = () => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const { currentLanguage } = useSelector((state) => state.language);

    const languages = [
        { code: 'en', label: 'ENG', fullLabel: t('language.english') },
        { code: 'ur', label: 'اردو', fullLabel: t('language.urdu') },
        { code: 'both', label: 'ENG + اردو', fullLabel: t('language.both') },
    ];

    const handleLanguageChange = (langCode) => {
        dispatch(setLanguage(langCode));

        // Update i18n language
        if (langCode === 'both') {
            i18n.changeLanguage('en');
        } else {
            i18n.changeLanguage(langCode);
        }
    };

    return (
        <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-lg p-1">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300 whitespace-nowrap
            ${currentLanguage === lang.code
                            ? 'bg-white text-blue-600 shadow-md'
                            : 'text-white hover:bg-white/20'
                        }`}
                >
                    {lang.label}
                </button>
            ))}
        </div>
    );
};

export default LanguageToggle;
