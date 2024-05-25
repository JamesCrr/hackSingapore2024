<script setup>
	import { onMounted, watch } from "vue";
	import Button from "primevue/button";
	import axios from "axios";
	import { useMyStore } from "@/stores/mystore.js";

	const myStore = useMyStore();

	const fetchGroupData = async (id) => {
		try {
			const response = await axios.get(`/api/groups/${id}`);
			myStore.groupData = response.data;
		} catch (error) {
			console.error(`Failed to fetch group id: ${error}`);
		}
	};

	onMounted(() => {
		const id = route.params.id;
		fetchGroupData(id);
	});

	watch(
		() => route.params.id,
		(newId, oldId) => {
			console.log(`Route changed from ${oldId} to ${newId}`);
			fetchGroupData(newId);
		}
	);
</script>

<template>
	<div>
		<h1>Group Dashboard</h1>
		Group {{ $route.params.id }}
	</div>
	<div>
		<!-- google calendar sync logo
        other calendar app sync logo
        add your own schedule -->
		<h1>test</h1>
	</div>
</template>

<style scoped></style>
