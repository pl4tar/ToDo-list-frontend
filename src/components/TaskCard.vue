<template>
  <div class="d-flex align-center ga-3 mb-5">
    <v-card
      class="w-100 bg-background-light rounded-lg elevation-10 pr-3"
      @click="isDialogDetailsOpen = true"
    >
      <v-card-title class="flex-center">
        {{ task.title }}
      </v-card-title>
      <v-divider />
      <div class="pa-3">
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
        <div class="d-flex align-center justify-space-between direction-column">
          <div
            class="d-flex ga-5 flex-wrap align-center justify-space-between ga-2 mb-2"
          >
            <v-btn
              size="small"
              class="bg-green width-100"
              text="Выполнить"
              @click.stop
            >
              <template v-slot:prepend>
                <v-icon icon="mdi-check-all" />
              </template>
            </v-btn>
            <v-btn
              variant="tonal"
              size="small"
              class="text-secondary elevation-3 width-100"
              prepend-icon="mdi-pencil"
              text="Изменить"
              @click.stop
            />
          </div>
          <v-tooltip text="Удалить">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="text"
                class="bg-background-light text-error elevation-0"
                icon="mdi-delete-empty"
                @click.stop
              />
            </template>
          </v-tooltip>
        </div>
      </div>
    </v-card>
    <v-dialog
      v-model="isDialogDetailsOpen"
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
                  v-if="task.category"
                  class="elevation-1 mb-2"
                  variant="elevated"
                  :color="getCategoryData(task.category, 'iconColor')"
                >
                  {{ getCategoryData(task.category, "title") }}
                </v-chip>
              </div>
              <v-divider class="mb-4" />
              <div>
                <p class="mb-1">Приоритет</p>
                <v-chip
                  v-if="task.category"
                  class="elevation-1 mb-2"
                  variant="elevated"
                  :color="getPriorityColor(task.priority, 'color')"
                >
                  {{ getPriorityColor(task.priority, "title") }}
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
                      :icon="
                        task.isTaskInFavorites ? 'mdi-close-thick' : 'mdi-plus'
                      "
                    />
                  </template>
                </v-btn>
              </div>
            </div>
          </v-sheet>
        </div>
      </v-sheet>
    </v-dialog>
  </div>
</template>

<script setup>
import { useFormatDate } from '@/composables/useFormatDate';
import { useTaskConfigStore } from '@/stores/TaskConfigStore';
import { ref } from 'vue';

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const TaskConfigStore = useTaskConfigStore();

const { formatDate } = useFormatDate();

function getCategoryData(categoryTask, parameter) {
  const category = TaskConfigStore.categories.find(
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

const isDialogDetailsOpen = ref(false);
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
