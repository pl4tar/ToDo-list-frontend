<template>
  <v-card-text class="mt-12">
    <h3 class="text-center">Войдите в свой аккаунт</h3>
    <h5 class="text-center grey--text">
      Войдите в свой аккаунт чтобы пользоваться всеми возможностями ToDo-List
    </h5>
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
            sm="7"></v-col>
        </v-row>
        <v-btn
          color="blue"
          dark
          block
          tile>Войти</v-btn>

        <h6 class="text-center mt-4 mb-3">Или войдите через:</h6>
        <div class="d-flex justify-center align-center mx-10 mb-16">
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