<template>
  <v-navigation-drawer
    v-model="MenuStore.isNavShown"
    class="pa-3 bg-background-dark fixed-nav"
    width="350"
  >
    <div class="mb-5">
      <div class="d-flex align-center justify-space-around">
        <AppLogo />
        <v-tooltip text="Закрыть меню">
          <template v-slot:activator="{ props }">
            <v-icon
              v-bind="props"
              class="cursor-pointer"
              icon="mdi-view-headline"
              @click="MenuStore.isNavShown = false"
            />
          </template>
        </v-tooltip>
      </div>
      <UserProfile />
    </div>
    <CategoriesSection />
  </v-navigation-drawer>
</template>

<script setup>
import { useMenuStore } from '@/stores/MenuStore';
import AppLogo from '@/components/navigation/AppLogo.vue';
import UserProfile from '@/components/navigation/UserProfile.vue';
import CategoriesSection from '@/components/navigation/CategoriesSection.vue';

const MenuStore = useMenuStore()
</script>
