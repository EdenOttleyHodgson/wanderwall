<script setup>
import { ref } from 'vue';
import { v4 } from 'uuid'
import { Stop, LatLng, Geolocation } from '../../data_classes.js'
import VueDatePicker from "@vuepic/vue-datepicker"
import '@vuepic/vue-datepicker/dist/main.css'
import { GoogleMap, Marker } from 'vue3-google-map'
const emit = defineEmits(['stopAdded', 'finished'])

const name = ref("");
const start = ref({
  hours: new Date().getHours(),
  minutes: new Date().getMinutes()
})
const end = ref({
  hours: new Date().getHours(),
  minutes: new Date().getMinutes()
})
const markerLoc = ref({ lat: 0, lng: 0 });




function addStop() {
  if (name.value && start.value && end.value && markerLoc.value) {
    const stop = new Stop(v4(), new Geolocation(new LatLng(markerLoc.value.lat, markerLoc.value.lng)), name.value, start.value, end.value)
    emit('stopAdded', stop)
    // reset form data
    name.value = ""
    start.value = {
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
    }
    end.value = {
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
    }
    markerLoc.value = { lat: 50.934611, lng: -1.397218 }
    emit('finished')
  } else {
    alert("Not all fields filled!")
  }
}
function mapClicked(ev) {
  console.log("Map clicked", ev)
  if (ev.latLng) {
    let new_val = {
      lat: ev.latLng.lat(), lng: ev.latLng.lng()
    }
    markerLoc.value = new_val
  }
  console.log(markerLoc.value)
}

</script>

<template>
  <GoogleMap api-key="AIzaSyBGptEOMrYeGaOHNwlt11wTu1ziWn5EKCY" @click="mapClicked" style="width: 100%; height: 500px"
    :zoom=15 :center="markerLoc">
    <Marker :options="{ position: markerLoc }" />
  </GoogleMap>

  <input placeholder="Name" v-model="name" />
  <VueDatePicker v-model="start" time-picker />
  <VueDatePicker v-model="end" time-picker />
  <button @click="addStop()">Add Stop</button>
  <button @click="emit('finished')">Cancel</button>
</template>
