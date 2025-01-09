<script setup>
const props = defineProps(['metadata']);
import { computed } from "vue"
import { timeToString } from "../../data_classes.js"
import { globalState } from "../../globalState.js"
console.log("metadata", props.metadata)
const currentStop = computed(() => {
  if (globalState.tourStatus == null) {
    return null;
  }
  const res = globalState
    .tourStops
    .find((x) => { console.log("find", x, globalState.tourStatus, x.stop_id === globalState.tourStatus.stopID); return x.stop_id === globalState.tourStatus.stopID })
  console.log(res)
  return res;
})

</script>

<template>
  <div v-if="props.metadata">
    <h1 style="color: black">{{ props.metadata.name }}</h1>
    <div>
      <h2 :key="globalState" v-if="currentStop && globalState.tourStatus.active">Current Stop: {{ currentStop.name }}
      </h2>
      <h2 v-else>Tour Inactive!</h2>
    </div>
    <h2>{{ timeToString(props.metadata.start) }} To {{ timeToString(props.metadata.end) }}</h2>
    <p style="color:black">{{ props.metadata.description }}</p>
  </div>
</template>
