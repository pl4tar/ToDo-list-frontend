<template>
  <div
    class="my-5 text-h4 d-flex justify-space-evenly align-center cursor-pointer"
    @click="router.push('/tasks/all')"
  >
    <v-icon
      color="primary"
      icon="mdi-pencil-box-multiple"
      class="mr-1" />
    <h1 class="text-h4 text-primary font-weight-bold">To-Do List</h1>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>