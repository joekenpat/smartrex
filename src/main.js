import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router/index";
import { store } from "./store/index";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  vuetify,
  created() {
    window.addEventListener("offline", () => {
      store.dispatch("set_connected_to_network", false);
    });
    window.addEventListener("online", () => {
      store.dispatch("set_connected_to_network", true);
    });
  },
  render: h => h(App)
}).$mount("#app");
