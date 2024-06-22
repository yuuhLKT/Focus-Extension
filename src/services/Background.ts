// Variable to control which tabs have already received the REMOVE_CONTENT message
let tabsMessaged: number[] = [];

// Create alarm
chrome.alarms.create('focus-alarm', { periodInMinutes: 1 / 60 });

// Function to check all tabs for blocked pages
function checkAllTabs() {
    chrome.storage.local.get(['blockPages', 'bools'], async (result) => {
        const blockedPages: string[] = result.blockPages || [];
        const timerRunning: boolean = result.bools?.isRunning || false;

        const tabs = await chrome.tabs.query({});
        for (const tab of tabs) {
            if (tab.url && isPageBlocked(tab.url, blockedPages)) {
                if (timerRunning) {
                    await executeContentScript(tab.id!, 'contents/content.js');
                } else {
                    if (!tabsMessaged.includes(tab.id!)) {
                        await sendRemoveMessage(tab.id!, 'contents/content.js');
                        tabsMessaged.push(tab.id!);
                    }
                }
            }
        }
    });
}

// Reset tabsMessaged when the timer starts running
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'focus-alarm') {
        chrome.storage.local.get(['bools'], (result) => {
            if (result.bools.isRunning) {
                countdown();
                tabsMessaged = [];
            }
            checkAllTabs();
        });
    }
});

// Initialize timer state and settings
chrome.storage.local.get(['timer', 'bools'], (result) => {
    chrome.storage.local.set({
        timer: result.timer || { hours: 0, minutes: 0, seconds: 0 },
        bools: {
            isRunning: result.bools?.isRunning || false,
            isFinished: result.bools?.isFinished || false,
            isPaused: result.bools?.isPaused || false,
            playAudio: result.bools?.playAudio || true,
        },
    });
});

// Function to inject the playAudio script in the active tab
function injectPlayAudioScript() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            const activeTab = tabs[0];
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id! },
                files: ['contents/playAudio.js']
            }, () => {
                console.log('playAudio.js injected in the active tab.');
            });
        }
    });
}

function injectPlayConfettiScript() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            const activeTab = tabs[0];
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id! },
                files: ['contents/playConfetti.js']
            }, () => {
                console.log('playConfetti.js injected in the active tab.');
            });
        }
    });
}


// Function to finish the timer and play audio if necessary
function finishTimer() {
    chrome.storage.local.get(['bools', 'confettiEnabled'], (result) => {
        const { playAudio } = result.bools || {};

        chrome.storage.local.set({
            bools: {
                isRunning: false,
                isFinished: true,
                isPaused: false,
                playAudio: playAudio,
            },
            timer: { hours: 0, minutes: 0, seconds: 0 },
        }, () => {

            if (playAudio) {
                injectPlayAudioScript();
            }

            if (result.confettiEnabled) {
                injectPlayConfettiScript();
            }
        });
    });
}

// Function to countdown to 0
function countdown() {
    chrome.storage.local.get(['timer', 'bools'], (result) => {
        if (result.timer && result.bools.isRunning) {
            let { hours, minutes, seconds } = result.timer;

            if (seconds > 0) {
                seconds--;
            } else if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else if (hours > 0) {
                hours--;
                minutes = 59;
                seconds = 59;
            } else {
                finishTimer();
                return;
            }

            chrome.storage.local.set({ timer: { hours, minutes, seconds } });
        }
    });
}

// Function to check if the page is blocked
function isPageBlocked(url: string, blockedPages: string[]) {
    return blockedPages.some((blockedUrl) => url.startsWith(blockedUrl));
}

// Function to execute content script
async function executeContentScript(tabId: number, script: string) {
    try {
        await chrome.scripting.executeScript({
            target: { tabId },
            files: [script],
        });
    } catch (error) {
        console.error(`Error executing content script on tab ${tabId}:`, error);
    }
}

// Function to send a message to remove content
async function sendRemoveMessage(tabId: number, script: string) {
    try {
        await executeContentScript(tabId, script);
        await chrome.tabs.sendMessage(tabId, { type: 'REMOVE_CONTENT' });
    } catch (error) {
        console.error('Error sending REMOVE_CONTENT message:', error);
    }
}

// Listener for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url && tab.active) {
        chrome.storage.local.get(['blockPages', 'bools'], async (result) => {
            const blockedPages: string[] = result.blockPages || [];
            const timerRunning: boolean = result.bools?.isRunning || false;
            const currentUrl: string = changeInfo.url!;

            if (isPageBlocked(currentUrl, blockedPages) && timerRunning) {
                await executeContentScript(tabId, 'contents/content.js');
            } else if (isPageBlocked(currentUrl, blockedPages)) {
                await sendRemoveMessage(tabId, 'contents/content.js');
            }
        });
    }
});