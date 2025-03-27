<template>
  <v-layout>
    <AppNavigation />
    <v-main>
      <v-container class="pa-10">
        <MenuBtn class="mt-5 ml-5 position-absolute left-0 top-0"/>
        <ToggleThemeBtn class="position-absolute right-0 top-0 mt-5 mr-5"/>
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
