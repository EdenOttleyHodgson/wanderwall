<script setup>
import { globalState } from "../../globalState.js"
import { timeToString } from "../../data_classes.js"
import RouteMap from "../maps/RouteMap.vue"
import Stop from "./Stop.vue"
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
  <div v-if="globalState.currentTourID && globalState.tourStops.length > 0">
    <Suspense>
      <RouteMap :tour_id="globalState.currentTourID" />
      <template #fallback>
        Loading Map...
      </template>
    </Suspense>
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

  </div>
</template>
