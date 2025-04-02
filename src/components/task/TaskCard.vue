<template>
  <v-card
    class="w-100 bg-background-light rounded-lg elevation-10"
    @click="$emit('open-details')"
  >
    <v-card-title class="flex-center text-wrap">
      {{ task.title }}
    </v-card-title>

    <v-divider />

    <div class="pa-3">
      <TaskDate :task="task" />
      <TaskActions
        @delete="$emit('delete-click')"
        @edit="$emit('edit-click')"
        @complete="$emit('complete-click')"
      />
    </div>
  </v-card>
</template>

<script setup>
import TaskDate from '@/components/task/TaskDate.vue';
import TaskActions from '@/components/task/TaskActions.vue';

defineProps({
  task: {
    type: Object,
    required: true,
  },
});

defineEmits(['open-details', 'delete-click', 'complete-click', 'edit-click']);
</script>