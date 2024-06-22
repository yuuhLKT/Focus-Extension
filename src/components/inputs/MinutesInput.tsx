import classNames from 'classnames';
import { useContext } from 'react';
import { TimeContext } from '../../contexts/TimeContext';
import { handleTimerInputChange } from '../../utils/HandleInput';
import { useTranslation } from 'react-i18next';

export default function MinutesInput() {
    const { minutes, setMinutes } = useContext(TimeContext);
    const { t } = useTranslation();

    return (
        <span className="flex flex-col items-center">
            <input
                type="text"
                value={minutes}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleTimerInputChange(e, setMinutes, 59)
                }
                className={classNames(
                    'w-10 text-center text-2xl outline-none border-none bg-inherit',
                    {
                        'text-gothamBlack-400 dark:text-white': minutes === 0,
                    }
                )}
                maxLength={2}
            />
            <span
                className={classNames('text-xs', {
                    'text-gothamBlack-400 dark:text-white': minutes === 0,
                })}
            >
                {t('minutes')}
            </span>
        </span>
    );
}
