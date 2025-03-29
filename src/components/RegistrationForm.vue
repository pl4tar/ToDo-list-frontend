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
          />
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
          <p 
            v-if="AuthStore.error"
            class="text-center text-warning text-body-1"
          >
            {{ }}
          </p>
          <!-- <div class="text-center">
            <h6 class="text-grey my-4">Или зарегистрируйтесь, используя:</h6>
            <v-btn
              depressed
              outlined
              size="small"
              color="primary"
              icon="mdi-google"
            />
          </div> -->
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
import {useWarningStore} from '@/stores/WarningStore'

const WarningStore = useWarningStore()
const AuthStore = useAuthStore()

const email = ref(null)
const password = ref(null)
const firstName = ref('');
const lastName = ref('');

const errorMessage = ref('');

const dialog = ref(false)

async function handleRegister() {
  if (!email.value || !password.value || !firstName.value || !lastName.value) {
    WarningStore.isWarningShow = true
    WarningStore.warningText = 'Заполните все поля!'
    return
  }

    const response = await AuthStore.register(email.value, password.value, firstName.value, lastName.value);
    if (response) {
      dialog.value = true; 
    }
    else {
      WarningStore.isWarningShow = true
      WarningStore.warningText = AuthStore.getErrorMessage(AuthStore.error)
    }
}
</script>