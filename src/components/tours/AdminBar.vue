<script setup>
import router from "../../router.js"
import { ref } from "vue"
import { getBackend } from "../../communications/backend_wrapper.js"
import { globalState } from "../../globalState.js"
const finished = ref(false)
function edit() {
  router.replace({ path: "/edit" })
}
function leave() {
  getBackend().removeParticipant(globalState.currentTourID, globalState.selfID, globalState.displayName)
}
function advance() {
  const currentTour = globalState.tourStops.find((x) => x.stop_id === globalState.tourStatus.stopID)
  const idx = globalState.tourStops.indexOf(currentTour);
  let status = null;
  let stopToNotify;
  if (!globalState.tourStatus || !globalState.tourStatus.active) {
    status = { active: true, stopID: globalState.tourStops[0].stop_id }
    stopToNotify = globalState.tourStops[0];
  } else if (idx + 1 < globalState.tourStops.length) {
    console.log("next stop", globalState.tourStops[idx + 1], "stops:", globalState.tourStops, idx)
    stopToNotify = globalState.tourStops[idx + 1];
    status = { active: globalState.tourStatus.active, stopID: globalState.tourStops[idx + 1].stop_id }
  } else {
    stopToNotify = globalState.tourStops[idx];
    status = { active: false, stopID: globalState.tourStatus.stopID }
    finished.value = true;
  }
  getBackend().update_tour(globalState.currentTourID, { status })
  try {
    getBackend().notify(globalState.currentTourID, `Moving to: ${stopToNotify.name}`, "Get Moving!")

  } catch (err) {

  }
}
function showJoincode() {
  getBackend().getTourJoincode(globalState.currentTourID).then((code) => alert(code));
}
function deleteTour() {
  const backend = getBackend();
  getBackend().deleteTour(globalState.currentTourID);
}
</script>

<style scoped>
.centered {
  display: flex;
  flex: 1 1 0;
  align-items: center;
  justify-content: space-around
}
</style>

<template>
  <div class="centered" v-if="globalState.currentTourID">
    <button @click="edit()">Edit Tour</button>
    <button @click="leave()">Leave Tour</button>
    <button @click="deleteTour()">Delete</button>
  </div>
  <button v-if="globalState.currentTourID" v-show="!finished" @click="advance()">Advance</button>
</template>
