<template>
  <v-dialog
    persistent
    transition="dialog-top-transition"
    v-model="TaskStore.isDialogShown"
    max-width="800"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="primary"
        class="cursor-pointer"
        prepend-icon="mdi-pencil-plus"
      >
        Новая задача
      </v-btn>
    </template>
    <v-card class="pa-4 pb-10 rounded-lg addDialog bg-background-light">
      <v-form
        ref="taskForm"
        @submit.prevent="addTask">
        <v-text-field
          label="Название"
          clearable
          variant="underlined"
          v-model="TaskStore.titleTask"
          :rules="titleRules"
          required
        >
          <template v-slot:prepend>
            <v-icon
              icon="mdi-plus"
              color="primary" />
          </template>
        </v-text-field>

        <v-textarea
          label="Описание"
          clearable
          v-model="TaskStore.descriptionTask"
        />

        <v-switch
          inset
          class="d-flex mb-2 align-center justify-center"
          color="primary"
          v-model="TaskStore.isTaskInFavorites"
        >
          <template v-slot:append>
            <span class="text-primary font-weight-bold">
              {{
                TaskStore.isTaskInFavorites
                  ? "В избранном"
                  : "Добавить в избранное"
              }}
            </span>
          </template>
        </v-switch>

        <v-select
          class="mb-2"
          label="Категория"
          chips
          :items="filteredCategories"
          v-model="TaskStore.selectedCategory"
        />

        <div class="d-flex flex-column ga-1 mb-5 align-center">
          <p class="text-primary font-weight-bold">Укажите приоритет</p>
          <v-chip-group
            filter
            selected-class="elevation-7 font-weight-bold"
            v-model="TaskStore.selectedPriority"
            mandatory
            class="justify-center"
          >
            <v-chip
              v-for="(priority, index) in TaskConfigStore.priorities"
              :key="index"
              :value="index"
              variant="elevated"
              :color="priority.color"
              class="mx-1"
              :class="{'px-4': $vuetify.display.mobile}"
            >
              {{ priority.title }}
            </v-chip>
          </v-chip-group>
        </div>

        <v-sheet
          class="date-block mx-auto pa-4 mb-5 bg-background-dark rounded-lg elevation-5 text-center"
        >
          <p class="text-primary font-weight-bold mb-3">
            Укажите дату выполнения задачи
          </p>
          <div class="date-content">
            <div class="date-buttons">
              <v-btn
                class="date-btn"
                color="green"
                prepend-icon="mdi-calendar"
                text="Начало"
                variant="outlined"
                density="compact"
                @click="TaskStore.openDialogDate('start')"
              />
              <v-btn
                class="date-btn"
                color="primary"
                prepend-icon="mdi-calendar"
                text="Конец"
                variant="outlined"
                density="compact"
                @click="TaskStore.openDialogDate('end')"
              />
            </div>
            <div class="date-chips">
              <v-chip
                v-if="TaskStore.startDate"
                class="elevation-4 bg-green"
              >
                {{ formatDate(TaskStore.startDate) }}
              </v-chip>
              <span
                v-if="TaskStore.startDate && TaskStore.endDate"
                class="mx-2">-</span>
              <v-chip
                v-if="TaskStore.endDate"
                class="elevation-4 bg-primary">
                {{ formatDate(TaskStore.endDate) }}
              </v-chip>
            </div>
            <DatePicker
              v-model:selectedDate="TaskStore.currentDate"
              @save="handleDateSave"
            />
          </div>
        </v-sheet>

        <div
          class="d-flex flex-column ga-5 justify-center align-center dialog_btn_wrapper"
        >
          <v-btn
            color="primary"
            text="Закрыть"
            class="elevation-5 w-50"
            variant="tonal"
            @click="TaskStore.closeDialog()"
          />
          <v-btn
            color="primary"
            text="Готово"
            class="elevation-5 w-50"
            type="submit"
            :loading="isLoading"
            :disabled="!TaskStore.titleTask"
          >
            <template v-slot:prepend>
              <v-icon icon="mdi-check" />
            </template>
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useTaskConfigStore } from '@/stores/TaskConfigStore';
import { useTaskStore } from '@/stores/TaskStore';
import DatePicker from '@/components/DatePicker.vue';
import { useFormatDate } from '@/composables/useFormatDate';
import { useMenuStore } from '@/stores/MenuStore';

const TaskConfigStore = useTaskConfigStore();
const MenuStore = useMenuStore();
const TaskStore = useTaskStore();
const isLoading = ref(false);
const taskForm = ref(null);

const titleRules = [
  v => !!v || 'Название обязательно',
  v => (v && v.length >= 3) || 'Название должно содержать минимум 3 символа'
];

const { formatDate } = useFormatDate();

const filteredCategories = computed(() =>
    MenuStore.categories.filter(
        (category) => category.value !== 'all' && category.value !== 'newCategory',
    ),
);

const handleDateSave = (date) => {
  if (TaskStore.selectedDateType === 'start') {
    TaskStore.startDate = date;
  } else if (TaskStore.selectedDateType === 'end') {
    TaskStore.endDate = date;
  }
  TaskStore.isDialogDateOpen = false;
  TaskStore.currentDate = null;
};

const addTask = async () => {
  const { valid } = await taskForm.value.validate();

  if (!valid) {
    return;
  }

  isLoading.value = true;
  try {
    await TaskStore.addNewTask();
  } catch (error) {
    console.error('Ошибка при добавлении задачи:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.addDialog {
  width: 65%;
  margin: 0 auto;
}

.date-block {
  width: calc(100% - 32px);
  max-width: 100%;
}

.date-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.date-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  width: 100%;
  margin-bottom: 16px;
}

.date-btn {
  min-width: 120px;
  flex: 1 1 calc(50% - 12px);
  max-width: 200px;
}

.date-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  width: 100%;
}

@media (max-width: 960px) {
  .addDialog {
    width: 75%;
  }
}

@media (max-width: 768px) {
  .addDialog {
    width: 85%;
  }

  .date-btn {
    flex: 1 1 100%;
    max-width: none;
  }
}

@media (max-width: 500px) {
  .addDialog {
    width: 95%;
    padding: 12px;
  }

  .date-block {
    width: calc(100% - 16px);
    padding: 12px;
  }
}
</style>