<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    width="auto"
  >
    <v-card
      min-width="250"
      class="bg-background-light pa-4 elevation-10 rounded-lg"
    >
      <v-card-title class="mb-3 text-center">Удалить задачу?</v-card-title>
      <v-card-actions class="d-flex flex-wrap justify-space-around">
        <v-btn
          variant="flat"
          text="Закрыть"
          class="px-3"
          color="warning"
          @click="$emit('update:modelValue', false)"
          :disabled="isLoading"
        />
        <v-btn
          color="error"
          text="Удалить"
          variant="flat"
          class="px-3"
          @click="handleDelete"
          :loading="isLoading"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  taskId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue', 'confirm']);
const isLoading = ref(false);

const handleDelete = async () => {
  isLoading.value = true;
  try {
    emit('confirm'); // Отправляем событие подтверждения
    emit('update:modelValue', false); // Закрываем диалог
  } catch (error) {
    console.error('Ошибка при удалении:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>