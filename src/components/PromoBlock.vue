<template>
  <div class="auth-promo">
    <v-card-text class="text-white text-center">
      <h3 class="text-center mb-4">{{ title }}</h3>
      <h5 class="text-center">
        {{ description }}
      </h5>
    </v-card-text>
    <div class="text-center mt-6">
      <v-btn
        tile
        outlined
        color="warning"
        @click="$emit('button-click')"
      >
        {{ buttonText }}
      </v-btn>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  buttonText: String
});

defineEmits(['button-click']);
</script>

<style scoped>
.auth-promo {
  padding: 60px 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (min-width: 960px) {
  .auth-promo {
    padding: 180px 0;
  }
}
</style>