import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// Pinia
import { createPinia } from "pinia";
import { useCounterStore } from "@/stores/counter.js";
const pinia = createPinia();

// Primeflex
import "primeflex/primeflex.css";
// PrimeVue
import PrimeVue from "primevue/config";
// import "primevue/resources/themes/aura-light-green/theme.css";
import "primevue/resources/themes/aura-light-cyan/theme.css";

// Vue Router
import { createMemoryHistory, createRouter } from "vue-router";
import HomeView from "./views/HomeView.vue";
import AboutView from "./views/AboutView.vue";
const routes = [
  { path: "/", name: "home", component: HomeView },
  //   { path: "/:username", name: "home", component: HomeView },
  { path: "/about", name: "about", component: AboutView },
];
const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
router.beforeEach((to, from) => {
  const piniaStore = useCounterStore(pinia);
  console.log("Router beforeEach: ", piniaStore.count);

  // return true to continue the navigation
  return true;
});

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(PrimeVue);

app.mount("#app");
