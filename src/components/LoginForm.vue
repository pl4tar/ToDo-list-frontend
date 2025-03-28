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
            color="blue"
            class="mb-4"
          />

          <v-text-field
            v-model="password"
            label="Пароль"
            outlined
            dense
            color="blue"
            autocomplete="current-password"
            type="password"
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
            Войти
          </v-btn>

          <p 
            v-if="AuthStore.error"
            class="text-center text-error text-body-1"
          >
            {{ AuthStore.getErrorMessage(AuthStore.error)}}
          </p>

          <div class="text-center">
            <h6 class="my-4 text-grey">Или войдите через:</h6>
            <v-btn
              depressed
              outlined
              color="grey"
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

const AuthStore = useAuthStore()
const router = useRouter();

const email = ref()
const password = ref()

async function handleLogin() {
  const isLogin = await AuthStore.login(email.value, password.value)
  if (isLogin) {
    router.push('/tasks/all')
  }
}

async function handleGoogleLogin() {
  await AuthStore.loginWithGoogle()
  if (AuthStore.isAuthenticated) {
    console.log(AuthStore.user)
  }
}


</script>

<style scoped>

</style>