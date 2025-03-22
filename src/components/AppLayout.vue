<template>
  <v-layout>
    <AppNavigation />
    <v-main class="pt-10">
      <v-container class="pa-10">
        <v-icon
          v-if="!isNavShown"
          size="x-large"
          class="cursor-pointer pt-10 pl-10 icon-open"
          color="grey"
          icon="mdi-view-headline"
          @click="isNavShown = true"
        />
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
  isNavShown.value = newWidth <= 1100 ? false : true;
});

provide('isNavShown', isNavShown);
provide('changeShown', changeShown);
</script>

<style scoped>
.icon-open {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
