// скорее всего шапку страницы нужно будет вынести в компонент, чтобы
переиспользовать на всех других страницах
<template>
  <div class="d-flex flex-wrap align-center justify-space-between pa-2">
    <div>
      <h1 class="mb-1">Все задачи</h1>
      <div class="d-flex ga-2 mb-3 text-secondary">
        <v-icon icon="mdi-check-circle-outline"></v-icon>
        <p>Всего <span>100</span> задач</p>
      </div>
    </div>
    <TaskDialog />
    <v-divider class="mb-10" />
    <div class="">
      <p>Сегодня</p>
    </div>
  </div>
  
  <v-row>
    <v-col 
      v-for="task in temporaryTasks"
      :key="task.id"
      cols="12"
      md="6"
    >
      <TaskCard :task="task" />
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue';
import TaskDialog from '@/components/TaskDialog.vue';
import TaskCard from '@/components/TaskCard.vue';
// временный список для верстки
const temporaryTasks = ref([
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
    isTaskCompleted: false,
  },
  {
    id: 3,
    title: 'Полить кактус',
    description: 'Это типо описание задачи 4',
    isTaskInFavorites: false,
    category: 'job',
    priority: 'height',
    startDate: new Date('2025-03-21'),
    isTaskCompleted: false,
  },
]);
</script>
