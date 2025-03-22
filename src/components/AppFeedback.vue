<template>
  <p class="text-center mb-8 text-h5 text-secondary">
    Напишите нам, если у вас есть вопросы, предложения или замечания
  </p>
  <v-sheet class="bg-background-dark pa-7 rounded-lg elevation-10">
    <v-form ref="form">
      <v-text-field
        label="Ваше имя"
        v-model="name"
        required />
      <v-text-field
        v-model="email"
        label="Ваш email"
        type="email"
        required />
      <v-textarea
        v-model="message"
        label="Сообщение"
        class="mb-5"
        required />
      <v-row justify="center">
        <v-btn
          :href="mailtoLink"
          color="primary"
          text="Отправить" />
      </v-row>
    </v-form>
  </v-sheet>
</template>

<script setup>
import { computed, ref } from 'vue';

const name = ref('');
const email = ref('');
const message = ref('');

const mailtoLink = computed(() => {
  return `mailto:myEmail@mail.ru?subject=Обратная связь&body=Имя: ${name.value}%0AEmail: ${email.value}%0AСообщение: ${message.value}`;
});
</script>
