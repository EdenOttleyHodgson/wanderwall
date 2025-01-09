<script setup>
import { ref } from "vue"
import { getBackend } from "../../communications/backend_wrapper"
import { globalState } from "../../globalState"
import router from "../../router.js"

const backend = getBackend()

const tourName = ref("")
const password = ref("")

async function create() {
  const res = await backend.createTour(tourName.value, password.value)

  globalState.displayName = tourName.value
  globalState.selfID = res.adminID
  globalState.isAdmin = true
  globalState.currentTourID = res.tourID

  globalState.tourData = await backend.getTourData(globalState.currentTourID)
  globalState.tourStops = await backend.getTourStops(globalState.currentTourID)

  router.replace({ path: "edit" })
}
</script>

<template>
  <form @submit.prevent="create">
    <input type="text" v-model="tourName" placeholder="Your Name" />
    <input type="password" v-model="password" placeholder="Admin Password" />

    <button type="submit">Create Tour</button>
  </form>
</template>
