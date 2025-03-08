function extensionInstalled() {
    const body = document.getElementsByTagName("body")[0];
    const extensionDiv = body.querySelector('#extension');
    return extensionDiv !== null;
}
export {
    extensionInstalled
}