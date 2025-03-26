import { defineStore } from 'pinia';

export const useWarningStore = defineStore('WarningStore', {
  state: () => ({
    isWarningShow: false,
    warningText: '',
  }),

  actions: {
    showWarning(text) {
      this.isWarningShow = true;
      this.warningText = text;
    },
  },
});
