<script>
	import Card from "primevue/card";
	import { doc, collection, getDoc } from "firebase/firestore";
	import { db } from "@/firebase";

	export default {
		data() {
			return {
				activityId: "Whj1Cyus9ZAZEeZXDwYQ",
				activityData: null,
				voteYes: 0,
				voteNo: 0,
			};
		},
		async mounted() {
			const docRef = doc(db, "activities", this.activityId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				this.activityData = docSnap.data();
			} else {
				console.log("No such document!");
			}
		},
		methods: {
			vote(option) {
				if (option === "yes") {
					this.voteYes++;
				} else if (option === "no") {
					this.voteNo++;
				}
			},
		},
	};
</script>

<template>
	<section class="mx-2">
		<h1>Proposed</h1>

		<Card style="width: 25rem; overflow: hidden" v-if="activityData">
			<template #title>{{ activityData.name }}</template>
			<template #subtitle>{{ activityData.date }}</template>
			<template #content>
				<div class="flex gap-3 mt-1">
					<Button @click="vote('yes')" label="Vote Yes" class="w-full" />
					<Button @click="vote('no')" label="Vote No" class="w-full" />
				</div>
			</template>
			<template #footer>
				<p>Yes votes: {{ voteYes }}</p>
				<p>No votes: {{ voteNo }}</p>
			</template>
		</Card>
	</section>
</template>

<style scoped></style>
