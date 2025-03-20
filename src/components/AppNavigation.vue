<template>
  <v-navigation-drawer
    v-if="isNavShown"
    ref="navigationDrawerRef"
    permanent
    class="px-4 bg-background-dark fixed-nav"
    width="350"
  >
    <div>
      <div class="mb-5">
        <div class="d-flex align-center justify-space-around">
          <div class="my-5 text-h4 d-flex justify-space-evenly align-center">
            <v-icon
              color="primary"
              icon="mdi-pencil-box-multiple"
              class="mr-1"
            />
            <h1 class="text-h4 text-primary font-weight-bold">To-Do List</h1>
          </div>
          <v-tooltip text="Закрыть меню">
            <template v-slot:activator="{ props }">
              <v-icon 
                v-bind="props"
                class="cursor-pointer"
                icon="mdi-view-headline" 
                @click="updateState()"
              />
            </template>
          </v-tooltip>
        </div>
        <v-sheet class="px-3 py-2 elevation-5 rounded-lg bg-background-light">
          <v-card class="d-flex align-center justify-space-between elevation-0 bg-background-light">
            <div class="d-flex align-center">
              <v-avatar  color="primary">
                <v-icon icon="mdi-account-circle"></v-icon>
              </v-avatar>
              <div class="">
                <v-card-title class="mb-0">Murzik</v-card-title>
                <v-card-subtitle>murzik@gmail.com</v-card-subtitle>
              </div>
            </div>
            <v-tooltip text="Выход">
              <template v-slot:activator="{ props }">
                <v-btn 
                  v-bind="props"
                  icon="mdi-logout" 
                  color="background-light" 
                />
              </template>
            </v-tooltip>
          </v-card>
        </v-sheet>
      </div>
      <v-sheet
        color="background-light"
        class="pa-2 elevation-5 rounded-lg">
        <v-list 
          class="d-flex flex-column ga-2"
          v-model:opened="openGroups" 
        >
          <v-list-group value="Category">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props">
                <template v-slot:prepend>
                  <v-icon
                    icon="mdi-view-grid-plus"
                    size="large"
                    color="primary"
                  />
                </template>
                <span class="font-weight-bold">Категории</span>
              </v-list-item>
            </template>
            <v-list-item
              v-for="category in MenuStore.categories"
              :key="category.id"
              :value="category.value"
              class="mb-2"
            >
              <template v-slot:prepend>
                <v-icon
                  :icon="category.icon"
                  class="elevation-10 pa-5 rounded-lg"
                  size="large"
                  :color="category.iconColor || 'primary'"
                />
              </template>
              <div class="d-flex align-center">
                <v-list-item-title>{{ category.title }}</v-list-item-title>              
              </div>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-for="menuItem in MenuStore.menuList"
            :key="menuItem.id"
            :value="menuItem.value"
            @click="router.push(menuItem.path)"
          >
            <template v-slot:prepend>
              <v-icon
                color="primary"
                :icon="menuItem.icon" />
            </template>
            <v-list-item-title class="font-weight-bold">{{
              menuItem.name
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-sheet>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import { inject } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMenuStore } from '@/stores/MenuStore';

const MenuStore = useMenuStore();

const router = useRouter();

const openGroups = ref(['Category']); 

const isNavShown = inject('isNavShown');
const changeShown = inject('changeShown');

function updateState() {
  changeShown(false);
}
</script>

<style scoped>
.fixed-nav {
  position: fixed !important;
  top: 0; 
  left: 0; 
  height: 100vh; 
  overflow-y: auto; 
  z-index: 1000; 
}
</style>