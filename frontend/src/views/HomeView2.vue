<script setup>
import { handleSignInClick, handleSignOutClick, setUpGAPIScripts } from "@/utils/ensureGoogleSignIn.js";
import { ref, onMounted } from "vue";
import { doc, collection, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { User, UserConverter } from "@/utils/dtos";
import { useMyStore } from "@/stores/mystore.js";
const myStore = useMyStore();
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

/**
 * Return google user's calender events
 */
function addMonths(date, months) {
  var d = date.getDate();
  date.setMonth(date.getMonth() + +months);
  if (date.getDate() != d) {
    date.setDate(0);
  }
  return date;
}
async function getUpcomingGoogleEvents(maxMonths = 6) {
  let response;
  let result = [];
  let currentDatePlus6Months = addMonths(new Date(), maxMonths);
  try {
    const request = {
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      timeMax: currentDatePlus6Months.toISOString(),
      showDeleted: false,
      singleEvents: true,
      // maxResults: 10,
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
    return result;
  }
  // // Flatten to string to display
  // const output = events.reduce(
  //   (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
  //   "Events:\n"
  // );
  // console.log("GAPI: " + output);

  for (let event of events) {
    result.push(event);
  }

  return result;
}
async function updateFirebaseUser() {
  let google_id = null;
  await window.gapi.client.people.people
    .get({
      resourceName: "people/me",
      "requestMask.includeField": "person.names",
    })
    .then(function (resp) {
      let name = resp.result.names[0].givenName;
      google_id = resp.result.names[0].metadata.source.id;
      console.log("Name:", name, "Id:", google_id);
    });

  if (google_id == null) {
    console.log("Id is null!");
  }

  const upcomingEvents = await getUpcomingGoogleEvents();
  console.log("upcomingEvents:", upcomingEvents);
  // Replace data in Firestore
  await setDoc(doc(db, "users", google_id), { calender: upcomingEvents }, { merge: true });

  // Go to groups page
  router.push({ name: "groupdashboard", params: { groupid: "eduardo" } });
}

onMounted(() => {
  setUpGAPIScripts();
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

    <button @click="handleSignInClick()">Authorize</button>
    <button @click="handleSignOutClick()">Sign Out</button>
    <button @click="getUpcomingGoogleEvents()">Fetch Events</button>
  </div>
</template>

<style scoped></style>
