function proxyedUrl(url) {
  return `/api/proxy/${url}`;
}

function apiEndpoint(fun) {
  return `/api/${fun}`;
}

const localhostPattern = /^localhost(:\d+)?(\/.*)?$/;
const protocolPattern = /[a-zA-Z0-9]+:\/\/[^\s/$.?#].[^\s]*$/i;
const ipPattern = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(:\d+)?(\/.*)?$/;
const domainPattern = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;

function isUrl(str) {
  return str.match(localhostPattern) || str.match(protocolPattern) || str.match(ipPattern) || str.match(domainPattern)
}

function constructTemplateUrl(baseUrl, placeholder, value) {
  var url = baseUrl.replace(placeholder, value);
  return url;
}

export { proxyedUrl, apiEndpoint, isUrl, constructTemplateUrl};
