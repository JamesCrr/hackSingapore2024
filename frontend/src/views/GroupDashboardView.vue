<script setup>
import Panel from "primevue/panel";
import ActivitiesCarousel from "@/components/ActivitiesCarousel.vue";
import InterestTags from "@/components/InterestsTags.vue";
import{ GroupConverter } from "@/utils/dtos.js";
import { onMounted, watch, computed, ref } from "vue";
import Button from "primevue/button";
import axios from "axios";
import { useMyStore } from "@/stores/mystore.js";
import { useCollection, useDocument } from "vuefire";
import { useRoute } from "vue-router";
import { collection, doc, query, where, getDoc } from "firebase/firestore";
import { db } from "@/firebase.js";

const myStore = useMyStore();
const route = useRoute();

const groups = collection(db, "groups").withConverter(GroupConverter);
const group = ref({});
const activities = ref([]);

onMounted(async () => {
	group.value = await getDoc(doc(db, "groups", route.params.id)).then((doc) => doc.data());

	const participation = group.value.participation
	const activitiesIds = participation.map((part) => part.activity);

	const activitiesPromises = activitiesIds.map((id) => getDoc(doc(db, "activities", id)).then((doc) => doc.data()));
	activities.value = await Promise.all(activitiesPromises);
});

</script>

<template>
	<section class="mx-3">
		<h1>Group {{ group.name }} Dashboard</h1>
		<section class="card">
			<Panel header="Description" toggleable collapsed="true">
				<p class="m-0">
					{{ group.description }}
				</p>
				<section class="mt-3">
					<InterestTags :interests="group.interests" />
				</section>
				<p style="font-weight: 600;">Members</p>
			</Panel>
		</section>
		<section >
			<h2>Proposed Activities</h2>
			<ActivitiesCarousel :activities="activities"></ActivitiesCarousel>
		</section>
	</section>
</template>

<style scoped></style>
