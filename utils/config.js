import JSZip from "jszip";
const {
  syncEnabled,
  webdavTestedOk,
  webdavUrl,
  webdavUsername,
  webdavPassword,
} = storeToRefs(localSettings);
function loadConfig() {
  return;
}

function exportConfig() {
  return;
}

function saveConfigToZip() {
  var config = exportConfig();
}

function loadConfigFromZip() {
  var config = {};
  loadConfig(config);
}

function saveConfigToWebdav() {
  return;
}

function fetchConfigFromWebdav() {
  return;
}
export {
  loadConfigFromZip,
  saveConfigToZip,
  saveConfigToWebdav,
  fetchConfigFromWebdav,
};
