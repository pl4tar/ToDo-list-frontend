import { defineStore } from "pinia";
import confetti from "canvas-confetti";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    isDialogShown: false,
    isDialogDateOpen: false,
    selectedDateType: null,
    currentDate: null,
    startDate: null,
    endDate: null,
  }),

  actions: {
    closeDialog() {
      this.isDialogShown = false;
    },

    addNewTask() {
      this.isDialogShown = false;
      // логика добавления ...

      confetti({
        particleCount: 100,
        spread: 250,
        startVelocity: 50,
        ticks: 100,
        origin: { y: 0.6 },
        colors: ["#f0f0f0", "#5e03fc", "#fc036b"],
      });
    },

    // диалог для выбора дат
    closeDialogDate() {
      this.isDialogDateOpen = false;
    },

    openDialogDate(type) {
      this.isDialogDateOpen = true;
      this.selectedDateType = type;
      this.currentDate = type === "start" ? this.startDate : this.endDate;
    },
  },
});
