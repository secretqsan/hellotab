function proxyedUrl(url) {
  const config = useRuntimeConfig();
  if (config.public.platform == 'crx'){
    return url;
  }
  else{
    return `/api/proxy/${url}`
  }
}
function apiEndpoint(fun) {
  const config = useRuntimeConfig();
  if (config.public.platform == 'crx'){
    return `https://hellotab.secretqsan.top/api/${fun}`;
  }
  else{
    return `/api/${fun}`
  }
}
export { proxyedUrl, apiEndpoint };