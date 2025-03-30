<template>
  <div>
    <div class="d-flex flex-wrap flex-column flex-sm-row align-center text-center justify-space-between pa-2">
      <div>
        <h1
          class="mb-3"
          style="line-height: 1.2"
        >
          {{ pageTitle }}
        </h1>
        <div class="d-flex ga-2 mb-3 text-secondary justify-center justify-sm-start">
          <v-icon icon="mdi-check-circle-outline" />
          <p>Всего <span>100</span> задач</p>
        </div>
      </div>
      <AddTaskDialog />
      <v-divider />
    </div>
    <v-responsive class="mx-auto mt-4 mb-7">
      <v-text-field
        v-model="desiredTask"
        clearable
        hide-details="auto"
        variant="solo-filled"
        label="Поиск"
        class="mb-4"
        prepend-inner-icon="mdi-magnify"
        bg-color="background-dark"
      />
      <div class="d-flex justify-space-evenly w-xs-25">
        <v-select
          item-color="primary"
          v-model="filtrationValue"
          clearable
          :items="filtrationValues"
          variant="solo-filled"
          bg-color="background-dark"
          prepend-inner-icon="mdi-sort"
          label="Сортировать по"
          menu-icon="mdi-chevron-down"
        />
      </div>
    </v-responsive>
    <v-row>
      <v-col
        v-for="task in tasks"
        :key="task.id"
        cols="12"
        md="6"
      >
        <TaskItem :task="task" />
      </v-col>
      <v-col
        v-if="!tasks.length && route.params.filter !== 'expired'"
        class="text-center text-h6 text-primary"
      >
        <p class="d-inline-block mr-2">Пока ничего нет</p>
        <v-icon
          icon="mdi-emoticon-cry-outline"
          size="x-large" 
        />
        <p class="mt-3">Добавьте новую задачу!</p>
      </v-col>
    </v-row>
    <v-row v-if="route.params.filter === 'expired'">
      <v-col
        v-for="task in expiredTasks"
        :key="task.id"
        cols="12"
        md="6">
        <TaskItem :task="task" />
      </v-col>
      <v-col
        v-if="!expiredTasks.length && route.params.filter === 'expired'"
        class="text-h6 text-center text-primary"
      >
        <p class="d-inline-block mb-2">Вы ничего не просрочили!</p>
        <div>
          <v-icon
            icon="mdi-thumb-up"
            size="x-large" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import TaskItem from '@/components/task/TaskItem.vue';
import AddTaskDialog from '@/components/task/AddTaskDialog.vue';
import { useAllTasksStore } from '@/stores/AllTasksStore';

const route = useRoute();

const AllTasksStore = useAllTasksStore();

const pageTitle = computed(() => {
  const titles = {
    all: 'Все задачи',
    favorites: 'Избранные задачи',
    expired: 'Просроченные задачи',
    job: 'Задачи по работе',
    studies: 'Задачи по учебе',
    personal: 'Личные задачи',
    withoutCategory: 'Задачи без категории',
  };
  return titles[route.params.filter] || 'Задачи';
});

// искомая задача
const desiredTask = ref();

const filtrationValue = ref();
const filtrationValues = ref([
  {
    title: 'Приоритету',
    value: 'priority',
  },
  {
    title: 'Дате',
    value: 'date',
  },
]);

const filters = {
  job: (task) => task.category === 'job',
  studies: (task) => task.category === 'studies',
  personal: (task) => task.category === 'personal',
  favorites: (task) => task.isTaskInFavorites,
  expired: (task) => task?.endDate < new Date() || task?.startDate < new Date(),
  withoutCategory: (task) => !task.category,
};

// функции сортировки
const sortByPriority = (a, b) => {
  const priorityOrder = { height: 3, medium: 2, low: 1, undefined: 0 };
  const priorityA = a.priority || 'undefined';
  const priorityB = b.priority || 'undefined';
  return priorityOrder[priorityB] - priorityOrder[priorityA];
};

const sortByDate = (a, b) => {
  const dateA = a.endDate || a.startDate;
  const dateB = b.endDate || b.startDate;

  if (!dateA && !dateB) {
    return 0;
  }
  if (!dateA) {
    return 1;
  }
  if (!dateB) {
    return -1;
  }
  return new Date(dateA) - new Date(dateB);
};

const currentDate = ref(new Date());

// просроченные задачи
const expiredTasks = computed(() => {
  let tasks = AllTasksStore.temporaryTasks.filter((task) => {
    const now = new Date();

    // просроченные задачи (но не выполненные)
    if (task.isTaskCompleted) {
      return false;
    }
    if (task.endDate && new Date(task.endDate) < now) {
      return true;
    }
    if (!task.endDate && task.startDate && new Date(task.startDate) < now) {
      return true;
    }

    return false;
  });

  // поиск по названию
  if (desiredTask.value) {
    const searchText = desiredTask.value.toLowerCase();
    tasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchText),
    );
  }

  // копирование массивв перед сортировкой
  if (filtrationValue.value === 'priority') {
    return [...tasks].sort(sortByPriority);
  } else if (filtrationValue.value === 'date') {
    return [...tasks].sort(sortByDate);
  }

  return tasks;
});

const tasks = computed(() => {
  let filteredTasks = AllTasksStore.temporaryTasks.filter((task) => {
    const now = new Date();

    // если у задачи есть endDate (дедлайн) и он уже прошел, то исключаем
    if (task.endDate && new Date(task.endDate) < now) {
      return false;
    }

    // если у задачи есть только startDate и она уже прошла тоже исключаем
    if (!task.endDate && task.startDate && new Date(task.startDate) < now) {
      return false;
    }

    return true;
  });

  // фильтрация по категориям
  if (filters[route.params.filter]) {
    filteredTasks = filteredTasks.filter(filters[route.params.filter]);
  }

  // поиск по названию
  if (desiredTask.value) {
    const searchText = desiredTask.value.toLowerCase();
    filteredTasks = filteredTasks.filter((task) =>
      task.title.toLowerCase().includes(searchText),
    );
  }

  // сортировка по приоритету или дате
  if (filtrationValue.value === 'priority') {
    filteredTasks.sort(sortByPriority);
  } else if (filtrationValue.value === 'date') {
    filteredTasks.sort(sortByDate);
  }

  return filteredTasks;
});

onMounted(() => {
  // обновление текущей даты раз в минуту
  const interval = setInterval(() => {
    currentDate.value = new Date();
  }, 60000);

  onUnmounted(() => clearInterval(interval));
});
</script>
