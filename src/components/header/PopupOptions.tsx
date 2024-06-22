import {
    BsFillMoonFill,
    BsFillSunFill,
    BsFillVolumeDownFill,
    BsFillVolumeMuteFill,
} from 'react-icons/bs';
import { TbConfetti, TbConfettiOff } from 'react-icons/tb';
import { useDarkMode } from '../../contexts/DarkModeContext';

interface PopupOptionsProps {
    playAudio: boolean;
    setPlayAudio: (value: boolean) => void;
    isConfettiEnabled: boolean;
    toggleConfetti: () => void;
}

export default function PopupOptions({
    playAudio,
    setPlayAudio,
    isConfettiEnabled,
    toggleConfetti,
}: PopupOptionsProps): JSX.Element {
    const { isDarkMode, setDarkMode } = useDarkMode();

    return (
        <div className="w-20 flex flex-col items-center justify-center flex-grow-0 ml-72 -mt-32">
            <div className="w-12 h-12 mt-3 -mb-2 flex justify-center items-center cursor-pointer">
                {playAudio ? (
                    <BsFillVolumeDownFill
                        className="w-8 h-8"
                        onClick={() => setPlayAudio(!playAudio)}
                    />
                ) : (
                    <BsFillVolumeMuteFill
                        className="w-8 h-8"
                        onClick={() => setPlayAudio(!playAudio)}
                    />
                )}
            </div>
            <div className="w-8 h-8 flex justify-center items-center cursor-pointer">
                {isDarkMode ? (
                    <BsFillSunFill className="mr-1" onClick={() => setDarkMode(!isDarkMode)} />
                ) : (
                    <BsFillMoonFill
                        className="mr-1 w-6 h-6"
                        onClick={() => setDarkMode(!isDarkMode)}
                    />
                )}
            </div>
            <div className="w-8 h-8 mr-1 mt-1 flex justify-center items-center cursor-pointer">
                {isConfettiEnabled ? (
                    <TbConfetti
                        onClick={() => {
                            toggleConfetti();
                        }}
                    />
                ) : (
                    <TbConfettiOff
                        onClick={() => {
                            toggleConfetti();
                        }}
                    />
                )}
            </div>
        </div>
    );
}
