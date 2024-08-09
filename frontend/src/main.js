// import { createApp } from 'vue';
// import { createPinia } from 'pinia';
// import App from './App.vue';
// import router from './router';

// const app = createApp(App);
// app.use(createPinia());
// app.use(router);
// app.mount('#app');

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './stores/auth';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './styles/main.css';
// import 'bootstrap/dist/css/bootstrap.min.css';


// import 'bootstrap';


const app = createApp(App);

// Configuration d'Axios
//axios.defaults.baseURL = 'http://localhost:3000/api';
// axios.defaults.withCredentials = true; // Permet d'envoyer les cookies de session

const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount('#app');

// const authStore = useAuthStore();
// authStore.fetchCurrentUser().then(() => {
//   app.mount('#app');
// });
