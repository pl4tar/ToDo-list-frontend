<template>
  <div
    class="my-5 text-h4 cursor-pointer"
    @click="router.push('/')"
  >
    <div class="d-flex justify-center align-center">
      <v-icon
        color="primary"
        icon="mdi-pencil-box-multiple"
        class="mr-1 display-inline" />
      <h1 class="display-inline text-sm-h4 text-h5 text-primary font-weight-bold">To-Do List</h1>
    </div>  
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>