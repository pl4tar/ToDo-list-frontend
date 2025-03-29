<template>
  <div
    class="my-6 mx-2 text-h4 align-center cursor-pointer"
    @click="goToHome"
  >
    <v-row align="center">
      <v-icon
        color="primary"
        icon="mdi-pencil-box-multiple"
        class="mr-2" 
      />
      <span class="text-h4 text-primary font-weight-bold">To-Do List</span>
    </v-row>  
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const goToHome = () => {
  if (route.path !== '/auth') {
    router.push('/tasks/all')
  }
}
</script>