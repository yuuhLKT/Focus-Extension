import { useTranslation } from 'react-i18next';

const App = () => {
    const { t } = useTranslation();

    return (
        <div className="font-inter flex flex-col justify-center items-center bg-gothamBlack-600 h-screen w-screen z-[2147483648] overflow-hidden space-y-10">
            <span className="text-simplyRed-400 text-6xl">{t('focusModeMessage')}</span>
            <span className="text-white text-4xl">{t('temporarilyBlocked')}</span>
        </div>
    );
};

export default App;
