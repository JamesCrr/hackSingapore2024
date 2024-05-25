<script setup>
import { ref, onMounted, computed } from "vue";
import Carousel from "primevue/carousel";
import Button from "primevue/button";
import Image from "primevue/image";
import { ref as storageRef } from 'firebase/storage'
import { getStorage, getDownloadURL } from "firebase/storage";

const storage = getStorage();

const props = defineProps({
    activities: {
        type: Array,
        required: true
    }
})


const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]);

async function getImageUrl(activity) {
    const fileRef = storageRef(storage, activity.media[0]);
    return await getDownloadURL(fileRef);
}


</script>

<template>
    {{ images }}
    <Carousel :value="activities" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions" :showNavigators="false">
        <template #item="slotProps">
            <div class="border-1 surface-border border-round p-3">
                <img :src="images[slotProps.index]" alt="activity" class="w-full" />

                <h3 class="mb-3 font-medium">{{ slotProps.data.title }}</h3>
                <p>{{ slotProps.data.date.toDate() }}</p>
                <div class="flex justify-content-between align-items-center">
                    <!-- <div class="mt-0 font-semibold text-xl">${{ slotProps.data.price }}</div> -->
                    <span>
                        <Button icon="pi pi-heart" severity="secondary" outlined />
                        <Button icon="pi pi-shopping-cart" class="ml-2" />
                    </span>
                </div>
            </div>

        </template>
    </Carousel>
</template>

<style scoped></style>