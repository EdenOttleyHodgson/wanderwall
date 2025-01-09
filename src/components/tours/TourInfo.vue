<script setup>
import { ref } from 'vue'
import { globalState } from '../../globalState.js'
import Header from "../Header.vue"
import TourMetadata from "./TourMetadata.vue"
import SimpleStops from "./SimpleStops.vue"
import AdminBar from "./AdminBar.vue"
import { getBackend } from "../../communications/backend_wrapper.js"
import { timeToString } from "../../data_classes.js"

function leave() {
  getBackend().removeParticipant(globalState.currentTourID, globalState.selfID, globalState.displayName)
}
//const title = ref('Tour details')
//const tourname = ref('Tour Name')

// example list
// const stops = ref([
//   { id: id++, name: 'Sobar', start: '15:00', end: '17:00' },
//   { id: id++, name: 'Hobbit', start: '17:00', end: '18:00' },
//   { id: id++, name: 'Stags', start: '18:00', end: '19:00' },
//   { id: id++, name: 'Jesters', start: '19:00', end: '20:00' }
//
// ])

function goBack() {
  console.log('Back button clicked!');
}


</script>

<style scoped>
.stop-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
}

.stop-item {

  overflow: hidden;
  align-items: center;
  text-align: left;
}

.stop-details {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
  padding-bottom: 0px;
  padding-top: 0px;

}

.stop-title {
  font-size: large;
  padding-left: 10px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin: 0px;
  height: fit-content;
  font-weight: bold;
  color: #000;
}


.stop-time {
  color: #3f3f3f;
  font-size: 1rem;
  font-weight: bold;
  color: #000;
}

.stop-map {
  display: flex;
  justify-content: center;
  align-items: center;
}

.stop-map img {
  background-color: aquamarine;
  width: 80%;
  object-fit: fill;
  border: 2px solid black;
  border-radius: 10px;
  margin: 20px;
}

.topbar {
  padding: 15px 15px 0px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000;
}

.topbar button {
  margin: 10px;
  background: none;
  border: none;
  color: #000;
}

.tourname {
  font-weight: bold;
  font-size: large;
  color: #000;
}

.title-container {
  display: flex;
  flex-direction: row;
}

.lines {
  padding-left: 14px;
  padding-top: 8px;
  padding-top: 0;
  padding-bottom: 0;
  color: #000;
}

.circles {
  color: #000;
}
</style>

<template>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
  <!-- <div class="topbar"> -->
  <!--   <button title="Edit Tour" class="material-symbols-outlined">edit</button> -->
  <!-- </div> -->

  <div v-if="globalState.currentTourID && globalState.tourStops.length > 0">
    <TourMetadata :metadata="globalState.tourData" />
    <!-- <SimpleStops :stops="globalState.tourStops" /> -->
    <div class="stop-list">
      <div class="stop-item" v-for="stop in globalState.tourStops" :key="stop.stop_id" :class="'stop'">
        <div class="stop-details">
          <div class="title-container">
            <div class="material-symbols-outlined">radio_button_checked</div>
            <div class="stop-title">{{ stop.name }}</div>
          </div>
          <div class="stop-time">{{ timeToString(stop.time.start) }} - {{ timeToString(stop.time.end) }}</div>
        </div>
      </div>
    </div>
    <AdminBar v-if="globalState.isAdmin" />
    <button v-else @click="leave()">Leave Tour</button>
  </div>
  <div v-else>
    The tour has no stops!
  </div>
  <!-- <div class="stop-map"> -->
  <!--   <img src='https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg' alt="stop image"> -->
  <!-- </div> -->
</template>
