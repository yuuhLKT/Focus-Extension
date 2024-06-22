import BlockButton from '../buttons/BlockButton';
import PopupOptions from './PopupOptions';

interface HeadingProps {
    title: string;
    playAudio: boolean;
    isConfettiEnabled: boolean;
    setPlayAudio: (value: boolean) => void;
    toggleConfetti: () => void;
}

export default function Heading({
    title,
    playAudio,
    setPlayAudio,
    isConfettiEnabled,
    toggleConfetti,
}: HeadingProps): JSX.Element {
    return (
        <div className="text-3xl font-bold mb-8 -mt-4 flex flex-col items-center relative">
            <div className="flex items-center justify-start">{title}</div>
            <div className="mt-4 mb-2">
                <BlockButton />
            </div>
            <PopupOptions
                playAudio={playAudio}
                setPlayAudio={setPlayAudio}
                isConfettiEnabled={isConfettiEnabled}
                toggleConfetti={toggleConfetti}
            />
        </div>
    );
}
