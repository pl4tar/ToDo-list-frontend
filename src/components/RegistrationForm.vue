<template>
  <v-card-text class="py-8">
    <v-row justify="center">
      <v-col
        cols="12"
        class="text-center">
        <h3>Зарегистрируйте аккаунт</h3>
      </v-col>
      <v-col
        class="px-2"
        cols="12"
        md="8">
        <v-form
          ref="registerForm"
          @submit.prevent="handleRegister">
          <v-row>
            <v-col
              cols="12"
              sm="6">
              <v-text-field
                v-model="firstName"
                label="Имя"
                outlined
                dense
                :rules="nameRules"
                color="primary"
                autocomplete="given-name"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6">
              <v-text-field
                v-model="lastName"
                label="Фамилия"
                :rules="nameRules"
                outlined
                dense
                color="primary"
                autocomplete="family-name"
              />
            </v-col>
          </v-row>
          <v-text-field
            v-model="email"
            type="email"
            label="Почта"
            outlined
            dense
            color="primary"
            class="my-4"
            :rules="emailRules"
          />
          <v-text-field
            v-model="password"
            label="Пароль"
            outlined
            dense
            type="password"
            color="primary"
            autocomplete="new-password"
            class="mb-4"
            :rules="passwordRules"
          />
          <div
            class="ml-4 mb-5"
            style="margin-top: -10px">
            <ul
              v-for="rule in passwordRulesList"
              :key="rule.id">
              <li>
                {{ rule.text }}
              </li>
            </ul>
          </div>
          <v-btn
            color="blue"
            dark
            block
            tile
            type="submit"
            class="mb-4 bg-primary"
          >
            Регистрация
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-card-text>

  <VerificationDialog v-model="dialog">
    На вашу почту была отправлена одноразовая ссылка. Перейдите по ней, чтобы
    подтвердить свой email. После этого вы сможете войти в свой аккаунт.
    <span class="text-primary"
    >Если письмо не пришло, проверьте папку "Спам"</span
    >
  </VerificationDialog>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/firebase/AuthStore';
import VerificationDialog from '@/components/VerificationDialog.vue';
import { useWarningStore } from '@/stores/WarningStore';
import {
  nameRules,
  emailRules,
  passwordRules,
  passwordRulesList,
} from '@/validation/rules';

const WarningStore = useWarningStore();
const AuthStore = useAuthStore();

const email = ref(null);
const password = ref(null);
const firstName = ref('');
const lastName = ref('');

const dialog = ref(false);

const registerForm = ref();

async function handleRegister() {
  const { valid } = await registerForm.value.validate();

  if (!valid) {
    return;
  }

  const response = await AuthStore.register(
    email.value,
    password.value,
    firstName.value,
    lastName.value,
  );
  if (response) {
    dialog.value = true;
  } else {
    WarningStore.isWarningShow = true;
    WarningStore.warningText = AuthStore.getErrorMessage(AuthStore.error);
  }
}
</script>
