function injectExtensionDiv() {
    const extensionDiv = document.createElement('div');
    extensionDiv.id = 'extension';
    document.body.appendChild(extensionDiv);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectExtensionDiv);
} else {
  injectExtensionDiv();
}