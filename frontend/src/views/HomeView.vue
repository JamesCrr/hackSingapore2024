<script setup>
import Button from "primevue/button";
import axios from "axios";
import { useCounterStore } from "@/stores/counter.js";

const store = useCounterStore();

function fetch_test() {
  axios
    .get("https://hacksingapore2024.onrender.com/users")
    .then((response) => {
      // Handle success
      console.log(response.data);
    })
    .catch((error) => {
      // Handle error
      console.error("There was an error!", error);
    });
}
</script>

<template>
  <div>
    <h1>Home</h1>
    <p>Store: {{ store.count }}</p>
    <h3 @click="store.increment()">Increment</h3>
    <h3 @click="fetch_test">Fetch data</h3>
  </div>
</template>

<style scoped></style>
