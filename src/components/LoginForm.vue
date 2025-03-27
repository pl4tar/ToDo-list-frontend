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
        <v-form>
          <v-text-field
            label="Почта"
            outlined
            dense
            color="blue"
            class="mb-4"
          />

          <v-text-field
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

          <div class="text-center">
            <h6 class="my-4 text-grey">Или войдите через:</h6>
            <v-btn
              depressed
              outlined
              color="grey"
              size="small"
              icon="mdi-google"
            />
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script setup>

</script>

<style scoped>

</style>