<template>
  <v-sheet class="px-2 ma-2 pb-1 elevation-5 rounded-lg bg-background-light">
    <v-card
      class="pa-1 d-flex align-center justify-space-between elevation-0 bg-background-light"
    >
      <v-sheet
        class="d-flex align-center overflow-hidden mr-2 bg-background-light"
      >
        <v-tooltip
          :text="AuthStore.user?.displayName + ' - ' + AuthStore.user?.email"
        >
          <template v-slot:activator="{ props }">
            <v-avatar
              v-bind="props"
              color="primary">
              <v-icon icon="mdi-account-circle" />
            </v-avatar>
            <v-card
              v-bind="props"
              class="bg-background-light elevation-0">
              <v-card-title class="mb-0">{{
                AuthStore.user?.displayName
              }}</v-card-title>
              <v-card-subtitle>{{ AuthStore.user?.email }}</v-card-subtitle>
            </v-card>
          </template>
        </v-tooltip>
      </v-sheet>
      <v-tooltip text="Выход">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            icon="mdi-logout"
            color="background-light"
            class="elevation-8"
            @click="isLogoutDialogOpen = true"
          />
        </template>
      </v-tooltip>
      <LogoutDialog
        v-model="isLogoutDialogOpen"
        @confirm="logoutHandler" />
    </v-card>
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/firebase/AuthStore';
import { useRouter } from 'vue-router';
import LogoutDialog from '@/components/navigation/LogoutDialog.vue';

const AuthStore = useAuthStore();
const router = useRouter();

const isLogoutDialogOpen = ref(false);

async function logoutHandler() {
  AuthStore.logout();
  router.push('/auth');
}
</script>
