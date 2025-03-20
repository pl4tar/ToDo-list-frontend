// скорее всего шапку страницы нужно будет вынести в компонент, чтобы переиспользовать на всех других страницах
<template>
  <div class="d-flex flex-wrap align-center justify-space-between">
    <div>
      <h1 class="mb-1">Все задачи</h1>
      <div class="d-flex ga-2 mb-3">
        <v-icon icon="mdi-check-circle-outline"></v-icon>
        <p>Всего <span>100</span> задач</p>
      </div>
    </div>
    <TaskDialog/>
  </div>
  <v-divider class="mb-10" />
  <div    
    v-for="task in temporaryTasks"
    :key="task.id"
  >
    <TaskCard :task="task"/>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import TaskDialog from '@/components/TaskDialog.vue';
import TaskCard from '@/components/TaskCard.vue'
// временный список для верстки
const temporaryTasks = ref([
  {
    id: 1,
    title: 'Задача 1',
    description: 'Это типо описание задачи 1',
    isTaskInFavorites: true,
    category: 'studies',
    priority: 'medium',
    startDate: new Date('2025-03-12'),
    endDate: new Date('2025-03-14'),
    isTaskCompleted: false
  },
  {
    id: 2,
    title: 'Задача 2',
    description: 'Это типо описание задачи 2',
    isTaskInFavorites: true,
    category: 'job',
    priority: 'low',
    isTaskCompleted: false
  },
  {
    id: 3,
    title: 'Задача 3',
    description: 'Это типо описание задачи 3',
    isTaskInFavorites: false,
    category: 'personal',
    priority: 'height',
    startDate: new Date('2025-03-13'),
    endDate: new Date('2025-03-14'),
    isTaskCompleted: false
  }
])
</script>
