
<template>
  <v-card-text class="mt-12">
    <h4 class="text-center">Зарегистрируйте аккаунт</h4>
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
            sm="7"></v-col>
        </v-row>
        <v-btn
          color="blue"
          dark
          block
          tile>Регистрация</v-btn>

        <h5 class="text-center grey--text mt-4 mb-3">Или зарегистрируйтесь, используя:</h5>
        <div class="d-flex justify-center align-center mx-10 mb-11">
          <v-btn
            depressed
            outlined
            color="grey"
            icon="mdi-alpha-g-circle-outline"></v-btn>
        </div>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script setup>

</script>

<style scoped>

</style>