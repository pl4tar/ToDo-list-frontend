<template>
  <v-dialog
    v-model="model"
    max-width="400">
    <v-card
      class="bg-background-light pa-2"
      prepend-icon="mdi-logout"
      text="Вы уверены, что хотите выйти?"
      title="Подтвердите выход"
    >
      <template v-slot:actions>
        <v-btn
          class="text-primary elevation-8"
          variant="tonal"
          text="Выйти"
          @click="confirmLogout"
        />
        <v-btn
          class="bg-primary elevation-8"
          variant="flat"
          text="Отмена"
          @click="model = false"
        />
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
const model = defineModel();
const emit = defineEmits(['confirm']);

function confirmLogout() {
  emit('confirm');
  model.value = false;
}
</script>
