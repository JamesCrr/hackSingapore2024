<script setup>
import Button from "primevue/button";
import { useRouter } from "vue-router";
import { defineProps } from 'vue';

const router = useRouter();
const previous = router.getRoutes()
console.log("Previous: ", previous)

function goBack() {
    router.go(-1);
}
</script>

<template>
    <Button label="link" @click="goBack" link>
        < Back</Button>
</template>

<style scoped></style>
