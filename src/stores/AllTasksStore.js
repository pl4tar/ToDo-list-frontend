import {defineStore} from 'pinia'
import {ref} from 'vue'
import {db} from '@/firebase/firebaseConfig.js'
import {collection, onSnapshot, query, where} from 'firebase/firestore'
import {useAuthStore} from '@/stores/firebase/AuthStore'

export const useAllTasksStore = defineStore('allTasksStore', () => {
  const authStore = useAuthStore()
  const tasks = ref([])
  const isLoading = ref(true)

  const subscribeToTasks = () => {
    if (!authStore.user) {
      isLoading.value = false
      return
    }
    const q = query(
        collection(db, 'tasks'),
        where('userId', '==', authStore.user.uid)
    )
    return onSnapshot(q, (querySnapshot) => {
      tasks.value = querySnapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          title: data.title,
          description: data.description,
          isTaskInFavorites: data.isFavorite,
          category: data.category,
          priority: data.priority,
          startDate: data.startDate?.toDate(),
          endDate: data.endDate?.toDate(),
          isTaskCompleted: data.completed
        }
      })
      isLoading.value = false
    }, (error) => {
      console.error('Ошибка загрузки задач:', error)
      isLoading.value = false
    })
  }

  return { tasks, isLoading, subscribeToTasks }
})