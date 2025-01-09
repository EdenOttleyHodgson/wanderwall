<script setup>
import { globalState } from "../globalState";
import { reactive } from "vue";
import { getBackend } from "../communications/backend_wrapper";
import { Stop, Geolocation, LatLng } from "../data_classes.js"
const backend = getBackend();
let tourID;
let userID;
const stops = [
  new Stop(1, new Geolocation(new LatLng(50.907113, -1.404581)), "Site 1", { hours: 12, minutes: 0 }, { hours: 12, minutes: 1 }),
  new Stop(2, new Geolocation(new LatLng(50.906907, -1.403183)), "Site 2", { hours: 12, minutes: 30 }, { hours: 12, minutes: 31 }),
  new Stop(3, new Geolocation(new LatLng(50.908907, -1.403183)), "Site 3", { hours: 12, minutes: 32 }, { hours: 12, minutes: 41 }),
  new Stop(4, new Geolocation(new LatLng(50.909907, -1.403183)), "Site 4", { hours: 12, minutes: 33 }, { hours: 12, minutes: 51 }),
  // new Stop(3, new Geolocation(new LatLng(0.2, 0)), "Site 3", "12:20", "12:21"),
  // new Stop(4, new Geolocation(new LatLng(0.3, 0)), "Site 4", "12:30", "12:31"),
]
async function createTour() {
  const res = await backend.createTour("John Ploggle", "password");
  console.log("Create res", res)
  globalState.displayName = "John Ploggle";
  tourID = res.tourID;
  userID = res.adminID;
  globalState.currentTourID = tourID;
  console.log("debugID 1", userID)
  await backend.updateTourStops(globalState.currentTourID, stops)
  await backend.update_tour(globalState.currentTourID, { tourName: "Gloggle", description: "Ploggle" })
}
async function deleteTour() {

  await backend.deleteTour(globalState.currentTourID)
}
async function addParticipants() {
  console.log("debug ID 2", userID)
  const joincode = await backend.getTourJoincode(globalState.currentTourID);
  console.log(joincode)
  for (let i = 0; i < 4; i++) {
    await backend.joinTour(`Participant ${i}`, joincode)
  }
  console.log("debug ID", userID)
  backend.authToken = userID;
}
// function joinTour() { }
</script>
<template>
  <button @click="createTour()">Create Tour</button>
  <button @click="addParticipants()">Add Participants</button>
  <button @click="joinTour()">Join Tour</button>
  <button @click="deleteTour()">Delete Tour</button>
  <button @click="console.log(globalState)">Dump State</button>
</template>
