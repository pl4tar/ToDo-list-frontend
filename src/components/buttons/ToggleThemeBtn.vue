<template>
  <v-btn
    size="x-large"
    icon="mdi-theme-light-dark"
    variant="plain"
    class="elevation-0 position-absolute right-0 top-0 mt-5 mr-5 cursor-pointer"
    @click="toggleTheme"
  />
</template>

<script setup>
import { useTheme } from 'vuetify';
import {onMounted} from 'vue';

const theme = useTheme();

function toggleTheme() {
  const newTheme = theme.global.name.value === 'darkTheme' ? 'lightTheme' : 'darkTheme';
    theme.global.name.value = newTheme;
    localStorage.setItem('theme', newTheme);
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    theme.global.name.value = savedTheme;
  }
});
</script>