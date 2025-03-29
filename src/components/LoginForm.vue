<template>
  <v-card-text class="py-8">
    <v-row justify="center">
      <v-col
        cols="12"
        class="text-center">
        <h3>Войдите в свой аккаунт</h3>
        <h5 class="text-grey mt-2">
          Войдите в свой аккаунт чтобы пользоваться всеми возможностями ToDo-List
        </h5>
      </v-col>

      <v-col
        cols="12"
        md="8">
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="email"
            label="Почта"
            outlined
            dense
            color="primary"
            class="mb-4"
          />

          <v-text-field
            v-model="password"
            label="Пароль"
            outlined
            dense
            color="primary"
            autocomplete="current-password"
            type="password"
            class="mb-4"
          />

          <v-btn
            color="primary"
            dark
            block
            tile
            type="submit"
            class="mb-4"
          >
            Войти
          </v-btn>

          <p 
            v-if="AuthStore.error"
            class="text-center text-warning text-body-1"
          >
            {{ AuthStore.getErrorMessage(AuthStore.error)}}
          </p>

          <div class="text-center">
            <h5 class="my-4 text-grey">Или войдите через:</h5>
            <v-btn
              depressed
              outlined
              color="primary"
              size="small"
              icon="mdi-google"
              @click="handleGoogleLogin"
            />
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script setup>
import {ref} from 'vue'
import { useAuthStore } from '@/stores/firebase/AuthStore';
import { useRouter } from 'vue-router';
import {useWarningStore} from '@/stores/WarningStore'

const AuthStore = useAuthStore()
const router = useRouter();
const WarningStore = useWarningStore()

const email = ref()
const password = ref()

async function handleLogin() {
  if (!email.value || !password.value) {
    WarningStore.isWarningShow = true
    WarningStore.warningText = 'Заполните все поля!'
    return
  }

  const response = await AuthStore.login(email.value, password.value)
  if (!response) {
    WarningStore.isWarningShow = true
    WarningStore.warningText = AuthStore.getErrorMessage(AuthStore.error)
  } else {
    router.push('/tasks/all')
  }
}

async function handleGoogleLogin() {
  const isLogin = await AuthStore.loginWithGoogle()
  if (isLogin) {
    router.push('/tasks/all')
  }
}
</script>
