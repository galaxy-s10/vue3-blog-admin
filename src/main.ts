import { createApp } from 'vue';

import App from './App.vue';
import { showProjectInfo } from './utils/showProjectInfo';

import Message from '@/components/Message/index.vue';
import { naive } from '@/components/registerNaive';
import router from '@/router/index';
import store from '@/store/index';
import '@/assets/css/index.scss';
import '@/permission';

showProjectInfo();
const app = createApp(App);
const message = createApp(Message);

app.use(store);
app.use(router);
import '@/performance';

app.use(naive);

const a = 1;

const messageEle = document.createElement('div');
const appEle = document.getElementById('app');
appEle?.appendChild(messageEle);
message.mount(messageEle);

app.mount('#app');
