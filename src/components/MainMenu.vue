<script setup>

import { setupNotificationServiceWorker } from "../communications/notifications";
import TourInfo from "./tours/TourInfo.vue"
import router from "../router.js"

import { globalState } from "../globalState.js"
function join() {
  router.replace({ path: 'join' })
}

function newTour() {
  router.replace({ path: 'create' })
}

</script>
<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: white;
  overflow-y: hidden;
}


input {

  margin: 10px;
  border: 1px solid black;
  padding: 10px;
  ;
  border-radius: 8px;
  width: 50vw;

}

h2 {
  color: #000;
  margin: 10px;
  margin-top: 28px;
}

h3 {
  text-align: center;
  margin-bottom: 5px;
  color: #000;
}

.joinText {
  text-align: center;
  margin: 20px;
  color: #000;
}

textarea {
  width: 280px;
  height: 140px;
  padding: 5px 10px;
  font-family: inherit;
}

button {
  margin: 10px;
  margin-top: 10px;
  background-color: white;
  border: 1px solid black;
  font-size: medium;
  font-weight: 600;
  padding: 10px;
  border-radius: 10px;
  background-color: #21aecd;
  color: #000;
}

.logout {


  background-color: #21aecd;
  font-size: medium;
}

.createContainer {
  margin-top: 20px;
  width: 90%;
  margin-bottom: 20px;
}

.joinContainer {
  width: 90%;
  margin-bottom: 20px;
}

input {
  width: 100px;
}
</style>

<template>
  <div class="container">
    <h2>Welcome to WanderWall!</h2>
    <div class="joinContainer">
      <h3 class="joinText">Join a tour</h3>
      <button @click="join">Join Tour</button>
    </div>
    <div class="createContainer">
      <h3>Or start a new tour</h3>
      <button @click="newTour">Create Tour</button>
    </div>
  </div>
</template>
