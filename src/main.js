import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";

import store from "./Store/store";
import "./index.css";
import "animate.css";

createApp(App).use(store).use(router).mount("#app");
