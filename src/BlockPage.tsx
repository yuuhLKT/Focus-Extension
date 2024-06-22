import { useEffect, useState } from 'react';
import BlockList from './components/BlockList';
import Copyright from './components/Copyright';
import { BlockInput } from './components/inputs/BlockInput';

const BlockPage = () => {
    const [blockPages, setBlockPages] = useState<string[]>([]);

    useEffect(() => {
        const loadBlockPages = () => {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                chrome.storage.local.get(['blockPages'], (result) => {
                    if (result.blockPages) {
                        setBlockPages(result.blockPages);
                    }
                });
            }
        };

        loadBlockPages();

        const storageListener = (
            changes: { [key: string]: chrome.storage.StorageChange },
            namespace: string
        ) => {
            if (namespace === 'local' && changes['blockPages']) {
                loadBlockPages();
            }
        };

        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
            chrome.storage.onChanged.addListener(storageListener);
        }

        return () => {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
                chrome.storage.onChanged.removeListener(storageListener);
            }
        };
    }, []);

    const handleAddBlockPage = (url: string) => {
        const updatedBlockPages = [...blockPages, url];
        setBlockPages(updatedBlockPages);
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
            chrome.storage.local.set({ blockPages: updatedBlockPages });
        }
    };

    return (
        <div className="min-w-[360px] h-[320px] max-w-sm mx-auto flex flex-col justify-between p-4 font-inter bg-gothamBlack-50 dark:bg-gothamBlack-400 dark:text-white">
            <BlockInput onAddBlockPage={handleAddBlockPage} addedUrls={blockPages} />
            <div className="flex-grow flex flex-col items-center w-full overflow-y-auto max-h-60 mt-4">
                <BlockList urls={blockPages} onUpdateUrls={setBlockPages} />
            </div>
            <div className="mt-8 flex justify-center">
                <Copyright />
            </div>
        </div>
    );
};

export default BlockPage;
