<template>
  <v-app-bar 
    class="bg-background-dark py-3 px-5" 
    :elevation="5"
  >
    <v-app-bar-title>
      <div class="d-flex justify-space-between align-center">
        <AppLogo/>
        <ToggleThemeBtn/>
      </div>  
    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup>
import AppLogo from '@/components/navigation/AppLogo.vue'
import ToggleThemeBtn from '@/components/buttons/ToggleThemeBtn.vue'
</script>