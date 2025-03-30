<template>
  <div class="d-flex align-center ga-3 mb-5">
    <TaskCard
      :task="task"
      @open-details="isDialogDetailsOpen = true"
      @delete-click="isDialogForDeletionOpen = true"
    />
    <DeleteConfirmationDialog
      v-model="isDialogForDeletionOpen"
      @confirm="deleteTask"
    />
    <TaskDetailsDialog
      v-model="isDialogDetailsOpen"
      :task="task" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from '@/stores/TaskStore.js';
import TaskCard from '@/components/task/TaskCard.vue';
import DeleteConfirmationDialog from '@/components/task/DeleteConfirmationDialog.vue';
import TaskDetailsDialog from '@/components/task/TaskDetailsDialog.vue';

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const TaskStore = useTaskStore();

const isDialogDetailsOpen = ref(false);

const isDialogForDeletionOpen = ref(false);

const isConfirmForDeletion = ref(false);

function deleteTask() {
  // isConfirmForDeletion.value = true
  TaskStore.deleteTask(props.task.id);
  isConfirmForDeletion.value = false;
  // isDialogForDeletionOpen.value = false
}
</script>

<style scoped>
.text-indent {
  text-indent: 20px;
}

.text-grey {
  color: rgb(165, 165, 165) !important;
}

.bg-dialog {
  background-color: rgba(8, 8, 8, 0.5);
}

.w-40 {
  width: 40% !important;
}

.w-60 {
  width: 60% !important;
}

@media (max-width: 430px) {
  .flex-center {
    display: flex;
    justify-content: center;
  }

  .direction-column {
    flex-direction: column !important;
  }

  .width-100 {
    width: 100%;
  }
}
</style>
