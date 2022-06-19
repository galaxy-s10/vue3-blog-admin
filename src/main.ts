import { createApp } from 'vue';

import App from './App.vue';

import Message from '@/components/Message/index.vue';
import { naive } from '@/components/registerNaive';
import router from '@/router/index';
import store from '@/store/index';
import '@/assets/css/index.scss';
import '@/permission';

const app = createApp(App);
const message = createApp(Message);

app.use(store);
app.use(router);
app.use(naive);

const messageEle = document.createElement('div');
document.body.appendChild(messageEle);
message.mount(messageEle);

app.mount('#app');
