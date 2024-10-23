chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'runContrastTest') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ['content.js']  // This will inject the content.js file
            }, () => {
                sendResponse({ status: 'Test executed' });
            });
        });
        return true; // Keeps the message port open for async response
    }
});
