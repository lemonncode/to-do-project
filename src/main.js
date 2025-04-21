import { createApp } from 'vue'
import App from "./App.vue";
import router from "./router";

import './style.css'
import pinia from "./stores";

const app = createApp(App);

app.use(pinia);
app.use(router);


createApp(App).use(router).mount("#app");

