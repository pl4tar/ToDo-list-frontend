<template>
  <div
    class="flex-center mb-3 text-body-1 text-secondary text-subtitle-1 mt-1 d-flex align-center"
  >
    <v-icon
      icon="mdi-calendar-range"
      class="mr-1" />
    <p class="text-center">
      {{ formatDate(task.startDate) }}
      <span v-if="task.startDate && task.endDate">-</span>
      {{ formatDate(task.endDate) }}
      <span v-if="!task.startDate && !task.endDate">Не задано</span>
    </p>
  </div>
</template>

<script setup>
import { useFormatDate } from '@/composables/useFormatDate';

const { formatDate } = useFormatDate();

defineProps({
  task: {
    type: Object,
    required: true,
  },
});
</script>
