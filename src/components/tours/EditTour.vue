<script setup>
import { ref } from "vue"
import { globalState } from "../../globalState.js"
import { getBackend } from "../../communications/backend_wrapper.js"
import router from "../../router.js"
import StopSelector from "../stops/StopSelector.vue"
import Stop from "../stops/Stop.vue"
import AskAi from "./AskAi.vue"
const backend = getBackend()

const tourname = ref(globalState.tourData.name)
const description = ref(globalState.tourData.description)

const showingStopSelector = ref(false)
const showingAi = ref(false)

// example list
const stops = ref([...globalState.tourStops])

function goBack() {
  console.log("Back button clicked!")
}

function addStop(stop) {
  console.log("adding stop", stop)
  stops.value.push(stop)
}

function removeStop(stop) {
  console.log("removing stop", stop)
  console.log("before", stops.value)
  stops.value = stops.value.filter((s) => {
    console.log(s, stop, s.stop_id !== stop.stop_id)
    return s.stop_id !== stop.stop_id
  })
  console.log("after", stops.value)

}

function askAi() {
  showingAi.value = true
}

function saveTour() {
  getBackend().update_tour(globalState.currentTourID, {
    tourName: tourname.value,
    description: description.value,
    stops: stops.value,
  })
  router.replace({ path: "/tour" })

  //saves new tour details
}

function aiStopsAdded(stops) {
  stops.forEach((stop) => {
    addStop(stop)
  })
  showingAi.value = false
}
</script>

<style scoped>
.stop-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;

}

.stop-item {
  overflow: hidden;
  align-items: center;
  border-radius: 10px;
}

.stop-details {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  background-color: #21aecd;
}

.stop-title {
  background-color: #b8effb;
  font-size: medium;
  height: fit-content;
  font-weight: bold;
  width: 180px;
  margin: 10px;
  margin-left: 5px;
  border: 1px solid black;
  padding: 5px;
  border-radius: 8px;
}

.topbar {
  padding: 15px 15px 0px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.topbar button {
  margin: 10px;
  background: none;
  border: none;
  color: #000;
}

.bottomButtons {
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
}

.bottomButtons button {
  margin: 10px;
  background: none;
  border: none;
  font-size: medium;
  font-weight: 600;
  color: #000;
}

.removebutton {
  margin: 10px;
  margin-right: 15px;
  background-color: #21aecd;
  background: none;
  border: none;
  color: #000;
}

.tourname {
  font-weight: bold;
  font-size: large;
  flex: 1;
  margin: 0;
  border: 1px solid black;
  padding: 8px;
  border-radius: 10px;
  background-color: #b8effb;
  ;
  width: 60%;

}

.title-and-time {
  align-items: self-start;
  align-content: start;
}

.title-container {
  display: flex;
  flex-direction: row;
  text-align: left;
}

.stop-times {
  padding-left: 5px;
  align-content: start;
  justify-content: start;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.stop-times p {
  margin-left: 0px;
  margin-right: 9px;
}

input[type="time"] {
  font-family: 'Segoe UI', Tahoma, Verdana, sans-serif;
  margin: 10px;
  margin-left: 0px;
  border: 1px solid black;
  padding: 5px;
  ;
  border-radius: 8px;
  ;
  background-color: #b8effb;
  text-align: start;
}
</style>

<template>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
  <!-- <div class="topbar"> -->
  <!--   <input class="tourname" v-model="tourname"> -->
  <!--   <button @click="askAi" title="Ask AI for help" class="material-symbols-outlined">smart_toy</button> -->
  <!-- </div> -->
  <!---->
  <!-- <div class="stop-list"> -->
  <!--   <div class="stop-item" v-for="(stop, index) in stops" :key="stop.id" :class="'stop'"> -->
  <!--     <div class="stop-details"> -->
  <!--       <div class="title-and-time"> -->
  <!--         <div class="title-container"> -->
  <!--           <input class="stop-title" v-model="stop.name"> -->
  <!--         </div> -->
  <!--         <div class="stop-times"> -->
  <!--           <input type="time" name="start" v-model="stop.start"> -->
  <!--           <p>-</p> -->
  <!--           <input type="time" name="end" v-model="stop.end"> -->
  <!--         </div> -->
  <!--       </div> -->
  <!--       <button title="Remove Stop " class="material-symbols-outlined removebutton" -->
  <!--         @click="removeStop(stop)">delete</button> -->
  <!--     </div> -->
  <!--   </div> -->
  <!-- </div> -->
  <!-- <div class="bottomButtons"> -->
  <!--   <div> -->
  <div v-if="showingStopSelector">
    <StopSelector @stopAdded="addStop" @finished="showingStopSelector = false" />
  </div>
  <div v-else-if="showingAi">
    <AskAi @stopsAdded="aiStopsAdded" />
  </div>
  <div v-else>
    <div class="topbar">
      <input class="tourname" v-model="tourname" placeholder="Tour Name" />
      <input class="tourname" v-model="description" placeholder="Tour Description" />
      <button @click="askAi" title="Ask AI for help" class="material-symbols-outlined">
        smart_toy
      </button>
    </div>
    <div class="stop-list">
      <div class="stop-item" v-for="stop in stops" :key="stop.stop_id" :class="'stop'">
        <div class="stop-details">
          <Stop :stop="stop"></Stop>
          <button title="Remove Stop " class="material-symbols-outlined removebutton" @click="removeStop(stop)">
            delete
          </button>
        </div>
      </div>
    </div>
    <div class="buttons">
      <div>
        <button title="Add Stop " class="material-symbols-outlined" @click="showingStopSelector = true">
          add
        </button>
      </div>
      <button @click="saveTour()" title="Save Tour">I'm Done</button>
    </div>
  </div>
</template>
