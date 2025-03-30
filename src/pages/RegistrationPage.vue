<template>
  <v-container>
    <v-row justify="center">
      <AppLogo />
    </v-row>
    <v-row justify="center">
      <div class="text-container">
        <span
          v-for="(char, index) in text"
          class="char font-weight-bold"
          :key="index"
          :style="{ animationDelay: `${index * 0.05}s` }"
        >
          {{ char }}
        </span>
      </div>
    </v-row>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="10">
        <v-card class="elevation-6 mt-10 bg-background-dark rounded-lg">
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
            <v-window-item :value="2">
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
import { ref, onMounted } from 'vue';
import LoginForm from '@/components/LoginForm.vue';
import RegistrationForm from '@/components/RegistrationForm.vue';
import PromoBlock from '@/components/PromoBlock.vue';
import AppLogo from '@/components/navigation/AppLogo.vue';

const step = ref(1);

const text = ref('Планирование без сложностей');
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

.char {
  display: inline-block;
  opacity: 0;
  animation: textAnim 1.8s forwards;
  white-space: pre;
}

@keyframes textAnim {
  from {
    opacity: 0;
    color: rgb(129, 14, 145);
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
    color: #6c80e7;
  }
}

.text-container {
  font-size: 1.5rem;
  line-height: 1.6;
  overflow: hidden;
}
</style>
