<script setup>
import { getBackend } from "../../communications/backend_wrapper.js"
import { computed, ref, reactive } from "vue"
import { GoogleMap, Marker, Polyline } from 'vue3-google-map';
import decodePolyline from "decode-google-map-polyline"
const props = defineProps({
  tour_id: ""
});
function addLineOptions(polyline) {
  return {
    path: polyline,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  }
}

const backend = getBackend();
const map = reactive(await backend.getMap(props.tour_id));

const mapData = computed(() => { console.log("map:", map); return processMapData(map) });
function processMapData(data) {
  console.log(data)
  const mapData = data.map((x) => addLineOptions(decodePolyline(x.polyline.encodedPolyline)));
  // return [mapData, mapData[0].path[0]]
  return { lines: mapData, center: mapData[0].path[0] }
}

console.log("mapData", mapData)

</script>

<template>

  <div v-if="mapData">
    <GoogleMap api-key="AIzaSyBGptEOMrYeGaOHNwlt11wTu1ziWn5EKCY" style="width: 100%; height: 500px" :zoom="15"
      :center="mapData.center">
      <Polyline :options="polyline" v-for="polyline in mapData.lines" />
    </GoogleMap>
  </div>


</template>
