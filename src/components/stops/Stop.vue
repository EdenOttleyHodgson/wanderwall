<script setup>
const props = defineProps(['stop']);
import { timeToString } from "../../data_classes.js"
</script>
<template>
  <p>{{ props.stop.name }} : {{ timeToString(props.stop.time.start) }}-{{ timeToString(props.stop.time.end) }}</p>
</template>
