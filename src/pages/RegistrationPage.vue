<template>
  <v-container>
    <v-row justify="center">
      <AppLogo/>
    </v-row>
    <v-row
      align="center"
      justify="center">
      <v-col
        cols="12"
        sm="10">
        <v-card
          class="elevation-6 mt-10 bg-background-dark">
          <v-window v-model="step">
            <!-- Вход -->
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
                  class="bg-primary rounded-bl-xl">
                  <PromoBlock
                    title="Нет аккаунта?"
                    description="Давайте все подготовим чтобы вы могли успешно пользоваться данным сервисом"
                    button-text="Регистрация"
                    @button-click="step++"
                  />
                </v-col>
              </v-row>
            </v-window-item>

            <!-- Регистрация -->
            <v-window-item :value="2" > 
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                  class="bg-primary rounded-br-xl">
                  <PromoBlock
                    title="Уже зарегистрировались?"
                    description="Войдите в свой аккаунт и наслаждайтесь ToDo-List"
                    button-text="Войти"
                    @button-click="step--"
                  />
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
import LoginForm from '@/components/LoginForm.vue';
import RegistrationForm from '@/components/RegistrationForm.vue';
import PromoBlock from '@/components/PromoBlock.vue';
import AppLogo from '@/components/navigation/AppLogo.vue'

const step = ref(1);
</script>

<style scoped>
.rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}
.rounded-br-xl {
  border-bottom-right-radius: 300px !important;
}
@media (max-width: 960px) {
  .rounded-bl-xl,
  .rounded-br-xl {
    border-radius: 0 !important;
  }
}
</style>