<template>
  <v-card-text class="py-8">
    <v-row justify="center">
      <v-col
        cols="12"
        class="text-center">
        <h3>Зарегистрируйте аккаунт</h3>
      </v-col>

      <v-col 
        class="pa-0"
        cols="12"
        md="8">
        <v-form @submit.prevent="handleRegister">
          <v-row>
            <v-col
              cols="12"
              sm="6">
              <v-text-field
                v-model="firstName"
                label="Имя"
                outlined
                dense
                color="blue"
                autocomplete="given-name"
              />
            </v-col>

            <v-col
              cols="12"
              sm="6">
              <v-text-field
                v-model="lastName"
                label="Фамилия"
                outlined
                dense
                color="blue"
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
            color="blue"
            class="my-4"
          />

          <v-text-field
            v-model="password"
            label="Пароль"
            outlined
            dense
            type="password"
            color="blue"
            autocomplete="new-password"
            class="mb-4"
          />
          <v-btn
            color="blue"
            dark
            block
            tile
            type="submit"
            class="mb-4"
          >
            Регистрация
          </v-btn>
          <p 
            v-if="AuthStore.error"
            class="text-center text-error text-body-1"
          >
            {{ AuthStore.getErrorMessage(AuthStore.error)}}
          </p>
          <div class="text-center">
            <h6 class="text-grey my-4">Или зарегистрируйтесь, используя:</h6>
            <v-btn
              depressed
              outlined
              size="small"
              color="grey"
              icon="mdi-google"
            />
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-card-text>
  <CommonDialog v-model="dialog">
    На вашу почту была отправлена одноразовая ссылка. Перейдите по ней, чтобы подтвердить свой email. 
    После этого вы сможете войти в свой аккаунт.
    <span class="text-primary">Если письмо не пришло, проверьте папку "Спам"</span>
  </CommonDialog>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/firebase/AuthStore'
import CommonDialog from '@/components/CommonDialog.vue';

const AuthStore = useAuthStore()

const email = ref(null)
const password = ref(null)
const firstName = ref('');
const lastName = ref('');

const dialog = ref(false)

async function handleRegister() {
  try {
    const isRegistered = await AuthStore.register(email.value, password.value, firstName.value, lastName.value)
    if (isRegistered) {
      dialog.value = true
    }
  } catch (err) {
    console.error(err.code)
  }
}
</script>