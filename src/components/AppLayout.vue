<template>
  <v-layout>
    <AppNavigation />
    <v-main>
      <v-container class="pa-10">
        <MenuBtn />
        <ToggleThemeBtn />
        <RouterView class="mt-10" />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup>
import AppNavigation from '@/components/navigation/AppNavigation.vue';
import ToggleThemeBtn from '@/components/buttons/ToggleThemeBtn.vue';
import MenuBtn from '@/components/buttons/MenuBtn.vue';
</script>
