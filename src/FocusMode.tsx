import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionContext } from './contexts/ActionContext';
import { TimeContext } from './contexts/TimeContext';

/* Components Imports */
import Confetti from './components/Confetti';
import Copyright from './components/Copyright';
import LanguageSelector from './components/LanguageSelector';
import PauseButton from './components/buttons/PauseButton';
import ResetButton from './components/buttons/ResetButton';
import StartButton from './components/buttons/StartButton';
import Heading from './components/header';
import HoursInput from './components/inputs/HoursInput';
import MinutesInput from './components/inputs/MinutesInput';
import SecondsInput from './components/inputs/SecondsInput';

export default function FocusMode() {
    const [playAudio, setPlayAudio] = useState<boolean>(true);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [isConfettiEnabled, setConfettiEnabled] = useState<boolean>(true);
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);

    const { t } = useTranslation();

    useEffect(() => {
        if (chrome?.storage?.local) {
            chrome.storage.local.get(['confettiEnabled', 'timer', 'bools'], (result) => {
                if (result.bools?.playAudio !== undefined) {
                    setPlayAudio(result.bools.playAudio);
                }
                if (result.confettiEnabled !== undefined) {
                    setConfettiEnabled(result.confettiEnabled);
                }
                if (result.timer) {
                    setHours(result.timer.hours);
                    setMinutes(result.timer.minutes);
                    setSeconds(result.timer.seconds);
                }
                if (result.bools) {
                    setIsRunning(result.bools.isRunning);
                    setIsPaused(result.bools.isPaused);
                    setIsFinished(result.bools.isFinished);
                }
            });
        }
    }, []);

    useEffect(() => {
        if (chrome?.storage?.local) {
            chrome.storage.local.set({
                confettiEnabled: isConfettiEnabled,
                timer: { hours, minutes, seconds },
                bools: { isRunning, isPaused, isFinished, playAudio },
            });
        }
    }, [playAudio, isConfettiEnabled, hours, minutes, seconds, isRunning, isPaused, isFinished]);

    const toggleConfetti = () => {
        const newConfettiState = !isConfettiEnabled;
        setConfettiEnabled(newConfettiState);
        chrome.storage.local.set({ confettiEnabled: newConfettiState });
    };

    const playSound = () => {
        const audio = new Audio('audio.wav');
        audio.volume = 0.1;
        audio.play();
    };

    const handleStart = () => {
        setIsRunning(true);
        setIsPaused(false);
        setIsFinished(false);

        if (chrome?.storage?.local) {
            chrome.storage.local.set({
                bools: {
                    isRunning: true,
                    isPaused: false,
                    isFinished: false,
                    playAudio: playAudio,
                },
                timer: {
                    hours: Number(hours),
                    minutes: Number(minutes),
                    seconds: Number(seconds),
                },
            });
        }
    };

    const handlePause = () => {
        setIsRunning(false);
        setIsPaused(true);
        setIsFinished(false);

        if (chrome?.storage?.local) {
            chrome.storage.local.set({
                bools: {
                    isRunning: false,
                    isPaused: true,
                    isFinished: false,
                    playAudio: playAudio,
                },
                timer: {
                    hours: Number(hours),
                    minutes: Number(minutes),
                    seconds: Number(seconds),
                },
            });
        }
    };

    const handleReset = () => {
        setIsRunning(false);
        setIsPaused(false);
        setIsFinished(false);
        setHours(0);
        setMinutes(0);
        setSeconds(0);

        if (chrome?.storage?.local) {
            chrome.storage.local.set({
                bools: {
                    isRunning: false,
                    isPaused: false,
                    isFinished: false,
                    playAudio: playAudio,
                },
                timer: {
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                },
            });
        }
    };

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        const handleFinish = () => {
            if (playAudio) playSound();
            setIsRunning(false);
            setIsPaused(false);
            setIsFinished(true);

            if (isConfettiEnabled) {
                Confetti.launch();
            }

            if (chrome?.storage?.local) {
                chrome.storage.local.set({
                    bools: {
                        isRunning: false,
                        isPaused: false,
                        isFinished: true,
                        playAudio: playAudio,
                    },
                });
            }
        };

        if (isRunning && !isPaused) {
            if (seconds > 0) {
                timerId = setTimeout(() => setSeconds(seconds - 1), 1000);
            } else if (seconds === 0 && minutes > 0) {
                setSeconds(59);
                setMinutes(minutes - 1);
            } else if (seconds === 0 && minutes === 0 && hours > 0) {
                setSeconds(59);
                setMinutes(59);
                setHours(hours - 1);
            } else {
                handleFinish();
            }
        }

        return () => clearTimeout(timerId);
    }, [isRunning, hours, minutes, seconds, isPaused, isConfettiEnabled, playAudio]);

    const timeProps = {
        hours,
        setHours,
        minutes,
        setMinutes,
        seconds,
        setSeconds,
    };

    const buttonProps = {
        handleStart,
        handlePause,
        handleReset,
        isRunning,
        isPaused,
    };

    return (
        <div className="min-w-[360px] h-[320px] max-w-sm mx-auto flex flex-col items-center justify-center p-3 font-inter bg-gothamBlack-50 dark:bg-gothamBlack-400 dark:text-white">
            <div className="relative right-[132px] -top-2">
                <LanguageSelector />
            </div>
            <Heading
                title="Focus Mode"
                playAudio={playAudio}
                setPlayAudio={setPlayAudio}
                isConfettiEnabled={isConfettiEnabled}
                toggleConfetti={toggleConfetti}
            />

            <div className="flex flex-col gap-1 w-full text-center mb-3">
                <label htmlFor="time" className="text-sm font-semibold">
                    {t('question')}
                </label>
                <div className="flex flex-row items-center justify-center gap-4 border-gothamBlack-200 dark:border-gothamBlack-100 border w-full rounded-md p-2 text-lg font-semibold">
                    <TimeContext.Provider value={timeProps}>
                        <HoursInput />
                        <MinutesInput />
                        <SecondsInput />
                    </TimeContext.Provider>
                </div>
            </div>

            <div className="flex items-center justify-center gap-3 w-full mt-1">
                <ActionContext.Provider value={buttonProps}>
                    <StartButton />
                    <PauseButton />
                    <ResetButton />
                </ActionContext.Provider>
            </div>

            <Copyright />
        </div>
    );
}
