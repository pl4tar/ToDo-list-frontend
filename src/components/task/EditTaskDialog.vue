<template>
  <v-dialog
    persistent
    transition="dialog-top-transition"
    v-model="isDialogShown"
    max-width="800"
  >
    <v-card class="pa-4 pb-10 rounded-lg editDialog bg-background-light">
      <v-form ref="taskForm">
        <v-text-field
          label="Название*"
          clearable
          variant="underlined"
          v-model="formData.title"
          :rules="titleRules"
          required
          @input="checkChanges"
        >
          <template v-slot:prepend>
            <v-icon
              icon="mdi-pencil"
              color="primary" />
          </template>
        </v-text-field>

        <v-textarea
          label="Описание"
          clearable
          v-model="formData.description"
          @input="checkChanges"
        />

        <v-switch
          inset
          class="d-flex mb-2 align-center justify-center"
          color="primary"
          v-model="formData.isFavorite"
          @change="checkChanges"
        >
          <template v-slot:append>
            <span class="text-primary font-weight-bold">
              {{ formData.isFavorite ? "В избранном" : "Добавить в избранное" }}
            </span>
          </template>
        </v-switch>

        <v-select
          class="mb-2"
          label="Категория"
          chips
          :items="filteredCategories"
          v-model="formData.category"
          @update:modelValue="checkChanges"
        />

        <div class="d-flex flex-column ga-1 mb-5 align-center">
          <p class="text-primary font-weight-bold">Приоритет</p>
          <v-chip-group
            filter
            selected-class="elevation-7 font-weight-bold"
            v-model="selectedPriorityIndex"
            mandatory
            class="justify-center"
            @update:modelValue="checkChanges"
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
          class="mx-6 pa-4 mb-5 bg-background-dark rounded-lg elevation-5 text-center"
        >
          <p class="text-primary font-weight-bold mb-3">
            Даты выполнения
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
                @click="openDateDialog('start')"
              />
              <v-btn
                class="align-self-center rounded-xl w-75"
                color="primary"
                prepend-icon="mdi-calendar"
                text="Конец"
                variant="outlined"
                density="compact"
                @click="openDateDialog('end')"
              />
            </div>
            <div
              class="d-flex flex-column flex-md-row justify-center ga-1 align-center mb-3"
            >
              <v-chip
                v-if="formData.startDate"
                class="elevation-4 bg-green text-center"
              >
                {{ formatDisplayDate(formData.startDate) }}
              </v-chip>
              <span v-if="formData.startDate && formData.endDate">-</span>
              <v-chip
                v-if="formData.endDate"
                class="elevation-4 bg-primary">
                {{ formatDisplayDate(formData.endDate) }}
              </v-chip>
            </div>
            <v-dialog
              v-model="isDatePickerOpen"
              max-width="400"
              persistent>
              <v-card class="pa-4 bg-background-dark rounded-lg">
                <v-date-picker
                  v-model="currentDate"
                  color="primary"
                  full-width
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
                      @click="closeDatePicker"
                      class="mr-2"
                    >
                      Отмена
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
            @click="closeDialog"
          />
          <v-btn
            color="primary"
            text="Сохранить"
            class="elevation-5 w-50"
            :loading="isLoading"
            :disabled="!hasChanges || formData.title.length < 3"
            @click="handleSubmit"
          >
            <template v-slot:prepend>
              <v-icon icon="mdi-content-save" />
            </template>
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { Timestamp } from 'firebase/firestore';
import { useTaskConfigStore } from '@/stores/TaskConfigStore';
import { useTaskStore } from '@/stores/TaskStore';
import { useMenuStore } from '@/stores/MenuStore';
import { useWarningStore } from '@/stores/WarningStore';

const props = defineProps({
  modelValue: Boolean,
  task: {
    type: Object,
    required: true,
    validator: (task) => task?.id
  }
});

const emit = defineEmits(['update:modelValue', 'updated']);

const TaskConfigStore = useTaskConfigStore();
const MenuStore = useMenuStore();
const TaskStore = useTaskStore();
const WarningStore = useWarningStore();

const isLoading = ref(false);
const hasChanges = ref(false);
const selectedPriorityIndex = ref(0);
const initialPriorityIndex = ref(0);
const isDatePickerOpen = ref(false);
const currentDate = ref(new Date());
const selectedDateType = ref('');

