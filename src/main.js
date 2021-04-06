import { createApp } from 'vue';
import VueGtag from 'vue-gtag-next';
import { setupI18n } from './i18n';
import App from './App.vue';
import './registerServiceWorker';
import store from './store';
import sk from './locales/sk.json';

const i18n = setupI18n({
  globalInjection: true,
  legacy: false,
  locale: 'sk',
  fallbackLocale: 'sk',
  messages: {
    sk,
  },
});

const app = createApp(App);
app.use(VueGtag, {
  property: {
    id: 'G-1RXZDLTVZP',
  },
});
app.use(i18n);
app.use(store);
app.mount('#app');
