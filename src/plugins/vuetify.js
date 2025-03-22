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
    secondary: '#9FA8DA',
    background: '#282828',
    'background-light': '#464646',
    'background-dark': '#3a3a3a',
    warning: '#FB8C00',
  },
};

const lightTheme = {
  colors: {
    background: '#ebebeb',
    'background-light': '#e2e2e2',
    primary: '#6c80e7',
    'background-dark': '#dadada',
    'background-primary': 'rgb(240, 240, 240)',
    secondary: '#6f54c2',
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
      style: [{ maxWidth: '1400px' }],
    },
  },
});

export default vuetify;
