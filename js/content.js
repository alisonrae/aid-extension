console.log('Content script loaded');

// ===========================
// 1. Listener for Messages from popup.js
// ===========================

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Message received in content script:', message);

    if (message.action === 'runContrastTest') {
        const contrastIssues = runContrastTest();

        setTimeout(() => {
            console.log(`Total contrast issues found: ${contrastIssues}`);

            // Send results back to popup.js
            chrome.runtime.sendMessage({ action: 'updateContrastResults', contrastIssuesFound: contrastIssues });
            sendResponse({ issuesFound: contrastIssues }); // Respond to popup.js
        }, 100);

        return true; // Keeps the message port open for async response
    }
});

// ===========================
// 2. Main Functions
// ===========================

// Run contrast test across text elements and return the number of issues found
function runContrastTest() {
    let contrastIssuesFound = 0;
    const elements = document.querySelectorAll('p, h1, h2, h3, span');

    elements.forEach((element) => {
        if (!element.textContent.trim() || !isElementWithVisibleText(element)) return;

        const computedStyle = window.getComputedStyle(element);
        const textColor = computedStyle.color;
        const backgroundColor = getEffectiveBackgroundColor(element); 

        console.log('Element:', element, 'Text Color:', textColor, 'Background Color:', backgroundColor);

        if (runContrastCheck(textColor, backgroundColor, element)) {
            contrastIssuesFound++;
            console.log('Contrast issue found for element:', element);
        }
    });

    return contrastIssuesFound;
}

// Check contrast ratio and outline the element if it fails
function runContrastCheck(textColor, backgroundColor, element) {
    const contrastRatio = calculateContrast(textColor, backgroundColor);
    console.log(`Contrast ratio for element: ${contrastRatio}`);

    if (contrastRatio < 4.5) {
        element.style.outline = '3px solid red'; // Highlight element with contrast issue
        return true;
    }
    return false;
}

// ===========================
// 3. Helper Functions
// ===========================

// Check if an element has visible text
function isElementWithVisibleText(element) {
    for (const child of element.childNodes) {
        if (child.nodeType === Node.TEXT_NODE && child.textContent.trim()) {
            return true;
        }
    }
    return false; // No visible text
}

// Get the effective background color of an element (checks parent elements)
function getEffectiveBackgroundColor(element) {
    let currentElement = element;
    while (currentElement) {
        const backgroundColor = window.getComputedStyle(currentElement).backgroundColor;
        if (backgroundColor !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'transparent') {
            return backgroundColor;
        }
        currentElement = currentElement.parentElement;
    }
    return window.getComputedStyle(document.body).backgroundColor; // Default to body background color
}

// Calculate the contrast ratio between foreground and background colors
function calculateContrast(foregroundColor, backgroundColor) {
    const fgRGB = parseColor(foregroundColor);
    const bgRGB = parseColor(backgroundColor);

    if (!fgRGB || !bgRGB) {
        console.log('Failed to parse color for element, skipping...');
        return 21; // Assume perfect contrast if parsing fails
    }

    const fgLuminance = getLuminance(fgRGB);
    const bgLuminance = getLuminance(bgRGB);

    return (Math.max(fgLuminance, bgLuminance) + 0.05) / (Math.min(fgLuminance, bgLuminance) + 0.05);
}

// Parse hex, rgb color strings into RGB values
function parseColor(color) {
    if (color.startsWith('#')) {
        return hexToRGB(color);
    }
    if (color.startsWith('rgb')) {
        return color.match(/\d+/g).slice(0, 3).map(Number).map(v => v / 255);
    }
    return null;
}

// Convert hex color to RGB array
function hexToRGB(hex) {
    if (hex.length === 4) {
        return [1, 2, 3].map(i => parseInt(hex[i] + hex[i], 16) / 255);
    }
    return [1, 3, 5].map(i => parseInt(hex[i] + hex[i + 1], 16) / 255);
}

// Get the luminance of an RGB color
function getLuminance([r, g, b]) {
    const a = [r, g, b].map(v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
