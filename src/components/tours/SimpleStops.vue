<script setup>
const props = defineProps(['stops']);
console.log("stops:", props.stops)
import { timeToString } from "../../data_classes.js"
</script>
<style>
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
  <!-- <div v-for="stop in props.stops" class="horizontal-flex"> -->
  <!--   <h3>{{ stop.name }}</h3> -->
  <!--   <h3>{{ stop.time.start }} -> {{ stop.time.end }} </h3> -->
  <!-- </div> -->


  <div class="stop-list">
    <div class="stop-item" v-for="stop in props.stops" :class="'stop'">
      <div class="stop-details">
        <div class="title-container">
          <div class="material-symbols-outlined circles">radio_button_checked</div>
          <div class="stop-title">{{ stop.name }}</div>
        </div>
        <div class="stop-time">{{ timeToString(stop.time.start) }} - {{ timeToString(stop.time.end) }}</div>
      </div>
    </div>
  </div>

</template>
