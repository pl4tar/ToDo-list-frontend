<template>
  <div>
    <p class="text-center mb-8 text-h5 text-secondary font-weight-bold">
      Напишите нам, если у вас есть вопросы, предложения или замечания!
    </p>
    <v-sheet
      class="bg-background-dark pa-7 rounded-lg elevation-10 mx-auto"
      max-width="600"
    >
      <v-form
        ref="form"
        @submit.prevent="handleSubmit">
        <v-text-field
          v-model="formData.name"
          :rules="nameRules"
          label="Ваше имя"
          required
          clearable
        />
        <v-text-field
          v-model="formData.email"
          :rules="emailRules"
          label="Ваш email"
          type="email"
          required
          clearable
        />
        <v-select
          v-model="formData.subject"
          :items="subjects"
          label="Тема сообщения"
          :rules="subjectRules"
          required
        />
        <v-textarea
          v-model="formData.message"
          :rules="messageRules"
          label="Сообщение"
          required
          clearable
          counter
          maxlength="500"
        />
        <v-checkbox
          v-model="formData.consent"
          :rules="consentRules"
          color="primary"
          label="Я согласен на обработку персональных данных"
          required
        />
        <v-btn
          type="submit"
          color="primary"
          :loading="isSubmitting"
          block
          size="large"
          class="mt-4"
        >
          Отправить
        </v-btn>
      </v-form>
    </v-sheet>
    <v-snackbar
      v-model="snackbar.visible"
      :color="snackbar.color"
      :timeout="3000"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import emailjs from '@emailjs/browser';
import {
  nameRules,
  emailRules,
  subjectRules,
  messageRules,
  consentRules,
} from '@/validation/rules';

emailjs.init('KKy3k-fJ-DwzkNOIL');

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
  consent: false,
});

const subjects = [
  'Техническая поддержка',
  'Вопрос по функционалу',
  'Предложение по улучшению',
  'Сообщение об ошибке',
  'Другое',
];

const isSubmitting = ref(false);
const form = ref(null);

const snackbar = ref({
  visible: false,
  message: '',
  color: 'success',
});

const handleSubmit = async () => {
  const { valid } = await form.value.validate();

  if (!valid) {
    return;
  }

  isSubmitting.value = true;

  try {
    await emailjs.send('service_5zocllj', 'template_al03qph', {
      name: formData.value.name,
      email: formData.value.email,
      subject: formData.value.subject,
      message: formData.value.message,
      date: new Date().toLocaleString(),
    });
    showNotification('Сообщение успешно отправлено!', 'success');
    resetForm();
  } catch (error) {
    console.error('Ошибка отправки:', error);
    showNotification('Произошла ошибка при отправке', 'error');
  } finally {
    isSubmitting.value = false;
  }
};

const showNotification = (message, color) => {
  snackbar.value = {
    visible: true,
    message,
    color,
  };
};

const resetForm = () => {
  form.value.reset();
  formData.value = {
    name: '',
    email: '',
    subject: '',
    message: '',
    consent: false,
  };
};
</script>
