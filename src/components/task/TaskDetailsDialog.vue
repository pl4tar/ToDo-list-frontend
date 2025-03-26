<template>
  <v-dialog
    class="auto bg-dialog"
    max-width="800"
  >
    <v-sheet class="bg-background-dark">
      <p class="px-8 py-3 bg-background-dark text-grey text-center">
        Описание задачи
      </p>
      <v-divider />
      <div class="d-flex rounded-lg elevation-10 bg-background-dark">
        <v-sheet class="bg-background-dark px-8 py-5 w-60">
          <p class="mb-2 text-secondary text-h6">{{ task.title }}</p>
          <p class="text-body-1 text-justify">{{ task.description }}</p>
        </v-sheet>
        <v-sheet class="ga-2 bg-background-light pa-5 w-40">
          <div class="text-grey text-center mb-3">
            <div>
              <p class="mb-1">Категория</p>
              <v-chip
                class="elevation-1 mb-2"
                variant="elevated"
                :color="getCategoryData(task.category, 'iconColor')"
              >
                {{ getCategoryData(task.category, "title") || 'Не задано'}}
              </v-chip>
            </div>
            <v-divider class="mb-4" />
            <div>
              <p class="mb-1">Приоритет</p>
              <v-chip    
                class="elevation-1 mb-2"
                variant="elevated"
                :color="getPriorityColor(task.priority, 'color')"
              >
                {{ getPriorityColor(task.priority, "title") || 'Не задано'}}
              </v-chip>
            </div>
            <v-divider class="mb-4" />
            <div>
              <p class="mb-1">Избранное</p>
              <v-btn
                variant="flat"
                size="small"
                class="bg-primary rounded-xl text-body-1 elevation-5"
                :text="task.isTaskInFavorites ? 'Удалить' : 'Добавить'"
              >
                <template v-slot:prepend>
                  <v-icon
                    :icon="task.isTaskInFavorites ? 'mdi-close-thick' : 'mdi-plus'"
                  />
                </template>
              </v-btn>
            </div>
          </div>
        </v-sheet>
      </div>
    </v-sheet>
  </v-dialog>
</template>

<script setup>
import { useMenuStore } from '@/stores/MenuStore';
import { useTaskConfigStore } from '@/stores/TaskConfigStore';

defineProps({
  task: {
    type: Object,
    required: true
  }
})

const MenuStore = useMenuStore()
const TaskConfigStore = useTaskConfigStore();

function getCategoryData(categoryTask, parameter) {
  const category = MenuStore.categories.find(
    (category) => categoryTask === category.value,
  );
  return category ? category[parameter] : null;
}

function getPriorityColor(priorityTask, parameter) {
  const priority = TaskConfigStore.priorities.find(
    (priority) => priorityTask === priority.value,
  );
  return priority ? priority[parameter] : null;
}
</script>