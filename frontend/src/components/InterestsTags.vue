<script setup>
import Chip from "primevue/chip";
import { defineProps } from "vue";

const props = defineProps(["interests"]);

</script>

<template>
    <section class="w-full card flex flex-wrap gap-2">
        <Chip v-for="interest in interests" :key="interest" :label="interest" class="" />
    </section>
</template>

<style scoped></style>
