<script setup>
import Button from "primevue/button";
import axios from "axios";
import { GoogleLogin, googleLogout } from "vue3-google-login";
import { useMyStore } from "@/stores/mystore.js";

const myStore = useMyStore();

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

function google_login_callback(response) {
  // This callback will be triggered when the user selects or login to his Google account from the popup
  myStore.set_userObj(response);
}
function google_logout() {
  googleLogout();
}
</script>

<template>
  <div>
    <h1>Home</h1>
    <p>Store: {{ myStore.count }}</p>
    <h3 @click="store.increment()">Increment</h3>
    <h3 @click="fetch_test">Fetch data</h3>
    <GoogleLogin :callback="google_login_callback" />
    <button @onclick="google_logout">Logout Google</button>
  </div>
</template>

<style scoped></style>
