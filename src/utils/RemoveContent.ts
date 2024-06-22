export const removeContent = () => {
    const element = document.getElementById('content-root');
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
};

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.type === 'REMOVE_CONTENT') {
        removeContent();
        sendResponse({ status: 'content removed' });
    }
    return true; 
});
