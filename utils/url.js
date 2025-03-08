function proxyedUrl(url) {
  return `/api/proxy/${url}`
}function apiEndpoint(fun) {
    return `/api/${fun}`
}
export { proxyedUrl, apiEndpoint };