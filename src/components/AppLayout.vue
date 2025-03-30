<template>
  <v-layout>
    <AppNavigation />
    <v-main>
      <v-container class="pa-10">
        <MenuBtn />
        <ToggleThemeBtn />
        <router-view
          v-slot="{ Component }"
          class="mt-10">
          <transition
            name="fade-transform"
            mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup>
import AppNavigation from '@/components/navigation/AppNavigation.vue';
import ToggleThemeBtn from '@/components/buttons/ToggleThemeBtn.vue';
import MenuBtn from '@/components/buttons/MenuBtn.vue';
</script>

<style scoped>
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.25s ease;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
