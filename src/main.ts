import { createApp } from 'vue';
import router from '@/router/index';
import { store } from '@/store/index';
import App from './App.vue';
import { naive } from '@/components/registerGlobComp';
import Message from '@/components/message/index.vue';
import '@/assets/css/index.scss';

const message = createApp(Message);

const app = createApp(App);

app.use(store);
app.use(naive);

// eslint-disable-next-line import/first
import './permission';

app.use(router);

message.mount('#message');
app.mount('#app');
