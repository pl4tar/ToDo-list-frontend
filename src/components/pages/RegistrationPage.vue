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
          color="#696969" >
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col
                  cols="12"
                  md="6">
                  <v-card-text class="mt-12">
                    <h4
                      class="text-center"
                    >Войдите в свой аккаунт</h4>
                    <h6
                      class="text-center  grey--text "
                    >Войдите чтобы пользоваться всеми возможностями ToDo-List</h6>
                    <v-row
                      align="center"
                      justify="center">
                      <v-col
                        cols="12"
                        sm="8">
                        <v-text-field
                          label="Почта"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          class="mt-16"
                        />
                        <v-text-field
                          label="Пароль"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          type="password"
                        />
                        <v-row>
                          <v-col
                            cols="12"
                            sm="7">
                          </v-col>
                        </v-row>
                        <v-btn
                          color="blue"
                          dark
                          block
                          tile>Войти</v-btn>
                        <h5
                          class="text-center mt-4 mb-3"
                        >Или войдите через:</h5>
                        <div class="d-flex  justify-center align-center mx-10 mb-16">
                          <v-btn
                            depressed
                            outlined
                            color="grey"
                            icon="mdi-alpha-g-circle-outline">
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  class="bg-light-blue-darken-2 rounded-bl-xl"
                >
                  <div style="  text-align: center; padding: 180px 0;">
                    <v-card-text class="white--text" >
                      <h3 class="text-center ">Нет аккаунта?</h3>
                      <h6
                        class="text-center"
                      >Давайте все подготовим чтобы вы могли успешно пользоваться <br>данным сервисом</h6>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn
                        tile
                        outlined
                        color = "warning"
                        @click="step++">Регистрация</v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row >
                <v-col
                  cols="12"
                  md="6"
                  class="bg-light-blue-darken-2 rounded-br-xl" >
                  <div style="  text-align: center; padding: 180px 0;">
                    <v-card-text class="white--text" >
                      <h3 class="text-center ">Уже зарегистрировались?</h3>
                      <h6
                        class="text-center"
                      >Войдите в свой аккаунт и наслаждайтесь ToDo-List</h6>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn
                        tile
                        outlined
                        color = "warning"
                        @click="step--">Войти</v-btn>
                    </div>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6">
                  <v-card-text class="mt-12">
                    <h4
                      class="text-center"
                    >Зарегистрируйте аккаунт</h4>
                    <v-row
                      align="center"
                      justify="center">
                      <v-col
                        cols="12"
                        sm="8">
                        <v-row>
                          <v-col
                            cols="12"
                            sm="6">
                            <v-text-field
                              label="Имя"
                              outlined
                              dense
                              color="blue"
                              autocomplete="false"
                              class="mt-4"
                            />
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6">
                            <v-text-field
                              label="Фамилия"
                              outlined
                              dense
                              color="blue"
                              autocomplete="false"
                              class="mt-4"
                            />
                          </v-col>
                        </v-row>
                        <v-text-field
                          label="Почта"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                        />
                        <v-text-field
                          label="Пароль"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          type="password"

                        />
                        <v-row>
                          <v-col
                            cols="12"
                            sm="7">
                          </v-col>
                        </v-row>
                        <v-btn
                          color="blue"
                          dark
                          block
                          tile>Регистрация</v-btn>
                        <h5
                          class="text-center  grey--text mt-4 mb-3"
                        >Или зарегистрируйтесь, используя:</h5>
                        <div class="d-flex  justify-center align-center mx-10 mb-11">
                          <v-btn
                            depressed
                            outlined
                            color="grey"
                            icon="mdi-alpha-g-circle-outline">
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
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