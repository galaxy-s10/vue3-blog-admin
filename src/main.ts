import { createApp } from 'vue';

import App from './App.vue';

import Message from '@/components/message/index.vue';
import { naive } from '@/components/registerGlobComp';
import router from '@/router/index';
import { store } from '@/store/index';

import '@/assets/css/index.scss';
import './permission';

const message = createApp(Message);
const app = createApp(App);

app.use(store);
app.use(naive);

app.use(router);

message.mount('#message');
app.mount('#app');
