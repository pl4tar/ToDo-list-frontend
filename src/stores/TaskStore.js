import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '@/firebase/firebaseConfig.js'
import { collection, addDoc, serverTimestamp,deleteDoc,doc, updateDoc } from 'firebase/firestore'
import { useAuthStore } from '@/stores/firebase/AuthStore'
import { useTaskConfigStore } from '@/stores/TaskConfigStore'

export const useTaskStore = defineStore('task', () => {
  const authStore = useAuthStore()
  const TaskConfigStore = useTaskConfigStore()

  // Состояние формы
  const isDialogShown = ref(false)
  const titleTask = ref('')
  const descriptionTask = ref('')
  const isTaskInFavorites = ref(false)
  const selectedCategory = ref(null)
  const selectedPriority = ref(0) // Индекс приоритета
  const startDate = ref(null)
  const endDate = ref(null)

  // Для DatePicker
  const isDialogDateOpen = ref(false)
  const currentDate = ref(null)
  const selectedDateType = ref('') // 'start' или 'end'

  const openDialogDate = (type) => {
    selectedDateType.value = type
    currentDate.value = type === 'start' ? startDate.value : endDate.value
    isDialogDateOpen.value = true
  }

  const closeDialogDate = () => {
    isDialogDateOpen.value = false
  }

  const addNewTask = async () => {
    if (!authStore.user) {return}

    try {
      const priorityData = TaskConfigStore.priorities[selectedPriority.value]

      await addDoc(collection(db, 'tasks'), {
        title: titleTask.value,
        description: descriptionTask.value,
        isFavorite: isTaskInFavorites.value,
        category: selectedCategory.value,
        priority: priorityData.value,
        priorityTitle: priorityData.title,
        priorityColor: priorityData.color,
        startDate: startDate.value,
        endDate: endDate.value,
        completed: false,
        userId: authStore.user.uid,
        createdAt: serverTimestamp()
      })
      resetForm()
      closeDialog()
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error)
      throw error
    }
  }

  const resetForm = () => {
    titleTask.value = ''
    descriptionTask.value = ''
    isTaskInFavorites.value = false
    selectedCategory.value = null
    selectedPriority.value = 0
    startDate.value = null
    endDate.value = null
  }

  const closeDialog = () => {
    isDialogShown.value = false
  }

  const completeTask = async (taskId) => {
    try {
      await updateDoc(doc(db, 'tasks', taskId), {
        completed: true,
        completedAt: new Date()
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
    resetForm,
    closeDialog,
    openDialogDate,
    closeDialogDate,
    deleteTask,
    completeTask,
  }
})