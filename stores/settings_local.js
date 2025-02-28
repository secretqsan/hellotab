export const useLocalSettingsStore = defineStore("local_settings", {
  state: () => ({
    syncEnabled: false,
    webdavTestedOk: false,
    firstSyncOk: false,
    webdavUrl: "",
    webdavUsername: "",
    webdavPassword: "",
  }),
  persist: true,
});
