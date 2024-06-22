import classNames from 'classnames';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { BsRepeat } from 'react-icons/bs';
import { ActionContext } from '../../contexts/ActionContext';

export default function ResetButton() {
    const { handleReset } = useContext(ActionContext);
    const { t } = useTranslation();

    return (
        <button
            onClick={handleReset}
            className={classNames(
                'flex flex-row items-center gap-1 border-2 duration-200 font-semibold rounded-md px-2 py-1 text-lg h-[36px]',
                'border-solid border-indigo-600 bg-indigo-400 text-black hover:bg-indigo-200 dark:bg-indigo-500 dark:border-indigo-700 dark:hover:bg-indigo-400 dark:hover:border-indigo-600'
            )}
        >
            <BsRepeat className="w-5 h-5" />
            <div className="-mt-0.5">{t('reset')}</div>
        </button>
    );
}
