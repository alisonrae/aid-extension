// 1. Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    const contrastTestBtn = document.getElementById('contrast-test');
    const resultsSection = document.getElementById('results');
    const contrastResultElement = document.getElementById('contrast-results'); // Cache result element

    if (contrastTestBtn) {
        contrastTestBtn.addEventListener('click', function() {
            updateResultElement(contrastResultElement, 'Running contrast test...');
            runContrastTest(resultsSection, contrastResultElement); // Run contrast test and update results
        });
    }
});

// 2. Run the Contrast Test
async function runContrastTest(resultsSection, contrastResultElement) {
    try {
        const issuesFound = await sendMessageToContentScript('runContrastTest');
        updateResultElement(resultsSection, contrastResultElement, `Contrast issues found: ${issuesFound}`);
    } catch (error) {
        console.error('Error running contrast test:', error);
        updateResultElement(resultsSection, contrastResultElement, `Error: ${error.message}. Please try again.`);
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
function updateResultElement(container, element, message) {
    element.textContent = message;
    container.style.display = 'block'; // Ensure the result element is visible
}
