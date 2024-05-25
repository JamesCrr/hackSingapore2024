import { inject } from "vue";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { defineStore } from "pinia";

export const useMyStore = defineStore("mystore", () => {
  // const route = useRoute();
  //// this assumes `app.provide('appProvided', 'value')` was called
  // const appProvided = inject("appProvided");

  // const count = ref(0);
  // const name = ref("Eduardo");
  // const doubleCount = computed(() => count.value * 2);
  // function increment() {
  //   count.value++;
  // }

  const userObj = ref(0);
  function set_userObj(new_Obj) {
    userObj.value = new_Obj;
  }

  return { userObj, set_userObj };
});
