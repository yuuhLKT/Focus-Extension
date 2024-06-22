import classNames from 'classnames';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { TimeContext } from '../../contexts/TimeContext';
import { handleTimerInputChange } from '../../utils/HandleInput';

export default function HoursInput() {
    const { hours, setHours } = useContext(TimeContext);
    const { t } = useTranslation();

    return (
        <span className="flex flex-col items-center">
            <input
                type="text"
                value={hours}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleTimerInputChange(e, setHours, 47)
                }
                className={classNames(
                    'w-10 text-center text-2xl outline-none border-none bg-inherit',
                    {
                        'text-gothamBlack-400 dark:text-white': hours === 0,
                    }
                )}
                maxLength={2}
            />
            <span
                className={classNames('text-xs', {
                    'text-gothamBlack-400 dark:text-white': hours === 0,
                })}
            >
                {t('hours')}
            </span>
        </span>
    );
}
