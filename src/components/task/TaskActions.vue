<template>
  <div class="d-flex justify-space-between flex-sm-row flex-column align-center">
    <div class="d-flex justify-center ga-5 flex-wrap align-center ga-2 mb-2">
      <v-btn
        size="small"
        class="bg-green width-100"
        text="Выполнить"
        @click.stop="$emit('complete')"
      >
        <template v-slot:prepend>
          <v-icon icon="mdi-check-all" />
        </template>
      </v-btn>
      <v-btn
        variant="tonal"
        size="small"
        class="text-secondary elevation-3 width-100"
        prepend-icon="mdi-pencil"
        text="Изменить"
        @click.stop="$emit('edit')"
      />
    </div>
    <v-btn
      variant="text"
      class="bg-background-light text-error elevation-0"
      icon="mdi-delete-empty"
      @click.stop="$emit('delete')"
    /> 
  </div> 
</template>

<script setup>
defineEmits(['delete', 'edit', 'complete'])
</script>