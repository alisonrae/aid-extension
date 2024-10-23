# AID Extension

The **AID Extension** is a browser extension designed to help developers and accessibility testers evaluate web pages for accessibility issues. It automates tests like contrast checking, heading structure verification, and landmark assessments, combining essential accessibility checks into a single tool.

## Intended Features

- **Contrast Test**: Highlights areas of a webpage with insufficient color contrast according to WCAG guidelines.
- **Heading Structure Test**: Verifies if headings follow a correct hierarchical structure.
- **Landmark Test**: Checks the use of ARIA landmarks and their implementation.
- **Role & ARIA Implementation Test**: Ensures roles and ARIA attributes are properly applied to elements.
- **Form Labels Test**: Examines form elements for proper labeling and association with fieldsets where appropriate.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/aid-extension.git
    cd aid-extension
    ```

2. **Load the extension in Chrome**:
   - Go to `chrome://extensions/`.
   - Enable **Developer mode** by toggling the switch at the top right.
   - Click on **Load unpacked**.
   - Select the folder where you cloned the repository.

3. **Run the extension**:
   - Once loaded, the extension icon will appear in your Chrome toolbar.
   - Click the icon to open the extension popup and run accessibility tests on the current webpage.

## Requirements

- **Chrome Browser**: The extension is designed for use with Chrome.
- **Basic Knowledge of Web Development**: HTML, CSS, and JavaScript knowledge is beneficial to contribute or understand the extension.

## Contributing

1. **Fork the repository**.
2. **Create a feature branch**:
    ```bash
    git checkout -b feature-name
    ```

3. **Make your changes**.
4. **Commit your changes**:
    ```bash
    git commit -m "Add your commit message here"
    ```

5. **Push to your branch**:
    ```bash
    git push origin feature-name
    ```

6. **Create a Pull Request**.

## Development Notes

- **Folder Structure**: 
    - `popup.js` and `content.js` contain the core JavaScript logic for the popup interface and the content script running tests on the active webpage.
    - `background.js` manages messaging between different parts of the extension.
    - Styles for the extension can be found in `popup.css`.

- **Testing Changes**: After making changes, reload the extension in Chrome using the **Reload** button in the `chrome://extensions/` interface to see your updates live.

## Project Status

This project is still in development. As of now, the only implemented feature is the **contrast test**, and it is still being actively worked on. Other features (like heading structure tests, landmark tests, etc.) are not yet functional.

### Known Issues:
- **Contrast test**: The contrast test is a work in progress and may not always produce correct results.
- Other planned tests (e.g., heading structure test, landmark test) are placeholders and not yet functional.

Feel free to fork this project or contribute if you'd like to help with the development of these features.


## License

This project is licensed under the [MIT License](LICENSE).
