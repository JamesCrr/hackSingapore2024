<script setup>
import "primeicons/primeicons.css";
import HelloWorld from "./components/HelloWorld.vue";
import PWABadge from "./components/PWABadge.vue";
import TabMenu from 'primevue/tabmenu';
import Button from "primevue/button";
import Sidebar from 'primevue/sidebar';
import Menu from 'primevue/menu';
import { ref } from 'vue';

const visibleLeft = ref(false);

const items = [
  {
    label: 'Home',
    icon: 'pi pi-home',
    route: '/',

  },
  {
    label: 'Opportunities',
    icon: 'pi pi-heart',
    route: '',
  },

  {
    label: 'Groups',
    icon: 'pi pi-users',
    route: '/groups',
  },
  {
    label: 'My Profile',
    icon: 'pi pi-user',
    route: '',
  },
  {
    label: 'About',
    icon: 'pi pi-home',
    route: '/About',
  }
]
</script>

<template>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/favicon.svg" class="logo" alt="frontend logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="frontend" />
  <PWABadge /> -->

  <!-- <div class="card flex flex-wrap gap-3 justify-content-center">
    <Button icon="pi pi-check" aria-label="Submit" />
    <Button label="Submit" icon="pi pi-check" />
    <Button label="Submit" icon="pi pi-check" iconPos="right" />
  </div> -->

  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
  <nav>
    <Button  @click="visibleLeft = true" />
    <Sidebar v-model:visible="visibleLeft" header="GivingBuddies">
      <Menu :model="items">
            <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                </a>
            </template>
        </Menu>
</Sidebar>
    <!-- <TabMenu :model="items">
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span v-bind="props.icon" />
            <span v-bind="props.label">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span v-bind="props.icon" />
          <span v-bind="props.label">{{ item.label }}</span>
        </a>
      </template>
    </TabMenu> -->
    <!-- 
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink> -->
    <!-- <RouterLink to="/about">Go to About</RouterLink>
    <RouterLink to="/search">Go to Search</RouterLink> -->
    <!-- <RouterLink to="/groupcreation">Go to Group Creation</RouterLink>
    <RouterLink to="/groupdashboard">Go to Group Dashboard</RouterLink> -->
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>
