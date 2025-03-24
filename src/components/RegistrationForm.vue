<template>
  <v-card-text class="mt-4">
    <v-row justify="center">
      <v-col
        cols="12"
        class="text-center">
        <h3>Зарегистрируйте аккаунт</h3>
      </v-col>

      <v-col
        cols="12"
        md="8">
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
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              label="Почта"
              outlined
              dense
              color="blue"
              autocomplete="false"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              label="Пароль"
              outlined
              dense
              color="blue"
              autocomplete="false"
              type="password"
            />
          </v-col>

          <v-col cols="12">
            <v-btn
              color="blue"
              dark
              block
              tile
            >
              Регистрация
            </v-btn>
          </v-col>

          <v-col
            cols="12"
            class="text-center">
            <h6 class="text-grey my-4">Или зарегистрируйтесь, используя:</h6>
            <v-btn
              depressed
              outlined
              size="small"
              color="grey"
              icon="mdi-google"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script setup>

</script>

<style scoped>

</style>