<template>
  <v-card-text class="py-8">
    <v-row justify="center">
      <v-col
        cols="12"
        class="text-center">
        <h3>Зарегистрируйте аккаунт</h3>
      </v-col>

      <v-col
        cols="12"
        md="8">
        <v-form>
          <v-row>
            <v-col
              cols="12"
              sm="6">
              <v-text-field
                label="Имя"
                outlined
                dense
                color="blue"
                autocomplete="given-name"
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
                autocomplete="family-name"
              />
            </v-col>
          </v-row>

          <v-text-field
            label="Почта"
            outlined
            dense
            color="blue"
            class="my-4"
          />

          <v-text-field
            label="Пароль"
            outlined
            dense
            color="blue"
            autocomplete="new-password"
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
            Регистрация
          </v-btn>
          <div class="text-center">
            <h6 class="text-grey my-4">Или зарегистрируйтесь, используя:</h6>
            <v-btn
              depressed
              outlined
              size="small"
              color="grey"
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