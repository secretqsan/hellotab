function injectExtensionDiv() {
  const extensionDiv = document.createElement("div");
  extensionDiv.id = "extension";
  extensionDiv.textContent = chrome.runtime.id;
  extensionDiv.style.display = "none";
  document.body.appendChild(extensionDiv);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", injectExtensionDiv);
} else {
  injectExtensionDiv();
}
