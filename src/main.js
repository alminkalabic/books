import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import Default from "./views/layout/LayoutDefault";
import Auth from "./views/layout/LayoutAuth";
import User from "./views/layout/LayoutUser";

Vue.component("default-layout", Default);
Vue.component("auth-layout", Auth);
Vue.component("user-layout", User);

import "./router/permission";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
