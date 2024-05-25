<script setup>
import Button from "primevue/button";
import { useCounterStore } from "@/stores/counter.js";

import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const count = ref(0);
function increment() {
  count.value++;
}
function traverse() {
  router.push({ name: "home", params: { username: "eduardo" } });
}

const store = useCounterStore();
</script>

<template>
  <div>
    <h1>About</h1>

    <p>Store: {{ store.count }}</p>
    <a @click="traverse">home</a>
    <router-link :to="{ name: 'home', params: { username: 'eduardo' } }">home</router-link>
  </div>
</template>

<style scoped></style>
