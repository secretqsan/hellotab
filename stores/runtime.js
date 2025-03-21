export const useRuntimeStore = defineStore("runtimeStorage", {
    state: () => ({
      crxId: '',
      settingPanel: null,
      toast: null,
    })
});
  