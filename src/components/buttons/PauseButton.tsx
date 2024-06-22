import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { BsPauseFill } from 'react-icons/bs';
import { ActionContext } from '../../contexts/ActionContext';

export default function PauseButton() {
    const { handlePause, isRunning, isPaused } = useContext(ActionContext);
    const { t } = useTranslation();

    return (
        <button
            onClick={handlePause}
            className={classNames(
                'flex flex-row items-center gap-1 border-2 duration-200 font-semibold rounded-md px-2 py-1 text-lg ',
                {
                    ' border-simplyRed-600 bg-simplyRed-50 text-gothamBlack-200 hover:bg-simplyRed-50 cursor-not-allowed dark:bg-simplyRed-100':
                        !isRunning,
                },
                {
                    'border-solid border-purple-700 bg-purple-400 text-black hover:bg-purple-100 dark:bg-purple-600 dark:border-purple-800 dark:hover:bg-purple-500 dark:hover:border-purple-700':
                        isRunning && !isPaused,
                }
            )}
        >
            <BsPauseFill className="w-5 h-5" />
            <div className="-mt-0.5">{t('pause')}</div>
        </button>
    );
}
