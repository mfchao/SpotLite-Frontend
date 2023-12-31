import "@/assets/main.css";
import "purecss";

import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import "@/assets/fonts/SF-Compact-Text-Bold.ttf";
import "@/assets/fonts/SF-Compact-Text-Medium.ttf";
import "@/assets/fonts/SF-Compact-Text-MediumItalic.ttf";
import "@/assets/fonts/SF-Compact-Text-Regular.ttf";
import "@/assets/fonts/SF-Compact-Text-Semibold.ttf";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

app.use(pinia);
app.use(router);

app.mount("#app");
