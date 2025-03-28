<template>
  <v-dialog
    persistent
    transition="dialog-top-transition"
    v-model="TaskStore.isDialogShown"
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
      <v-text-field
        label="Название"
        clearable
        variant="underlined"
        v-model="TaskStore.titleTask"
      >
        <template v-slot:prepend>
          <v-icon
            icon="mdi-plus"
            color="primary" 
          />
        </template>
      </v-text-field>
      <v-textarea
        label="Описание"
        clearable
        v-model="TaskStore.descriptionTask" />
      <v-switch
        inset
        class="d-flex mb-2 align-center justify-center"
        color="primary"
        v-model="TaskStore.isTaskInFavorites"
      >
        <template v-slot:append>
          <span class="text-primary font-weight-bold">
            {{ TaskStore.isTaskInFavorites ? "В избранном" : "Добавить в избранное" }}
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
        >
          <v-chip
            v-for="priority in TaskConfigStore.priorities"
            variant="elevated"
            :key="priority.title"
            :color="priority.color"
            :text="priority.title"
          />
        </v-chip-group>
      </div>
      <v-sheet
        class="mx-6 pa-4 mb-5 bg-background-dark rounded-lg elevation-5 text-center"
      >
        <p class="text-primary font-weight-bold mb-3">
          Укажите дату выполнения задачи или добавьте дедлайн, выбрав дату
          окончания
        </p>
        <div class="d-flex flex-column align-center justify-center">
          <div class="d-flex flex-column flex-md-row justify-center ga-3 mb-3">
            <v-btn
              class="align-self-center rounded-xl w-75 px-8"
              color="green"
              prepend-icon="mdi-calendar"
              text="Начало"
              variant="outlined"
              density="compact"
              @click="TaskStore.openDialogDate('start')"
            />
            <v-btn
              class="align-self-center rounded-xl w-75"
              color="primary"
              prepend-icon="mdi-calendar"
              text="Конец"
              variant="outlined"
              density="compact"
              @click="TaskStore.openDialogDate('end')"
            />
          </div>
          <div
            class="d-flex flex-column flex-md-row justify-center ga-1 align-center mb-3"
          >
            <v-chip
              v-if="TaskStore.startDate"
              class="elevation-4 bg-green text-center"
            >
              {{ formatDate(TaskStore.startDate) }}
            </v-chip>
            <span v-if="TaskStore.startDate && TaskStore.endDate">-</span>
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
      <div class="d-flex flex-column ga-5 justify-center align-center dialog_btn_wrapper">
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
          @click="TaskStore.addNewTask()"
        >
          <template v-slot:prepend>
            <v-icon icon="mdi-check" />
          </template>
        </v-btn>
      </div>
    </v-card> 
  </v-dialog>
</template>

<script setup>
import { computed } from 'vue';
import { useTaskConfigStore } from '@/stores/TaskConfigStore';
import { useTaskStore } from '@/stores/TaskStore';
import DatePicker from '@/components/DatePicker.vue';
import { useFormatDate } from '@/composables/useFormatDate';
import { useMenuStore } from '@/stores/MenuStore';

const TaskConfigStore = useTaskConfigStore();
const MenuStore = useMenuStore()
const TaskStore = useTaskStore();

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

</script>

<style lang="scss" scoped>
.addDialog {
  width: 65%;
  margin: 0 auto;
}

@media (min-width: 1800px) {
  .addDialog {
    width: 50%;
  }
}

@media (max-width: 500px) {
  .addDialog {
    width: 100%;
  }
}
</style>
