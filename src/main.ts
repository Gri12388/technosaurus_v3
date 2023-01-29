import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import { key, store } from './store/store';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';

loadFonts();

createApp(App)
  .use(router)
  .use(store, key)
  .use(vuetify)
  .mount('#app');
