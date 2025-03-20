<template>
  <v-dialog
    persistent
    transition="dialog-top-transition"
    v-model="TaskStore.isDialogDateOpen"
  >
    <v-row justify="center">
      <v-sheet class="pa-5 pb-1 bg-background-dark rounded-xl elevation-10">
        <v-container>
          <v-row
            justify="center"
            class="mb-6">
            <v-date-picker
              color="primary"
              landscape
              class="elevation-10 rounded-xl"
              bg-color="background-light"
              :min="minDate"
            />
          </v-row>
          <div class="d-flex flex-column">
            <v-btn
              class="align-self-end rounded-xl"
              color="primary"
              text="Сохранить"
              @click="saveDate"
            />
          </div>
        </v-container>
      </v-sheet>
    </v-row>
  </v-dialog>
</template>

<script setup>
import { useTaskStore } from '@/stores/TaskStore';
import { ref, computed } from 'vue';

const props = defineProps({
  selectedDate: {
    type: String, 
    default: null,
  },
})

const TaskStore = useTaskStore()

const minDate = ref(new Date())
minDate.value.setDate(minDate.value.getDate() - 1)

const emit = defineEmits(['update:selectedDate', 'save']);

const selectedDate = computed({
  get() {
    return props.selectedDate;
  },
  set(value) {
    emit('update:selectedDate', value);
  },
});

const saveDate = () => {
  emit('save', selectedDate.value)
  TaskStore.closeDialogDate()
};
</script>