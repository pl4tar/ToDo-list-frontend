<template>
  <div class="d-flex align-center ga-3 mb-5">
    <TaskCard
      :task="task"
      @open-details="isDialogDetailsOpen = true"
      @delete-click="isDialogForDeletionOpen = true"
      @complete-click="isDialogForCompletionOpen = true"
      @edit-click="isEditDialogOpen = true"
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

    <EditTaskDialog
      v-model="isEditDialogOpen"
      :task="task"
      @updated="handleTaskUpdated"
    />

    <TaskDetailsDialog
      v-model="isDialogDetailsOpen"
      :task="task"
    />
    
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useAllTasksStore} from '@/stores/allTasksStore';
import {useWarningStore} from '@/stores/WarningStore';
import TaskCard from '@/components/task/TaskCard.vue';
import DeleteConfirmationDialog from '@/components/task/DeleteConfirmationDialog.vue';
import CompleteConfirmationDialog from '@/components/task/CompleteConfirmationDialog.vue';
import EditTaskDialog from '@/components/task/EditTaskDialog.vue';
import TaskDetailsDialog from '@/components/task/TaskDetailsDialog.vue';
import {useTaskStore} from '@/stores/TaskStore.js';

const props = defineProps({
  task: {
    type: Object,
    required: true,
    validator: (task) => task?.id
  }
});

const allTasksStore = useAllTasksStore();
const WarningStore = useWarningStore();
const taskStore = useTaskStore();

const isDialogDetailsOpen = ref(false);
const isDialogForDeletionOpen = ref(false);
const isDialogForCompletionOpen = ref(false);
const isEditDialogOpen = ref(false);
const overdueTasks = allTasksStore.overdueTasks

const handleTaskUpdated = () => {
};

const deleteTask = async () => {
  try {
    await taskStore.deleteTask(props.task.id);
  } catch (error) {
    console.error('Ошибка при удалении задачи:', error);
  }
};

const completeAndDeleteTask = async () => {
  try {
    await taskStore.completeTask(props.task.id);
    await taskStore.deleteTask(props.task.id);
  } catch (error) {
    console.error('Ошибка при завершении задачи:', error);
  }
};

</script>

<style scoped>

</style>