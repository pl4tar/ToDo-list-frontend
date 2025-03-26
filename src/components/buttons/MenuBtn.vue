<template>
  <v-btn
    v-if="!MenuStore.isNavShown"
    size="x-large"
    icon="mdi-view-headline"
    class="cursor-pointer elevation-0 mt-5 ml-5 position-absolute left-0 top-0"
    variant="plain"
    @click="MenuStore.isNavShown = true"
  />
</template>

<script setup>
import { watch } from 'vue';
import { useWindowSize } from '@vueuse/core';
import { useMenuStore } from '@/stores/MenuStore';

const MenuStore = useMenuStore()

const { width } = useWindowSize();

watch(width, (newWidth) => {
  MenuStore.isNavShown = newWidth <= 1100 ? false : true;
});
</script>