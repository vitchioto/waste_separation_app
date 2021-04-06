import { createApp } from 'vue';
import VueGtag from 'vue-gtag-next';
import App from './App.vue';
import './registerServiceWorker';
import store from './store';

const app = createApp(App);
app.use(VueGtag, {
  property: {
    id: 'G-1RXZDLTVZP',
  },
});
app.use(store);
app.mount('#app');
