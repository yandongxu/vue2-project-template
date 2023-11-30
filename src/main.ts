import Vue from 'vue';
import PortalDirective from 'ant-design-vue/lib/_util/portalDirective';
import { store } from './stores';
import App from './app/app.entry';
import router from './router';
import '@/assets/styles/main.less';

Vue.use(PortalDirective);

const app = new Vue({
  router,
  pinia: store,
  render: (h) => h(App),
});

app.$mount('#app');
