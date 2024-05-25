<script setup>
import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import MultiSelect from 'primevue/multiselect';
import { doc, collection, addDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useDocument } from "vuefire";
import { ref } from "vue";
import { Group, GroupConverter } from "@/utils/dtos"
import { computed } from "vue";
import { useToast } from "primevue/usetoast";
import { useMyStore } from "@/stores/mystore"
import BackButton from "@/components/BackButton.vue"

const group = ref(new Group())
const groupsRef = collection(db, 'groups').withConverter(GroupConverter);

const interestEnum = useDocument(doc(db, "enums/interests"))
const interests = computed(() => interestEnum.value && Object.keys(interestEnum.value))

const toast = useToast();

// const groups = useFirestore(groupsRef)
const myStore = useMyStore()

function createGroup() {
	const creatorId = myStore.userObj?.client_id;
	if (creatorId === null) {
		toast.add({ severity: 'error', summary: 'Error', detail: 'Please login to create a group' });
		return;
	}

	group.value.creator = "users/" + creatorId
	addDoc(groupsRef, group.value)
	group.value = new Group()
	toast.add({ severity: 'success', summary: 'Success', detail: 'Group created successfully' });
}

</script>

<template>
	<BackButton class="mt-2"></BackButton>
	<section class="mx-2">
		<h1 class="mt-1">Create New Group</h1>

		<form class="flex flex-column gap-4" @submit.prevent="createGroup">
			<section class="flex flex-column gap-2">
				<label for="groupname">Group name</label>
				<InputText id="groupname" v-model="group.name" required />
			</section>
			<section class="flex flex-column gap-2">
				<label for="description">Description</label>
				<InputText id="description" v-model="group.description" required />
			</section>
			<section class="">
				<label for="selectedInterests">Interests</label>
				<MultiSelect v-model="group.interests" :options="interests" filter id="selectedInterests"
					placeholder="Select Interests" :maxSelectedLabels="3" class="w-full" />
			</section>
			<Button type="submit" class="block">Create Group</Button>
		</form>

		<Toast></Toast>
	</section>
</template>

<style scoped></style>
