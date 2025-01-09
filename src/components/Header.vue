<script setup>
import { ref } from "vue"
import router from "../router.js"
import { globalState } from "../globalState.js"
const emit = defineEmits(['back-clicked'])
const props = defineProps({
  msg: String
})

const menuOpen = ref(false);

function goBack() {
  emit('back-clicked');  // Emit event to parent
}



</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 2px solid #6b6b6b;
  background-color: #21aecd;
  width: 100%;
  box-sizing: border-box;
}

.headerbutton {

  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  background-color: #21aecd;
  border: none;
  color: black;

}

.navmenu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #21aecd;
  position: absolute;
  top: 55px;
  left: 1px;
  border: 1px solid #000;
  z-index: 100;
  padding: 15px
}

.navitem {
  color: black;
  margin: 5px;
  width: 100%;
  height: 100%;
}

h3 {
  text-align: center;
  flex: 1;
}

.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>

<template>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
  <!-- should import specific icons but this seems to break icons in either header or main component -->
  <div class="header">

    <button @click="menuOpen = !menuOpen" title="Back " class="headerbutton material-symbols-outlined">menu</button>
    <nav class="navmenu" v-if="menuOpen">
      <router-link to="/" class="navitem">Main Menu</router-link>
      <router-link to="/tour" class="navitem" :class="{ disabled: !globalState.currentTourID }">Tour</router-link>
      <router-link to="/stops" class="navitem" :class="{ disabled: !globalState.currentTourID }">Stops</router-link>
      <router-link to="/participants" class="navitem"
        :class="{ disabled: !globalState.currentTourID }">Participants</router-link>
      <router-link to="/chat" class="navitem" :class="{ disabled: !globalState.currentTourID }">Chat</router-link>
    </nav>
    <h3>{{ $route.name }}</h3>
    <button @click="router.replace({ path: '/settings' })" title="Account Settings "
      class="headerbutton material-symbols-outlined">manage_accounts</button>
  </div>
</template>
