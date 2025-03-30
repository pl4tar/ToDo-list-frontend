<template>
  <v-dialog
    v-model="WarningStore.isWarningShow"
    width="auto">
    <v-card
      max-width="400"
      prepend-icon="$error"
      title="Ошибка"
      color="warning"
      :text="warningText"
    >
      <template v-slot:actions>
        <v-btn
          class="ms-auto"
          text="Ок"
          @click="WarningStore.isWarningShow = false"
        />
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useWarningStore } from '@/stores/WarningStore';
import { computed } from 'vue';

const WarningStore = useWarningStore();
const warningText = computed(() => WarningStore.warningText);
</script>
