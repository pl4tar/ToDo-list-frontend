<template>
  <v-card-text class="mt-4">
    <v-row justify="center">
      <v-col
        cols="12"
        class="text-center">
        <h3>Войдите в свой аккаунт</h3>
        <h5 class="text-grey">
          Войдите в свой аккаунт чтобы пользоваться всеми возможностями ToDo-List
        </h5>
      </v-col>

      <v-col
        cols="12"
        md="8">
        <v-row>
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
              Войти
            </v-btn>
          </v-col>

          <v-col
            cols="12"
            class="text-center">
            <h6 class="my-4 text-grey">Или войдите через:</h6>
            <v-btn
              depressed
              outlined
              color="grey"
              size="small"
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