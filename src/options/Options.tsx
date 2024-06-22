import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Copyright from '../components/Copyright';
import Switch from '../components/SwitchToggle';
import { useDarkMode } from '../contexts/DarkModeContext';

export const OptionsContent = () => {
    const { isDarkMode, setDarkMode } = useDarkMode();
    const [playAudio, setPlayAudio] = useState<boolean>(true);
    const [isConfettiEnabled, setConfettiEnabled] = useState<boolean>(true);

    const { t } = useTranslation();
    const darkModeText = isDarkMode ? t('disableDarkMode') : t('enableDarkMode');

    useEffect(() => {
        chrome?.storage?.local.get(['bools', 'confettiEnabled'], (result) => {
            if (result.bools?.playAudio !== undefined) {
                setPlayAudio(result.bools.playAudio);
            }
            if (result.confettiEnabled !== undefined) {
                setConfettiEnabled(result.confettiEnabled);
            }
        });
    }, []);

    useEffect(() => {
        chrome?.storage?.local.get(['bools'], (result) => {
            const bools = result.bools || {};
            bools.playAudio = playAudio;

            chrome?.storage?.local.set({
                bools,
                confettiEnabled: isConfettiEnabled,
            });
        });
    }, [playAudio, isConfettiEnabled]);

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gothamBlack-50 dark:bg-gothamBlack-600 font-inter">
            <div className="flex flex-col w-full max-w-3xl space-y-4 rounded-2xl bg-gothamBlack-100 p-8 text-lg text-black dark:bg-gothamBlack-300">
                <div className="font-bold dark:text-white">
                    <Switch
                        checked={isDarkMode}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setDarkMode(e.target.checked)
                        }
                        label={`${darkModeText} ${isDarkMode ? '☀️' : '🌙'}`}
                        size={24}
                    />
                    <Switch
                        checked={playAudio}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPlayAudio(e.target.checked)
                        }
                        label={`${t('audioOptions')} ${playAudio ? '🔊' : '🔇'}`}
                        size={24}
                    />
                    <Switch
                        checked={isConfettiEnabled}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setConfettiEnabled(e.target.checked)
                        }
                        label={`${t('confettiEnabled')} ${isConfettiEnabled ? '🎉' : ''}`}
                        size={24}
                    />
                    <div className="flex items-center justify-center">
                        <Copyright />
                    </div>
                </div>
            </div>
        </div>
    );
};
