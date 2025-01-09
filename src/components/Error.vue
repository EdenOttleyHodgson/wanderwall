<script setup>
import { ref } from 'vue'
const props = defineProps({
  msgTitle: String,
  msgContent: String
})

function close() {

}

</script>
<style>
html, body{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
}
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #b8effb;
  width: 290px;
  height: fit-content;
  border: 2px solid black;
  border-radius: 26px;
  padding: 10px 0px;
}
h2 {
  text-align: center;
  margin: 10px;
}
button {
  border: none;
  background: none;
  position: absolute;
  top: 15px;
  right: 15px;
}
</style>
<template>
  <div class="container">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
    <button @click="close" title="Back " class="menubutton material-symbols-outlined">close</button>
    <h2>{{ msgTitle || "Error" }}</h2>
    <p>{{ msgContent || "Sorry! Looks like something's gone wrong, please try again." }}</p>
  </div>
</template> 
