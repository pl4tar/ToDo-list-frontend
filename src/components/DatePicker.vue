<template>
  <v-dialog
    persistent
    transition="dialog-top-transition"
    v-model="TaskStore.isDialogDateOpen"
    max-width="400"
  >
    <v-card class="pa-4 bg-background-dark rounded-lg">
      <v-date-picker
        v-model="selectedDate"
        color="primary"
        full-width
        :min="minDate"
        :max="maxDate"
        :allowed-dates="allowedDates"
      ></v-date-picker>

      <div class="d-flex justify-space-between mt-4">
        <v-btn
          color="primary"
          variant="tonal"
          @click="selectToday"
        >
          Сегодня
        </v-btn>

        <div>
          <v-btn
            color="primary"
            variant="tonal"
            @click="TaskStore.closeDialogDate()"
            class="mr-2"
          >
            Закрыть
          </v-btn>
          <v-btn
            color="primary"
            @click="saveDate"
          >
            Сохранить
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useTaskStore } from '@/stores/TaskStore';
import { ref, computed} from 'vue';

const TaskStore = useTaskStore();
const minDate = ref(new Date());
minDate.value.setDate(minDate.value.getDate() - 1); // Можно выбрать вчерашнюю дату

// Максимальная дата (необязательно)
const maxDate = ref(null);

// Разрешить выбор текущей даты
const allowedDates = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const pickerDate = new Date(date);
  return pickerDate >= minDate.value || pickerDate.toDateString() === today.toDateString();
};

const emit = defineEmits(['update:selectedDate', 'save']);

const selectedDate = computed({
  get() {
    return TaskStore.currentDate;
  },
  set(value) {
    TaskStore.currentDate = value;
  }
});

// Выбор текущей даты
const selectToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  selectedDate.value = today;
};

const saveDate = () => {
  if (TaskStore.selectedDateType === 'start') {
    TaskStore.startDate = selectedDate.value;
  } else if (TaskStore.selectedDateType === 'end') {
    TaskStore.endDate = selectedDate.value;
  }
  TaskStore.closeDialogDate();
};
</script>

<style scoped>
/* Добавляем отступы для кнопок на мобильных */
@media (max-width: 400px) {
  .d-flex.justify-space-between {
    flex-direction: column;
    gap: 12px;
  }

  .d-flex.justify-space-between > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}
</style>