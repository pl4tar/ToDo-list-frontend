<template>
  <v-sheet class="ma-2 elevation-5 rounded-lg bg-background-light">
    <v-list class="d-flex flex-column">
      <v-list>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon
              icon="mdi-view-grid-plus"
              size="large"
              color="primary"
            />
          </template>
          <div class="d-flex align-center">
            <v-list-item-title class="font-weight-bold">
              Категории
            </v-list-item-title>
          </div>
        </v-list-item>
        <v-list-item
          v-for="category in MenuStore.categories"
          :key="category.id"
          :value="category.value"
          class="mb-1 pl-70"
          @click="router.push(category.path)"
        >
          <template v-slot:prepend>
            <v-icon
              :icon="category.icon"
              class="elevation-10 pa-3 rounded-lg"
              size="large"
              :color="category.iconColor || 'primary'"
            />
          </template>
          <div class="d-flex align-center">
            <v-list-item-title>{{ category.title }}</v-list-item-title>
          </div>
        </v-list-item>
      </v-list>
      <v-list-item
        v-for="menuItem in MenuStore.menuList"
        :key="menuItem.id"
        :value="menuItem.value"
        @click="router.push(menuItem.path)"
      >
        <template v-slot:prepend>
          <v-icon
            color="primary"
            :icon="menuItem.icon" 
          />
        </template>
        <v-list-item-title class="font-weight-bold">
          {{ menuItem.name }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>


<script setup>
import { useRouter } from 'vue-router';
import { useMenuStore } from '@/stores/MenuStore';

const router = useRouter();

const MenuStore = useMenuStore()
</script>
