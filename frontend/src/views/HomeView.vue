<script setup>
	import { watch } from "vue";
	import { useRouter } from "vue-router";
	import Button from "primevue/button";
	import axios from "axios";
	import { ref, onMounted } from "vue";
	import { useMyStore } from "@/stores/mystore.js";
	const myStore = useMyStore();
	import { GoogleLogin, googleLogout } from "vue3-google-login";

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

	// function google_login_callback(response) {
	// 	// This callback will be triggered when the user selects or login to his Google account from the popup
	// 	myStore.set_userObj(response);
	// }

	// function google_logout() {
	// 	googleLogout();
	// 	myStore.set_userObj(null);
	// }

	const CLIENT_ID =
		"833343365269-kkr166976fa9pnm0npkub9m32o2shbgf.apps.googleusercontent.com";
	const API_KEY = "AIzaSyCZMfyYubpijfhpkfjn09cfJOcfF4swrrM";
	const DISCOVERY_DOCS = [
		"https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
		"https://people.googleapis.com/$discovery/rest?version=v1",
	];
	const SCOPES =
		"https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
	// const SCOPES = [
	//   "https://www.googleapis.com/auth/calendar.readonly",
	//   "https://www.googleapis.com/auth/userinfo.email",
	//   "https://www.googleapis.com/auth/userinfo.profile",
	// ];

	let googleBtn = ref(null);
	let access_token = "";
	let tokenClient;
	let gapiInited = false;
	let gisInited = false;

	/**
	 * Callback after api.js is loaded.
	 */
	function gapiLoaded() {
		window.gapi.load("client", initializeGapiClient);
	}
	/**
	 * Callback after the API client is loaded. Loads the
	 * discovery doc to initialize the API.
	 */
	async function initializeGapiClient() {
		await window.gapi.client.init({
			apiKey: API_KEY,
			discoveryDocs: DISCOVERY_DOCS,
		});
		gapiInited = true;
		maybeEnableButtons();
	}
	/**
	 * Callback after Google Identity Services are loaded.
	 */
	function gisLoaded() {
		tokenClient = window.google.accounts.oauth2.initTokenClient({
			client_id: CLIENT_ID,
			scope: SCOPES,
			callback: (tokenResponse) => {
				access_token = tokenResponse.access_token;
			},
		});
		gisInited = true;
		maybeEnableButtons();
	}

	/**
	 * Enables user interaction after all libraries are loaded.
	 */
	function maybeEnableButtons() {
		if (gapiInited && gisInited) {
			console.log("GAPI initialised");

			// window.google.accounts.id.prompt();
		}
	}

	async function getUserInfo() {
		console.log(
			"window.gapi.client.people.people:",
			window.gapi.client.people.people
		);
		await window.gapi.client.people.people
			.get({
				resourceName: "people/me",
				"requestMask.includeField": "person.names",
			})
			.then(function (resp) {
				// var p = document.createElement('p');
				var name = resp.result.names[0].givenName;
				// p.appendChild(document.createTextNode('Hello, '+name+'!'));
				// document.getElementById('content').appendChild(p);
				console.log("Name:", name);
			});
	}

	/**
	 *  Sign in the user upon button click.
	 */
	async function handleAuthClick() {
		if (!gapiInited || !gisInited) {
			console.log("GAPI NOT initialised YET");
			return;
		}

		tokenClient.callback = async (response) => {
			if (response.error !== undefined) {
				throw response;
			}
			// console.log("resp:", response);
			// console.log("window.gapi.client:", window.gapi.client);
			getUserInfo();
			// listUpcomingEvents();
		};

		if (window.gapi.client.getToken() === null) {
			// Prompt the user to select a Google Account and ask for consent to share their data
			// when establishing a new session.
			tokenClient.requestAccessToken({ prompt: "consent" });
		} else {
			// Skip display of account chooser and consent dialog for an existing session.
			tokenClient.requestAccessToken({ prompt: "" });
		}
	}

	/**
	 *  Sign out the user upon button click.
	 */
	function handleSignoutClick() {
		const token = window.gapi.client.getToken();
		if (token !== null) {
			window.google.accounts.oauth2.revoke(token.access_token);
			window.gapi.client.setToken("");
			console.log("Signed out!");
		}
	}

	/**
	 * Print the summary and start datetime/date of the next ten events in
	 * the authorized user's calendar. If no events are found an
	 * appropriate message is printed.
	 */
	async function listUpcomingEvents() {
		let response;
		try {
			const request = {
				calendarId: "primary",
				timeMin: new Date().toISOString(),
				showDeleted: false,
				singleEvents: true,
				maxResults: 10,
				orderBy: "startTime",
			};
			response = await window.gapi.client.calendar.events.list(request);
		} catch (err) {
			console.log("GAPI error:" + err.message);
			return;
		}

		const events = response.result.items;
		if (!events || events.length == 0) {
			console.log("GAPI: No events found.");
			return;
		}
		// Flatten to string to display
		const output = events.reduce(
			(str, event) =>
				`${str}${event.summary} (${
					event.start.dateTime || event.start.date
				})\n`,
			"Events:\n"
		);

		console.log("GAPI: " + output);
	}

	onMounted(() => {
		let gapiScript = document.createElement("script");
		gapiScript.defer = true;
		gapiScript.async = true;
		gapiScript.onreadystatechange = gapiScript.onload = function () {
			const interval = setInterval(function () {
				if (
					!gapiScript.readyState ||
					/loaded|complete/.test(gapiScript.readyState)
				) {
					clearInterval(interval);
					if (window.gapi) {
						gapiLoaded();
					} else {
						console.log("Failed to load gapi");
					}
				}
			}, 100);
		};
		gapiScript.src = "https://apis.google.com/js/api.js";
		document.head.appendChild(gapiScript);

		let gisScript = document.createElement("script");
		gisScript.defer = true;
		gisScript.async = true;
		gisScript.onreadystatechange = gisScript.onload = function () {
			const interval = setInterval(function () {
				if (
					!gisScript.readyState ||
					/loaded|complete/.test(gisScript.readyState)
				) {
					clearInterval(interval);
					if (window.google && window.google.accounts) {
						gisLoaded();
					} else {
						console.log("Failed to load gis");
					}
				}
			}, 100);
		};
		gisScript.src = "https://accounts.google.com/gsi/client";
		document.head.appendChild(gisScript);
	});
</script>

<template>
	<div>
		<h1>Home</h1>
		<p>Store: {{ myStore.count }}</p>
		<h3 @click="store.increment()">Increment</h3>
		<h3 @click="fetch_test">Fetch data</h3>
		<!-- <GoogleLogin :callback="google_login_callback" />
    <button @onclick="google_logout">Logout Google</button> -->

		<button @click="handleAuthClick()">Authorize</button>
		<button @click="handleSignoutClick()">Sign Out</button>
		<button @click="listUpcomingEvents()">Fetch Events</button>
	</div>
	<!--<div>
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
  </div> -->
</template>

<style scoped></style>
