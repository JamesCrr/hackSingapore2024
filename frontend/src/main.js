import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// Google Login
import vue3GoogleLogin from "vue3-google-login";
// Pinia
import { createPinia } from "pinia";
import { useMyStore } from "@/stores/mystore.js";
const pinia = createPinia();

// Primeflex
import "primeflex/primeflex.css";
// PrimeVue
import PrimeVue from "primevue/config";
// import "primevue/resources/themes/aura-light-green/theme.css";
import "primevue/resources/themes/aura-light-cyan/theme.css";

// Vue Router
import { createMemoryHistory, createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import AboutView from "./views/AboutView.vue";
import SearchView from "./views/SearchView.vue";
import GroupCreationView from "./views/GroupCreationView.vue";
import GroupDashboardView from "./views/GroupDashboardView.vue";

const routes = [
	{ path: "/", name: "home", component: HomeView },
	//   { path: "/:username", name: "home", component: HomeView },
	{ path: "/about", name: "about", component: AboutView },
	{
		path: "/search",
		name: "search",
		component: SearchView,
	},
	{
		path: "/groupcreation",
		name: "groupcreation",
		component: GroupCreationView,
	},
	{
		path: "/groups/:groupid/dashboard",
		name: "groupdashboard",
		component: GroupDashboardView,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from) => {
	const piniaStore = useMyStore(pinia);
	console.log("Router beforeEach: ", piniaStore.count);

	// return true to continue the navigation
	return true;
});

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(PrimeVue);

app.use(vue3GoogleLogin, {
	clientId:
		"833343365269-kkr166976fa9pnm0npkub9m32o2shbgf.apps.googleusercontent.com",
});

app.mount("#app");
