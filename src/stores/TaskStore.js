import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  collection,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig.js';
import { useAuthStore } from '@/stores/firebase/AuthStore';
import { useTaskConfigStore } from '@/stores/TaskConfigStore';

export const useTaskStore = defineStore('task', () => {
  const authStore = useAuthStore();
  const TaskConfigStore = useTaskConfigStore();

  const isDialogShown = ref(false);
  const titleTask = ref('');
  const descriptionTask = ref('');
  const isTaskInFavorites = ref(false);
  const selectedCategory = ref(null);
  const selectedPriority = ref(0);
  const startDate = ref(null);
  const endDate = ref(null);

  const isDialogDateOpen = ref(false);
  const currentDate = ref(null);
  const selectedDateType = ref('');

  const openDialogDate = (type) => {
    selectedDateType.value = type;
    currentDate.value = type === 'start' ? startDate.value : endDate.value;
    isDialogDateOpen.value = true;
  };

  const closeDialogDate = () => {
    isDialogDateOpen.value = false;
  };

  const addNewTask = async () => {
    if (!authStore.user) {return;}

    try {
      const priorityData = TaskConfigStore.priorities[selectedPriority.value];

      const taskData = {
        title: titleTask.value,
        description: descriptionTask.value || null,
        isFavorite: isTaskInFavorites.value,
        category: selectedCategory.value,
        priority: priorityData.value,
        priorityTitle: priorityData.title,
        priorityColor: priorityData.color,
        userId: authStore.user.uid,
        createdAt: serverTimestamp(),
        completed: false
      };

      if (startDate.value) {
        taskData.startDate = Timestamp.fromDate(new Date(startDate.value));
      }

      if (endDate.value) {
        taskData.endDate = Timestamp.fromDate(new Date(endDate.value));
      }

      await addDoc(collection(db, 'tasks'), taskData);
      resetForm();
      closeDialog();
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
      throw error;
    }
  };

  const updateTask = async (taskId, updatedData) => {
    try {
      const cleanData = Object.entries(updatedData).reduce((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      }, {});

      await updateDoc(doc(db, 'tasks', taskId), cleanData);
      return true;
    } catch (error) {
      console.error('Firestore error:', error);
      throw error;
    }
  };

  const completeTask = async (taskId) => {
    try {
      await updateDoc(doc(db, 'tasks', taskId), {
        completed: true,
        completedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Ошибка при завершении задачи:', error);
      throw error;
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
      throw error;
    }
  };

  const resetForm = () => {
    titleTask.value = '';
    descriptionTask.value = '';
    isTaskInFavorites.value = false;
    selectedCategory.value = null;
    selectedPriority.value = 0;
    startDate.value = null;
    endDate.value = null;
  };

  const closeDialog = () => {
    isDialogShown.value = false;
  };

  return {
    isDialogShown,
    titleTask,
    descriptionTask,
    isTaskInFavorites,
    selectedCategory,
    selectedPriority,
    startDate,
    endDate,
    isDialogDateOpen,
    currentDate,
    selectedDateType,
    addNewTask,
    updateTask,
    completeTask,
    deleteTask,
    resetForm,
    closeDialog,
    openDialogDate,
    closeDialogDate
  };
});