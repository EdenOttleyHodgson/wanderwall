<script setup>
import { ref } from 'vue'
import { globalState } from "../../globalState.js"
import { getBackend } from "../../communications/backend_wrapper.js"
//let id = 0
//const title = ref('Tour Members')
// example list
// const users = ref([
//  { id: id++, text: 'Username1' },
//  { id: id++, text: 'Username2' },
//  { id: id++, text: 'Username3' },
//  { id: id++, text: 'Username4' },
//]) 

function goBack() {
  console.log('Back button clicked!');
}

// only visual remove here
function removeUser(user) {
  getBackend().removeParticipant(globalState.currentTourID, user.ID, user.displayName)

  //users.value = users.value.filter((t) => t !== user)
}
</script>

<style scoped>
ul {
  flex-grow: 1;
  /* Makes the ul stretch to take remaining height */
  padding: 0;
  margin: 0;
  list-style-type: none;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 2px solid #ddd;
  width: 100%;
  box-sizing: border-box;

}


.menubutton {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  background: none;
  border: none;
  color: #000;
}

p {

  display: inline;
  margin: 0;
  flex-grow: 1;
  color: #000;
}
</style>

<template>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
  <ul>
    <li v-for="user in globalState.participants" :key="user.ID">
      <p>{{ user.displayName }}</p>
      <button class="menubutton material-symbols-outlined" @click="removeUser(user)" title="Remove User">delete</button>
    </li>
  </ul>
</template>
