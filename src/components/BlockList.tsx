import React, { useState } from 'react';
import { BsCheck, BsFillPencilFill, BsFillTrash3Fill, BsX } from 'react-icons/bs';
import { formatUrl, validateUrl } from '../utils/HandleInput';

type BlockListProps = {
    urls: string[];
    onUpdateUrls: (urls: string[]) => void;
};

const BlockList = ({ urls, onUpdateUrls }: BlockListProps) => {
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editedValue, setEditedValue] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleDelete = (url: string) => {
        const updatedUrls = urls.filter((item) => item !== url);
        chrome.storage.local.set({ blockPages: updatedUrls }, () => {
            onUpdateUrls(updatedUrls);
        });
    };

    const handleEdit = (index: number) => {
        setEditedValue(urls[index]);
        setEditIndex(index);
    };

    const handleSaveEdit = () => {
        let formattedValue = editedValue.trim();
        formattedValue = formatUrl(formattedValue);

        if (!validateUrl(formattedValue) || !formattedValue.endsWith('.com')) {
            setError('URL inválido. Deve ter um domínio válido (ex. .com).');
            setTimeout(() => setError(null), 2000);
            return;
        }

        if (urls.includes(formattedValue)) {
            setError('URL já existe na lista.');
            setTimeout(() => setError(null), 2000);
            return;
        }

        const updatedUrls = [...urls];
        updatedUrls[editIndex as number] = formattedValue;
        chrome.storage.local.set({ blockPages: updatedUrls }, () => {
            onUpdateUrls(updatedUrls);
        });
        setEditIndex(null);
        setError(null);
    };

    const handleCancelEdit = () => {
        setEditedValue('');
        setEditIndex(null);
        setError(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedValue(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSaveEdit();
        }
    };

    return (
        <div className="w-full">
            {urls.map((url, index) => (
                <div
                    key={index}
                    className="flex justify-between items-center mb-2 p-2 border-b border-gothamBlack-300 dark:border-gothamBlack-600"
                >
                    {editIndex === index ? (
                        <div className="flex flex-col items-start">
                            <input
                                type="text"
                                value={editedValue}
                                onChange={handleInputChange}
                                onBlur={handleCancelEdit}
                                onKeyPress={handleKeyPress}
                                autoFocus
                                className="block w-full box-border p-1 text-sm border rounded-lg bg-transparent focus:ring-oceanBlue-500 focus:border-oceanBlue-500 dark:border-gothamBlack-600 dark:placeholder-gothamBlack-300 dark:text-white dark:focus:ring-oceanBlue-500 dark:focus:border-oceanBlue-500"
                            />
                            {error && (
                                <div className="mt-1 text-[10px] text-red-600 dark:text-red-400">
                                    {error}
                                </div>
                            )}
                        </div>
                    ) : (
                        <span className="truncate max-w-xs text-base">{url}</span>
                    )}
                    <div className="flex space-x-2 text-base">
                        {editIndex === index ? (
                            <div className="flex items-center space-x-1">
                                <BsCheck
                                    size={28}
                                    className="text-green-500 cursor-pointer"
                                    onClick={handleSaveEdit}
                                />
                                <BsX
                                    size={28}
                                    className="text-red-500 cursor-pointer"
                                    onClick={handleCancelEdit}
                                />
                            </div>
                        ) : (
                            <>
                                <BsFillPencilFill
                                    className="text-oceanBlue-400 cursor-pointer"
                                    onClick={() => handleEdit(index)}
                                />
                                <BsFillTrash3Fill
                                    className="text-simplyRed-500 cursor-pointer"
                                    onClick={() => handleDelete(url)}
                                />
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlockList;
