<template>
  <VCalendar
    hide-day-header
    type="week"
    hide-week-number
    :events="events" />
</template>

<script setup>
import { ref } from 'vue';
import { VCalendar } from 'vuetify/labs/VCalendar';

const events = ref([
  {
    title: 'Weekly Meeting',
    start: new Date('2025-03-12 12:30'),
    end: new Date('2025-03-12 13:30'),
    color: 'blue',
  },
  {
    title: 'Thomas Birthday',
    start: new Date('2025-03-10'),
    end: new Date('2025-03-10'),
    color: 'green',
  },
  {
    title: 'Mash Potatoes',
    start: new Date('2025-03-09 12:30'),
    end: new Date('2025-03-09 13:30'),
    color: 'orange',
  },
]);
</script>
