import JSZip from "jszip";
import { saveAs } from "file-saver";

function resetConfig() {
  const imageStorage = useImageStore();
  const settingStore = useSettingsStore();
  const localSettings = useLocalSettingsStore();
  imageStorage.$reset();
  settingStore.$reset();
  localSettings.$reset();
}

function loadConfig(config) {
  return;
}

function exportConfig() {
  const imageStorage = useImageStore();
  const settingStore = useSettingsStore();
  const localSettings = useLocalSettingsStore();
  const config = useRuntimeConfig();
  return {
    version: config.public.version,
    settings: settingStore.$state,
    localSettings: localSettings.$state,
    images: imageStorage.$state.pictures,
  }
}

function saveConfigToZip() {
  var config = exportConfig();
  console.log(config);
  var zip = new JSZip();
  zip.file("config.json", JSON.stringify(config.settings));
  zip.file("local_config.json", JSON.stringify(config.localSettings));
  console.log(config.images);
  for (let id in config.images) {
    zip.file(`images/${id}.txt`, config.images[id]);
  }
  zip.generateAsync({ type: "blob" }).then(function (blob) {
    saveAs(blob, `config-${config.version}.zip`);
  });
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
  resetConfig,
  loadConfigFromZip,
  saveConfigToZip,
  saveConfigToWebdav,
  fetchConfigFromWebdav,
};
