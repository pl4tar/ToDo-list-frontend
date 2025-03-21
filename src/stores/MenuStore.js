import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menuStore', {
  state: () => ({
    menuList: [
      {
        id: 1,
        name: 'Выполненное',
        value: 'completed',
        icon: 'mdi-check-decagram',
      },
      {
        id: 2,
        name: 'Избранное',
        value: 'favorites',
        icon: 'mdi-star-shooting',
      },
      {
        id: 3,
        name: 'Просроченное',
        value: 'expired',
        icon: 'mdi-clock-remove',
      },
      {
        id: 4,
        name: 'Календарь',
        value: 'calendar',
        icon: 'mdi-calendar-week',
        path: '/calendarView',
      },
      {
        id: 5,
        name: 'Обратная связь',
        value: 'feedback',
        icon: 'mdi-message-alert',
      },
    ],
    categories: [
      {
        id: 1,
        title: 'Все',
        value: 'all',
        icon: 'mdi-view-list',
        iconColor: 'grey',
        path: '/',
      },
      {
        id: 2,
        title: 'Работа',
        value: 'job',
        icon: 'mdi-briefcase',
        iconColor: 'light-green-darken-1',
      },
      {
        id: 3,
        title: 'Учеба',
        value: 'studies',
        icon: 'mdi-book-open-page-variant',
        iconColor: 'cyan-darken-3',
      },
      {
        id: 4,
        title: 'Личное',
        value: 'personal',
        icon: 'mdi-account',
        iconColor: 'deep-orange-darken-3',
      },
      {
        id: 5,
        title: 'Без категории',
        value: 'withoutCategory',
        icon: 'mdi-flip-to-back',
        iconColor: 'grey',
      },
    ],
    priorities: [
      {
        title: 'Низкий',
        value: 'low',
        class: 'low-priority',
        color: 'blue-darken-1'
      },
      {
        title: 'Средний',
        value: 'medium',
        class: 'medium-priority',
        color: 'orange-darken-1'
      },
      {
        title: 'Высокий',
        value: 'height',
        class: 'high-priority',
        color: 'red-darken-1'
      },
    ]
  }),
});
