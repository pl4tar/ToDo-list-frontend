import { createApp } from 'vue';
import App from '@/App.vue';
import { createPinia } from 'pinia';
import vuetify from '@/plugins/vuetify';
import router from '@/router';
import '@/styles/main.css';

const app = createApp(App);

app
  .use(createPinia())
  .use(vuetify)
  .use(router)
  .mount('#app');
