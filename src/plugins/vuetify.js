import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { VCalendar } from 'vuetify/labs/VCalendar';

const darkTheme = {
  colors: {
    primary: '#6c80e7',
    background: '#505050',
    'background-light': '#464646',
    'background-dark': '#393939',
    warning: '#FB8C00',
  },
};

const lightTheme = {
  colors: {
    // // background: '#f0f0f0',
    // 'background-light': '#464646',
    // primary: '#6c80e7',
    // 'background-dark': '#393939',
    // 'background-primary': 'rgb(240, 240, 240)',
    // secondary: '#b146cf',
  },
};

const vuetify = createVuetify({
  components: {
    ...components,
    VCalendar,
  },
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    themes: {
      darkTheme,
      lightTheme,
    },
    defaultTheme: 'darkTheme',
  },
  defaults: {
    VContainer: {
      style: [{ maxWidth: '1100px' }],
    },
  },
});

export default vuetify;
