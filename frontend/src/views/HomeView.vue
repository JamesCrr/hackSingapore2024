<script setup>
	import { watch } from "vue";
	import { useRouter } from "vue-router";
	import Button from "primevue/button";
	import axios from "axios";
	import { GoogleLogin, googleLogout } from "vue3-google-login";
	import { useMyStore } from "@/stores/mystore.js";

	const myStore = useMyStore();
	const router = useRouter();

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
		myStore.set_userObj(null);
	}
</script>

<template>
	<div>
		<div v-if="!myStore.userObj">
			<h1>Login</h1>
			<GoogleLogin :callback="google_login_callback" />
		</div>
		<div v-else>
			<h1>Home</h1>
			<p>Store: {{ myStore.count }}</p>
			<h3 @click="myStore.increment()">Increment</h3>
			<h3 @click="fetch_test">Fetch data</h3>
			<button @click="google_logout">Logout Google</button>
		</div>
	</div>
</template>

<style scoped></style>
