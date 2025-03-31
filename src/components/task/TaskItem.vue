<template>
  <div class="d-flex align-center ga-3 mb-5">
    <TaskCard
      :task="task"
      @open-details="isDialogDetailsOpen = true"
      @delete-click="isDialogForDeletionOpen = true"
      @complete-click="isDialogForCompletionOpen = true"
    />
    <DeleteConfirmationDialog
      v-model="isDialogForDeletionOpen"
      @confirm="deleteTask"
      :task-id="task.id"
    />
    <CompleteConfirmationDialog
      v-model="isDialogForCompletionOpen"
      @confirm="completeAndDeleteTask"
      :task-id="task.id"
    />
    <TaskDetailsDialog
      v-model="isDialogDetailsOpen"
      :task="task"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from '@/stores/TaskStore';
import TaskCard from '@/components/task/TaskCard.vue';
import DeleteConfirmationDialog from '@/components/task/DeleteConfirmationDialog.vue';
import CompleteConfirmationDialog from '@/components/task/CompleteConfirmationDialog.vue';
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
const isDialogForCompletionOpen = ref(false);

const deleteTask = async () => {
  await TaskStore.deleteTask(props.task.id);
};

const completeAndDeleteTask = async () => {
  await TaskStore.completeTask(props.task.id);
  await TaskStore.deleteTask(props.task.id);
};
</script>