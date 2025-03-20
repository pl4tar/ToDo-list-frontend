<template>
  <v-icon
    v-if="!isNavShown"
    size="x-large"
    class="cursor-pointer pa-8"
    color="grey"
    icon="mdi-view-headline"
    aria-label="Открыть меню"
    @click="isNavShown = true"
  />

  <v-layout>
    <AppNavigation />
    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup>
import AppNavigation from '@/components/AppNavigation.vue';
import { ref, watch, provide } from 'vue';
import { useWindowSize } from '@vueuse/core';

const isNavShown = ref(true);

const { width } = useWindowSize();

function changeShown(value) {
  isNavShown.value = value;
}

watch(width, (newWidth) => {
  isNavShown.value = newWidth <= 850 ? false : true;
});

provide('isNavShown', isNavShown);
provide('changeShown', changeShown);
</script>
