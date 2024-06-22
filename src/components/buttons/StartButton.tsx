import classNames from 'classnames';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { BsFillPlayFill } from 'react-icons/bs';
import { ActionContext } from '../../contexts/ActionContext';

export default function StartButton() {
    const { handleStart, isRunning } = useContext(ActionContext);
    const { t } = useTranslation();

    return (
        <button
            onClick={handleStart}
            className={classNames(
                'flex flex-row items-center gap-1 border-2 duration-200 font-semibold rounded-md px-2 py-1 text-lg ',
                {
                    ' border-simplyRed-600 bg-simplyRed-50 text-gothamBlack-200 hover:bg-simplyRed-50 cursor-not-allowed dark:bg-simplyRed-100':
                        isRunning,
                },
                {
                    'border-solid border-emeraldGreen-800 bg-emeraldGreen-500 text-black hover:bg-emeraldGreen-200 dark:bg-emeraldGreen-700 dark:border-emeraldGreen-800 dark:hover:bg-emeraldGreen-600 dark:hover:border-emeraldGreen-700':
                        !isRunning,
                }
            )}
        >
            <BsFillPlayFill className="w-5 h-5" />
            <div className="-mt-0.5">{t('run')}</div>
        </button>
    );
}
