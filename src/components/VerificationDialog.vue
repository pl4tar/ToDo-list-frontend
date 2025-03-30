<template>
  <v-dialog
    v-model="model"
    max-width="400"
    persistent
  >
    <v-card class="pa-8 bg-background">
      <div class="mb-4 text-center text-body-1">
        <slot />
      </div>
      <v-btn
        class="bg-primary"
        @click="model = false"
      >
        Ок 
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script setup>
const model = defineModel();
</script>

<style scoped>
.dialog {
  position: absolute;
  bottom: 20px;
  left: 25%;
}
</style>
