<script setup>
import { ref } from "vue"
import { getBackend } from "../communications/backend_wrapper.js"
import router from "../router.js"
const joincode = ref("")
const displayName = ref("")

async function join() {
  try {
    console.log("name val", displayName.value)
    await getBackend()
      .joinTour(displayName.value, joincode.value)
      .then((ID) => { router.replace("/tour") })
  } catch (err) {
    return;
  }
}
</script>

<template>
  <input placeholder="Display Name" v-model="displayName" />
  <input placeholder="Joincode" v-model="joincode" />
  <button @click="join()">Join</button>
</template>
