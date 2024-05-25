<script>
	import Card from "primevue/card";
	import Button from "primevue/button";
	import { doc, getDoc } from "firebase/firestore";
	import { db } from "@/firebase";
	import { getStorage, ref, getDownloadURL } from "firebase/storage";

	export default {
		components: {
			Card,
			Button,
		},
		data() {
			return {
				activityId: "AFrY0EfD2kwUeXTKCTaY",
				activityData: null,
				voteYes: 0,
				voteNo: 0,
				groupId: "pFEG8mejW4aaTMWNhRKa",
				groupMembers: [],
				mediaUrls: [],
			};
		},
		methods: {
			formatDate(timestamp) {},
			removeCircularReferences(obj) {
				const seenObjects = new WeakSet();
				return JSON.parse(
					JSON.stringify(obj, (key, value) => {
						if (value !== null && typeof value === "object") {
							if (seenObjects.has(value)) {
								return;
							}
							seenObjects.add(value);
						}
						return value;
					})
				);
			},

			async fetchGroupMembers() {
				const groupRef = doc(db, "groups", this.groupId);
				const groupSnap = await getDoc(groupRef);

				if (groupSnap.exists()) {
					this.groupMembers = this.removeCircularReferences(
						groupSnap.data().members
					);
				} else {
					console.log("No such group document!");
				}
			},

			async fetchActivityData() {
				try {
					const docRef = doc(db, "activities", this.activityId);
					const docSnap = await getDoc(docRef);

					if (docSnap.exists()) {
						this.activityData = this.removeCircularReferences(docSnap.data());
						if (this.groupId) {
							await this.fetchGroupMembers();
						} else {
							console.log("No group found");
						}

						const storage = getStorage();

						for (const media of this.activityData.media) {
							if (media.endsWith(".mp4")) {
								const storageRef = ref(storage, media);
								const url = await getDownloadURL(storageRef);
								this.mediaUrls.push(url);
							} else {
								this.mediaUrls.push(media);
							}
						}
					} else {
						console.log("No activity found");
					}
				} catch (error) {
					console.error("Error fetching data: ", error);
				}
			},
		},
		async mounted() {
			await this.fetchActivityData();
		},
	};
</script>

<template>
	<section>
		<h1 class="p-text-center">Proposed Activity</h1>
		<Card class="p-mb-3 p-mx-auto" style="max-width: 25rem" v-if="activityData">
			<template #header>
				<div
					v-for="(media, index) in activityData.media"
					:key="index"
					class="p-d-flex p-flex-column p-ai-center"
				>
					<img
						v-if="media.endsWith('.jpg') || media.endsWith('.png')"
						:src="media"
						class="p-mb-2"
						style="max-width: 100%; height: auto"
					/>
					<video
						v-else-if="media.endsWith('.mp4')"
						controls
						:src="mediaUrls[index]"
						class="p-mb-2"
						style="
							max-width: 90%;
							height: auto;
							margin-left: auto;
							margin-right: auto;
							display: block;
						"
					></video>
				</div>
			</template>
			<template #title>{{ activityData.title }}</template>
			<template #subtitle>{{ activityData.organiser }}</template>
			<template #content>
				<div
					v-for="(value, key, index) in activityData.interests"
					:key="index"
					class="interest-bubble p-p-2"
				>
					<strong>{{ key }}</strong>
				</div>
				<p>{{ activityData.date }}</p>
				<p>{{ activityData.description }}</p>
			</template>
		</Card>
		<div class="p-grid p-justify-between">
			<div
				class="p-col-12 p-md-6 p-p-2"
				v-for="member in groupMembers"
				:key="member.id"
			>
				<Card>
					<template #header>
						<div class="p-d-flex p-jc-between">
							<div>{{ member.name }}</div>
						</div>
					</template>
				</Card>
			</div>
		</div>
	</section>
</template>

<style scoped>
	.p-text-center {
		text-align: center;
	}
	.interest-bubble {
		border: 1px solid #000;
		border-radius: 15px;
		text-align: center;
		margin-bottom: 10px;
	}
</style>
