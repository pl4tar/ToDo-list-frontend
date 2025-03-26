import { defineStore } from 'pinia';
import confetti from 'canvas-confetti';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    isDialogShown: false,
    isDialogDateOpen: false,
    selectedDateType: null,
    currentDate: null,

    startDate: null,
    endDate: null,
    titleTask: null,
    descriptionTask: null,
    isTaskInFavorites: false,
    selectedCategory: null,
    selectedPriority: null,
  }),

  actions: {
    // диалог для выбора дат
    openDialogDate(type) {
      this.isDialogDateOpen = true;
      this.selectedDateType = type;
      this.currentDate = type === 'start' ? this.startDate : this.endDate;
    },
    closeDialogDate() {
      this.isDialogDateOpen = false;
    },

    // диалоги добавления задачи
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
        colors: ['#f0f0f0', '#5e03fc', '#fc036b'],
      });
    },

    deleteTask(taskId) {
      // логика удаления ...
      console.log('удалено');
    },
  },
});