const formData = ref({
  title: '',
  description: '',
  isFavorite: false,
  category: null,
  startDate: null,
  endDate: null
});

const initialData = ref({});

const titleRules = [
  v => (v && v.length >= 3) || 'Минимум 3 символа'
];

const filteredCategories = computed(() =>
    MenuStore.categories.filter(
        (category) => category.value !== 'all' && category.value !== 'newCategory',
    ),
);

const formatDisplayDate = (date) => {
  if (!date) {return '';}
  const d = new Date(date);
  return isNaN(d.getTime()) ? 'Некорректная дата' : d.toLocaleDateString('ru-RU');
};

const parseFirestoreDate = (date) => {
  if (!date) {return null;}
  if (date instanceof Timestamp) {
    return date.toDate();
  }
  if (date.seconds) {
    return new Date(date.seconds * 1000);
  }
  return new Date(date);
};

const prepareDateForFirestore = (date) => {
  if (!date) {return null;}
  const d = new Date(date);
  return isNaN(d.getTime()) ? null : d;
};

const isDialogShown = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});
watch(() => props.modelValue, (newVal) => {
  if (newVal && props.task) {
    formData.value = {
      title: props.task.title || '',
      description: props.task.description || '',
      isFavorite: props.task.isTaskInFavorites || false,
      category: props.task.category || null,
      startDate: parseFirestoreDate(props.task.startDate),
      endDate: parseFirestoreDate(props.task.endDate)
    };

    initialData.value = JSON.parse(JSON.stringify(formData.value));

    const priorityIndex = TaskConfigStore.priorities.findIndex(
        p => p.value === props.task.priority
    );
    selectedPriorityIndex.value = Math.max(priorityIndex, 0);
    initialPriorityIndex.value = selectedPriorityIndex.value;

    checkChanges();
  }
});

const openDateDialog = (type) => {
  selectedDateType.value = type;
  currentDate.value = type === 'start'
      ? (formData.value.startDate || new Date())
      : (formData.value.endDate || new Date());
  isDatePickerOpen.value = true;
};

const selectToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  currentDate.value = today;
};

const saveDate = () => {
  if (selectedDateType.value === 'start') {
    formData.value.startDate = new Date(currentDate.value);
  } else if (selectedDateType.value === 'end') {
    formData.value.endDate = new Date(currentDate.value);
  }
  isDatePickerOpen.value = false;
  checkChanges();
};

const closeDatePicker = () => {
  isDatePickerOpen.value = false;
};

const checkChanges = () => {
  const formChanged = JSON.stringify(formData.value) !== JSON.stringify(initialData.value);
  const priorityChanged = selectedPriorityIndex.value !== initialPriorityIndex.value;
  hasChanges.value = formChanged || priorityChanged;
};

const closeDialog = () => {
  isDialogShown.value = false;
};

const handleSubmit = async () => {
  if (!hasChanges.value || formData.value.title.length < 3) {return;}

  isLoading.value = true;

  try {
    const priorityData = TaskConfigStore.priorities[selectedPriorityIndex.value];

    const updatedData = {
      title: formData.value.title,
      description: formData.value.description || null,
      isFavorite: formData.value.isFavorite,
      category: formData.value.category,
      priority: priorityData.value,
      priorityTitle: priorityData.title,
      priorityColor: priorityData.color,
      updatedAt: Timestamp.now()
    };

    const startDate = prepareDateForFirestore(formData.value.startDate);
    if (startDate) {
      updatedData.startDate = Timestamp.fromDate(startDate);
    } else {
      updatedData.startDate = null;
    }

    const endDate = prepareDateForFirestore(formData.value.endDate);
    if (endDate) {
      updatedData.endDate = Timestamp.fromDate(endDate);
    } else {
      updatedData.endDate = null;
    }

    await TaskStore.updateTask(props.task.id, updatedData);
    emit('updated');
    closeDialog();
  } catch (error) {
    console.error('Ошибка обновления:', error);
    WarningStore.showWarning('Не удалось обновить задачу');
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.editDialog {
  width: 65%;
  margin: 0 auto;
}

@media (min-width: 1800px) {
  .editDialog {
    width: 50%;
  }
}

@media (max-width: 500px) {
  .editDialog {
    width: 100%;
  }
}

.dialog_btn_wrapper {
  margin-top: 20px;
}

</style>