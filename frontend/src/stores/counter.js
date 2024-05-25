import { inject } from "vue";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const route = useRoute();
  // this assumes `app.provide('appProvided', 'value')` was called
  const appProvided = inject("appProvided");

  const count = ref(0);
  const name = ref("Eduardo");
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, name, doubleCount, increment };
});
