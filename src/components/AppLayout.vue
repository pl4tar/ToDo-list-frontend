<template>
  <v-layout>
    <AppNavigation />
    <v-main>
      <v-container class="pa-10">
        <v-btn
          v-if="!isNavShown"
          size="x-large"
          icon="mdi-view-headline"
          class="cursor-pointer elevation-0 mt-5 ml-10 position-absolute left-0 top-0"
          variant="plain"
          @click="isNavShown = true"
        >
        </v-btn>
        <v-btn
          size="x-large"
          icon="mdi-theme-light-dark"
          variant="plain"
          class="elevation-0 position-absolute right-0 top-0 mt-5 mr-10 cursor-pointer"
          @click="toggleTheme"
        >
        </v-btn>
        <RouterView class="mt-10" />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup>
import AppNavigation from '@/components/AppNavigation.vue';
import { ref, watch, provide, onMounted } from 'vue';
import { useWindowSize } from '@vueuse/core';
import { useTheme } from 'vuetify';

const theme = useTheme();

function toggleTheme() {
  const newTheme =
    theme.global.name.value === 'darkTheme' ? 'lightTheme' : 'darkTheme';
  theme.global.name.value = newTheme;
  localStorage.setItem('theme', newTheme);
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    theme.global.name.value = savedTheme;
  }
});

const isNavShown = ref(true);

const { width } = useWindowSize();

function changeShown(value) {
  isNavShown.value = value;
}

watch(width, (newWidth) => {
  isNavShown.value = newWidth <= 1100 ? false : true;
});

provide('isNavShown', isNavShown);
provide('changeShown', changeShown);
</script>
