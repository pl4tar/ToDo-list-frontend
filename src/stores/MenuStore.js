import { defineStore } from "pinia";

export const useMenuStore = defineStore("menuStore", {
  state: () => ({
    menuList: [
      {
        id: 1,
        name: "Выполненное",
        value: "completed",
        icon: "mdi-check-decagram",
      },
      {
        id: 2,
        name: "Избранное",
        value: "favorites",
        icon: "mdi-star-shooting",
      },
      {
        id: 3,
        name: "Календарь",
        value: "calendar",
        icon: "mdi-calendar-week",
        path: "/calendarView",
      },
      {
        id: 4,
        name: "Обратная связь",
        value: "feedback",
        icon: "mdi-message-alert",
      },
    ],
    categories: [
      {
        id: 1,
        title: "Все",
        value: "all",
        icon: "mdi-view-list",
        iconColor: "grey",
      },
      {
        id: 2,
        title: "Без категории",
        value: "withoutCategory",
        icon: "mdi-vector-point-plus",
        iconColor: "grey",
      },
      {
        id: 3,
        title: "Работа",
        value: "job",
        icon: "mdi-briefcase",
        iconColor: "light-green-darken-1",
      },
      {
        id: 4,
        title: "Учеба",
        value: "studies",
        icon: "mdi-book-open-page-variant",
        iconColor: "orange-darken-1",
      },
      {
        id: 5,
        title: "Личное",
        value: "personal",
        icon: "mdi-account",
        iconColor: "deep-orange-darken-1",
      },
      {
        id: 6,
        title: "Создать",
        value: "newCategory",
        icon: "mdi-plus",
        iconColor: "grey",
      },
    ],
  }),
});
