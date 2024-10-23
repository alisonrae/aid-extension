chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'runContrastTest') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            // Inject the content script
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ['content.js']  // Injects content.js file
            }, () => {
                // Listen for a message from the content script
                chrome.runtime.onMessage.addListener(function contentScriptListener(responseMessage, sender, sendResponseContent) {
                    if (responseMessage.action === 'updateContrastResults') {
                        // Pass the contrast test results back to the popup
                        sendResponse({ issuesFound: responseMessage.contrastIssuesFound });
                        // Remove the listener after receiving the message to avoid duplicate responses
                        chrome.runtime.onMessage.removeListener(contentScriptListener);
                    }
                });
            });
        });
        return true; // Keeps the message port open for async response
    }
});

