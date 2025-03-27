import { defineStore } from 'pinia';

export const useAllTasksStore = defineStore('allTasksStore', {
  state: () => ({
    // временный список для верстки
    temporaryTasks: [
      {
        id: 1,
        title: 'Написать стих',
        description: 'Создать шедевр поэтического искусства',
        isTaskInFavorites: true,
        category: 'studies',
        priority: 'medium',
        startDate: new Date('2025-03-12'),
        endDate: new Date('2025-03-14'),
        isTaskCompleted: false,
      },
      {
        id: 2,
        title: 'Погладить кота',
        description: 'Это типо описание задачи 2',
        isTaskInFavorites: true,
        category: 'job',
        priority: 'low',
        isTaskCompleted: false,
      },
      {
        id: 3,
        title: 'Постирать шапку',
        description: 'Это типо описание задачи 3',
        isTaskInFavorites: false,
        category: 'personal',
        priority: 'height',
        startDate: new Date('2025-03-13'),
        isTaskCompleted: true,
      },
      {
        id: 4,
        title: 'Полить кактус',
        description: 'Это типо описание задачи 4',
        isTaskInFavorites: false,
        category: 'job',
        priority: 'height',
        startDate: new Date('2025-03-21'),
        isTaskCompleted: false,
      },
      {
        id: 5,
        title: 'Попить чаю',
        description: 'Это типо описание задачи 5',
        isTaskInFavorites: false,
        category: '',
        priority: 'height',
        startDate: new Date('2025-03-25'),
        isTaskCompleted: false,
      },
      {
        id: 6,
        title: 'Сварить пельмени',
        description: 'Это типо описание задачи 6',
        isTaskInFavorites: false,
        category: 'personal',
        priority: 'height',
        startDate: new Date('2025-03-23'),
        isTaskCompleted: false,
      },
    ],
  }),
});
