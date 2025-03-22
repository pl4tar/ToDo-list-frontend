<template>
  <v-container>
    <v-row
      align="center"
      justify="center">
      <v-col
        cols="12"
        sm="10">
        <v-card
          class="elevation-6 mt-10"
          color="#696969">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col
                  cols="12"
                  md="6">
                  <LoginForm />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  class="bg-light-blue-darken-2 rounded-bl-xl">
                  <div style="text-align: center; padding: 180px 0;">
                    <v-card-text class="white--text">
                      <h3 class="text-center">Нет аккаунта?</h3>
                      <h6 class="text-center">
                        Давайте все подготовим чтобы вы могли успешно пользоваться <br />данным сервисом
                      </h6>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn
                        tile
                        outlined
                        color="warning"
                        @click="step++">Регистрация</v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                  class="bg-light-blue-darken-2 rounded-br-xl">
                  <div style="text-align: center; padding: 180px 0;">
                    <v-card-text class="white--text">
                      <h3 class="text-center">Уже зарегистрировались?</h3>
                      <h6 class="text-center">
                        Войдите в свой аккаунт и наслаждайтесь ToDo-List
                      </h6>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn
                        tile
                        outlined
                        color="warning"
                        @click="step--">Войти</v-btn>
                    </div>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6">
                  <RegistrationForm />
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import RegistrationForm from '@/components/RegistrationForm.vue';
import LoginForm from '@/components/LoginForm.vue';

// Реактивная переменная
const step = ref(1);
</script>

<style scoped>
.rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}
.rounded-br-xl {
  border-bottom-right-radius: 300px !important;
}
</style>