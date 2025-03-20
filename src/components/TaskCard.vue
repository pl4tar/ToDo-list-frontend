<template>
  <div class="d-flex align-center ga-3 mb-5">
    <v-checkbox
      color="primary"
      hide-details
      title="Выполнено"
    />
    <v-expansion-panels class="bg-background ">
      <v-expansion-panel
        bg-color="background-light"
        class="rounded-xl elevation-3"
      >
        <v-expansion-panel-title>
          <div class="text-h6">
            <span class="text-primary">{{task.title}}</span>
            <p v-if="task.startDate && task.endDate">{{formatDate(task.startDate)}} - {{formatDate(task.endDate)}}</p>
          </div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, quae cupiditate qui obcaecati fugiat labore sunt ullam dignissimos nihil nobis molestias quas nesciunt, repellendus adipisci aspernatur accusantium a odio esse.</p>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <div class="taskControls">
      <v-tooltip text="Удалить задачу">
        <template v-slot:activator="{ props }">
          <v-btn 
            v-bind="props"
            variant="tonal"
            icon="mdi-delete-empty"
            class="text-red elevation-3"        
          />
        </template>
      </v-tooltip>
    </div>
  </div>

</template>

<script setup>
import { useFormatDate } from '@/composables/useFormatDate'; 

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const { formatDate } = useFormatDate()
</script>