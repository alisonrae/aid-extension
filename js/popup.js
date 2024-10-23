// 1. Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    const contrastTestBtn = document.getElementById('contrast-test');
    const resultElement = document.getElementById('contrast-results'); // Cache result element

    if (contrastTestBtn) {
        contrastTestBtn.addEventListener('click', function() {
            updateResultElement(resultElement, 'Running contrast test...');
            runContrastTest(resultElement); // Run contrast test and update results
        });
    }
});

// 2. Run the Contrast Test
async function runContrastTest(resultElement) {
    try {
        const issuesFound = await sendMessageToContentScript('runContrastTest');
        updateResultElement(resultElement, `Contrast issues found: ${issuesFound}`);
    } catch (error) {
        console.error('Error running contrast test:', error);
        updateResultElement(resultElement, `Error: ${error.message}. Please try again.`);
    }
}

// 3. Send Message to Content Script (Messaging logic only)
async function sendMessageToContentScript(testAction) {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tabs.length === 0) {
        throw new Error('No active tabs found.');
    }

    const response = await chrome.tabs.sendMessage(tabs[0].id, { action: testAction });

    if (!response || response.issuesFound == null) {
        throw new Error('No valid response from content script.');
    }

    return response.issuesFound; // Return the number of issues found
}

// 4. Update the Result Element (DOM manipulation only)
function updateResultElement(element, message) {
    element.textContent = message;
    element.style.display = 'block'; // Ensure the result element is visible
}
