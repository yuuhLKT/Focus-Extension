import { useTranslation } from 'react-i18next';
import { BsBan } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const BlockButton = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/block');
    };

    return (
        <button
            className="flex items-center gap-2 border-2 border-simplyRed-600 bg-simplyRed-600 text-black hover:bg-simplyRed-500 duration-200 font-semibold rounded-md px-3 py-1 text-base whitespace-nowrap max-w-xs dark:border-simplyRed-600/80 dark:bg-simplyRed-600/80 dark:text-white dark:hover:bg-simplyRed-600/90"
            onClick={handleButtonClick}
        >
            <BsBan className="w-5 h-5" />
            <span>{t('block')}</span>
        </button>
    );
};

export default BlockButton;
