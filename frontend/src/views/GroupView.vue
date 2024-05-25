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
import { RouterLink } from "vue-router";

</script>

<template>
    <section class="mx-2">
        <h1>My Groups</h1>

        <router-link to="/groups/new" append>
            <Button>Create New Group</Button>
        </router-link>
    </section>
</template>

<style scoped></style>
