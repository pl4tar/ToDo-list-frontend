import { defineStore } from 'pinia';

export const useTaskConfigStore = defineStore('TaskConfigStore', {
  state: () => ({
    priorities: [
      {
        title: 'Низкий',
        value: 'low',
        class: 'low-priority',
        color: 'blue-darken-1',
      },
      {
        title: 'Средний',
        value: 'medium',
        class: 'medium-priority',
        color: 'orange-darken-1',
      },
      {
        title: 'Высокий',
        value: 'height',
        class: 'high-priority',
        color: 'red-darken-1',
      },
    ],
  }),
});
