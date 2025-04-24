function proxyedUrl(url) {
  return `/api/proxy/${url}`;
}
function apiEndpoint(fun) {
  return `/api/${fun}`;
}
const localhostPattern = /^localhost(:\d+)?(\/.*)?$/;
const protocolPattern = /.*:\/\/[^\s/$.?#].[^\s]*$/i;
const ipPattern = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(:\d+)?(\/.*)?$/;
const domainPattern = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;
function isUrl(str) {
  if (str.match(localhostPattern)) {
    return true;
  }
  if (str.match(protocolPattern)) {
    return true;
  }
  if (str.match(ipPattern)) {
    return true;
  }
  if (str.match(domainPattern)) {
    return true;
  }
  return false;
}

function constructTemplateUrl(baseUrl, placeholder, value) {
  var url = baseUrl.replace(placeholder, value);
  return url;
}

export { proxyedUrl, apiEndpoint, isUrl, constructTemplateUrl};
