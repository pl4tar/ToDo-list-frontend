import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menuStore', {
  state: () => ({
    isNavShown: false,

    menuList: [
      {
        id: 1,
        name: 'Избранное',
        value: 'favorites',
        icon: 'mdi-star-shooting',
        path: '/tasks/favorites',
      },
      {
        id: 2,
        name: 'Просроченное',
        value: 'expired',
        icon: 'mdi-clock-remove',
        path: '/tasks/expired',
      },
      {
        id: 3,
        name: 'Обратная связь',
        value: 'feedback',
        icon: 'mdi-message-alert',
        path: '/feedback',
      },
    ],
    
    categories: [
      {
        id: 1,
        title: 'Все',
        value: 'all',
        icon: 'mdi-view-list',
        iconColor: 'grey',
        path: '/tasks/all',
      },
      {
        id: 2,
        title: 'Работа',
        value: 'job',
        icon: 'mdi-briefcase',
        iconColor: 'light-green-darken-1',
        path: '/tasks/job',
      },
      {
        id: 3,
        title: 'Учеба',
        value: 'studies',
        icon: 'mdi-book-open-page-variant',
        iconColor: 'cyan-darken-3',
        path: '/tasks/studies',
      },
      {
        id: 4,
        title: 'Личное',
        value: 'personal',
        icon: 'mdi-account',
        iconColor: 'deep-orange-darken-3',
        path: '/tasks/personal',
      },
      {
        id: 5,
        title: 'Без категории',
        value: 'withoutCategory',
        icon: 'mdi-flip-to-back',
        iconColor: 'grey',
        path: '/tasks/withoutCategory',
      },
    ]
  }),
});



