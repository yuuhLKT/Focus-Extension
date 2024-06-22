import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsArrowReturnLeft, BsBan } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { formatUrl, validateUrl } from '../../utils/HandleInput';

type BlockInputProps = {
    onAddBlockPage: (url: string) => void;
    addedUrls: string[];
};

export const BlockInput = ({ onAddBlockPage, addedUrls }: BlockInputProps) => {
    const { t } = useTranslation();
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleReturnPopup = () => {
        navigate('/focus');
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let url = (e.currentTarget as HTMLFormElement).url.value.trim();

        if (!url) {
            setError(t('nullUrl'));
            setTimeout(() => setError(null), 2000);
            return;
        }

        if (!validateUrl(url)) {
            setError(t('invalidUrl'));
            setTimeout(() => setError(null), 3000);
            return;
        }

        url = formatUrl(url);

        if (addedUrls.includes(url)) {
            setError(t('repeatedUrl'));
            setTimeout(() => setError(null), 2000);
            return;
        }

        setError(null);
        onAddBlockPage(url);
        e.currentTarget.reset();
    };

    return (
        <div className="flex items-center space-x-3 relative">
            <div className="flex items-center space-x-3">
                <BsArrowReturnLeft
                    onClick={handleReturnPopup}
                    className="cursor-pointer"
                    size={22}
                />
            </div>
            <div className="w-full">
                <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <BsBan className="w-5 h-5 text-gothamBlack-500" />
                        </div>
                        <input
                            type="text"
                            id="url"
                            className="block w-full box-border p-1 ps-10 text-sm text-gothamBlack-900 border border-gothamBlack-300 rounded-lg bg-oceanBlue-50 focus:border-oceanBlue-500 dark:border-gothamBlack-600 dark:placeholder-gothamBlack-300 dark:text-black "
                            placeholder="ex. youtube.com"
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-oceanBlue-600 hover:bg-oceanBlue-700 font-medium rounded-lg text-xs h-8 px-1 dark:bg-oceanBlue-600 dark:hover:bg-oceanBlue-700"
                    >
                        Block
                    </button>
                </form>
                {error && (
                    <div className="text-[10px] text-red-600 dark:text-red-400 absolute">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};
