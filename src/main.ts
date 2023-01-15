import { createApp } from 'vue';

import App from './App.vue';
import registerDirectives from './directives';

import Message from '@/components/Message/index.vue';
import { naive } from '@/components/registerNaive';
import router from '@/router/index';
import store from '@/store/index';

import '@/assets/css/index.scss';
import '@/permission';
import '@/performance';

const app = createApp(App);

registerDirectives(app);
app.use(store);
app.use(router);
// app.use(naive);

const message = createApp(Message);
const messageEle = document.createElement('div');
const appEl = document.getElementById('app');
appEl?.appendChild(messageEle);
message.mount(messageEle);

app.mount('#app');
