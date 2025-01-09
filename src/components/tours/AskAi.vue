<script setup>
import { ref } from "vue"
import { getBackend } from "../../communications/backend_wrapper"
import { v4 } from "uuid"
import { GoogleMap, Marker } from "vue3-google-map"
import { Stop, LatLng, Geolocation } from "../../data_classes"
import { globalState } from "../../globalState.js"
import SimpleStops from "./SimpleStops.vue"
const emit = defineEmits(["stopsAdded"])

const description = ref("")
const suggestions = ref([])
const accepted = ref([])
const title = ref("Ask AI")
const suggestion = ref({})
const start = ref({
  hours: new Date().getHours(),
  minutes: new Date().getMinutes(),
})
const end = ref({
  hours: new Date().getHours(),
  minutes: new Date().getMinutes(),
})

function goBack() {
  console.log("Back button clicked!")
}

async function getSuggestions() {
  console.log("Ask AI button clicked!")

  const res = await getBackend().ask_ai(globalState.currentTourID, description.value)

  if (res.length == 0 || !res) {
    alert("No suggestions found!")
  }

  suggestions.value = res
}

function showOnMap(loc) {
  suggestion.value = loc
}

function addStop() {
  if (start.value && end.value) {
    const stop = new Stop(
      v4(),
      new Geolocation(
        new LatLng(suggestion.value.geolocation.latitude, suggestion.value.geolocation.longitude)
      ),
      suggestion.value.name,
      start.value,
      end.value
    )
    accepted.value.push(stop)

    // reset form data
    start.value = {
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
    }
    end.value = {
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
    }
    suggestion.value = {}
  } else {
    alert("Not all fields filled!")
  }
}

function addToTour() {
  emit("stopsAdded", accepted.value)
}
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

input {
  margin: 10px;
  border: 1px solid black;
  padding: 5px;
  border-radius: 8px;
  color: #000;
}

.suggestion-name {
  color: black
}

h2 {
  text-align: center;
  color: #000;
  margin: 20px;
}

h3 {
  text-align: center;
  margin: 20px;
  color: #000;
}

textarea {
  width: 280px;
  height: 140px;
  padding: 5px 10px;
  font-family: inherit;
  border-radius: 10px;
  border: 2px solid black;
  background-color: #b8effb;
  color: #000;
}

button {
  margin: 20px;
  background-color: #21aecd;
  border: 1px solid black;
  font-size: medium;
  font-weight: 600;
  padding: 10px;
  border-radius: 10px;
  color: #000;
}

label {
  color: #000;
}

input[type="number"] {
  width: 80px;
}

p {
  color: black
}

li {
  display: flex;
  align-items: center;
  flex-direction: row;
}

ul {
  padding: 0;
  width: 100%;
}

.suggestion-name {
  flex: 1 1 0%;
}
</style>

<template>
  <div class="container">
    <h2>Ask AI to suggest a tour!</h2>
    <span v-if="suggestions.length == 0">
      <textarea class="ai-input" placeholder="Describe tour" v-model="description"></textarea>
      <button @click="getSuggestions">Ask AI</button>
    </span>
    <span v-else>
      <div v-if="!!suggestion.name">
        <GoogleMap api-key="AIzaSyBGptEOMrYeGaOHNwlt11wTu1ziWn5EKCY" @click="showOnMap"
          style="width: 100%; height: 500px" :zoom="15"
          :center="{ lat: suggestion.geolocation.latitude, lng: suggestion.geolocation.longitude }">
          <Marker :options="{
            position: {
              lat: suggestion.geolocation.latitude,
              lng: suggestion.geolocation.longitude,
            },
          }" />
        </GoogleMap>
        <p>{{ suggestion.name }}</p>
        <VueDatePicker v-model="start" time-picker />
        <VueDatePicker v-model="end" time-picker />
        <button @click="addStop()">Add Stop</button>
      </div>
      <div v-else>
        <h2>Suggestions</h2>
        <ul>
          <li v-for="suggestion in suggestions" :key="suggestion.id">
            <p class="suggestion-name" style="color:black">{{ suggestion.name }}</p>
            <button @click="showOnMap(suggestion)">Add</button>
          </li>
        </ul>
        <h3>Selected</h3>
        <ul>
          <SimpleStops :stops="accepted" />
        </ul>
        <button @click="addToTour">Add Selected</button>
      </div>
    </span>
  </div>
</template>
