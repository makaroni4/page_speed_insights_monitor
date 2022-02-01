import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const firebaseConfig = JSON.parse(process.env.VUE_APP_FIRESTORE_CONFIG);

store.dispatch("initFirestore", firebaseConfig);

createApp(App).use(store).use(router).mount("#app");

router.replace("/");
