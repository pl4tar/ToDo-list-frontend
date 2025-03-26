<template>
  <v-sheet class="px-2 ma-2 pb-1 elevation-5 rounded-lg bg-background-light">
    <v-card class="pa-1 d-flex align-center justify-space-between elevation-0 bg-background-light">
      <div class="d-flex align-center">
        <v-avatar color="primary">
          <v-icon icon="mdi-account-circle"/>
        </v-avatar>
        <div class="">
          <v-card-title class="mb-0">Murzik</v-card-title>
          <v-card-subtitle>murzik@gmail.com</v-card-subtitle>
        </div>
      </div>
      <v-tooltip text="Выход">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            icon="mdi-logout"
            color="background-light"
          />
        </template>
      </v-tooltip>
    </v-card>
  </v-sheet>
</template>