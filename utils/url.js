function proxyedUrl(url) {
  return `/api/proxy/${url}`;
}
function apiEndpoint(fun) {
  return `/api/${fun}`;
}
function isUrl(str) {
  // match localhost
  if (str.match(/^localhost(:\d+)?(\/.*)?$/)) {
    return true;
  }
  // match protocol
  if (str.match(/.*:\/\/[^\s/$.?#].[^\s]*$/i)) {
    return true;
  }
  // match ip
  if (
    str.match(
      /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(:\d+)?(\/.*)?$/
    )
  ) {
    return true;
  }
  // match domain
  if (
    str.match(
      /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/
    )
  ) {
    return true;
  }
  return false;
}
export { proxyedUrl, apiEndpoint, isUrl };
