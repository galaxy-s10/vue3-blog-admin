import { createApp } from 'vue';

import Message from '@/components/Message/index.vue';
import router from '@/router/index';
import store from '@/store/index';

import App from './App.vue';
import registerDirectives from './directives';

import '@/assets/css/index.scss';
import '@/performance';
import '@/permission';

const app = createApp(App);

registerDirectives(app);
app.use(store);
app.use(router);

const message = createApp(Message);
const messageEle = document.createElement('div');
const appEl = document.getElementById('app');
appEl?.appendChild(messageEle);
message.mount(messageEle);
app.mount('#app');
