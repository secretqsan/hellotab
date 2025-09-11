import JSZip from "jszip";
import saveAs from "file-saver";

function resetConfig() {
  const imageStorage = useImageStore();
  const settingStore = useSettingsStore();
  const localSettings = useLocalSettingsStore();
  imageStorage.$reset();
  settingStore.$reset();
  localSettings.$reset();
}

function importConfig(config) {
  const imageStorage = useImageStore();
  const settingStore = useSettingsStore();
  const localSettings = useLocalSettingsStore();
  console.log(config);
  console.log(config.settings);
  if (config.settings) {
    console.log(config.settings);
    settingStore.$patch(config.settings);
    console.log(config.settings);
  }
  if (config.localSettings) {
    localSettings.$patch(config.localSettings);
  }
  if (config.images) {
    imageStorage.$patch({ pictures: config.images });
  }
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
  };
}

function saveConfigToZip() {
  var config = exportConfig();
  var zip = new JSZip();
  zip.file("config.json", JSON.stringify(config.settings));
  zip.file("local_config.json", JSON.stringify(config.localSettings));
  for (let id in config.images) {
    zip.file(`images/${id}`, config.images[id]);
  }
  zip.generateAsync({ type: "blob" }).then(function (blob) {
    saveAs(blob, `hellotab-config-${config.version}.zip`);
  });
}

async function loadConfigFromZip(file) {
  const zip = await JSZip.loadAsync(file);
  const config = {
    version: "",
    settings: {},
    localSettings: {},
    images: {},
  };

  const configText = await zip.file("config.json").async("string");
  config.settings = JSON.parse(configText);

  const localConfigText = await zip.file("local_config.json").async("string");
  config.localSettings = JSON.parse(localConfigText);

  const imagePromises = [];
  zip.forEach((relativePath, file) => {
    if (relativePath !== 'images/' && relativePath.startsWith("images/")) {
      const promise = file.async("string").then((text) => {
        config.images[relativePath.replace("images/", "")] = text;
      });
      imagePromises.push(promise);
    }
  });

  await Promise.all(imagePromises);
  importConfig(config);
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
