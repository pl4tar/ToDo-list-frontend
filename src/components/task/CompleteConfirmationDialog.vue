<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :width="$vuetify.display.mobile ? '90%' : '400'"
    persistent
    transition="dialog-bottom-transition"
  >
    <v-card
      class="bg-background-light rounded-lg overflow-hidden"
      :class="{'rounded-0': $vuetify.display.mobile}">
      <transition
        name="fade-transform"
        mode="out-in"
      >
        <div
          v-if="step === 1"
          key="confirm"
          class="pa-4 pa-sm-6 text-center"
        >
          <v-icon
            icon="mdi-check-circle-outline"
            :size="$vuetify.display.mobile ? 56 : 72"
            color="primary"
            class="mb-2 mb-sm-4"
          />
          <v-card-title
            class="mb-1 mb-sm-2"
            :class="$vuetify.display.mobile ? 'text-h6' : 'text-h5'">
            Подтвердить выполнение?
          </v-card-title>
          <v-card-actions class="justify-center mt-4 mt-sm-6 gap-2 flex-column flex-sm-row">
            <v-btn
              color="grey"
              variant="text"
              @click="$emit('update:modelValue', false)"
              class="action-btn"
              block
            >
              Отмена
            </v-btn>
            <v-btn
              color="primary"
              variant="flat"
              @click="startCompletion"
              :loading="isLoading"
              class="action-btn"
              block
            >
              Подтвердить
            </v-btn>
          </v-card-actions>
        </div>
        <div
          v-else
          key="progress"
          class="pa-4 pa-sm-6 text-center"
        >
          <v-progress-circular
            :size="$vuetify.display.mobile ? 80 : 100"
            :width="5"
            indeterminate
            color="primary"
            class="mb-2 mb-sm-4"
          />
          <v-card-title
            class="mb-1"
            :class="$vuetify.display.mobile ? 'text-subtitle-1' : 'text-h6'">
            Выполняем задачу...
          </v-card-title>
          <v-card-subtitle>Пожалуйста, подождите</v-card-subtitle>
        </div>
      </transition>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';

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
const step = ref(1); // 1=подтверждение, 2=выполнение
let closeTimeout;

const startCompletion = async () => {
  isLoading.value = true;
  step.value = 2;
  await new Promise(resolve => setTimeout(resolve, 1500));
  emit('confirm');
  isLoading.value = false;
  resetDialog();
  emit('update:modelValue', false);
};

const resetDialog = () => {
  step.value = 1;
  clearTimeout(closeTimeout);
};

watch(() => props.modelValue, (newVal) => {
  if (!newVal) {
    resetDialog();
  }
});
</script>

<style scoped>


.action-btn {
  margin: 0;
  min-width: unset;
}

@media (max-width: 600px) {

  .action-btn {
    width: 100%;
  }
}

@media (min-width: 601px) {

  .action-btn {
    min-width: 120px;
  }
}
</style>