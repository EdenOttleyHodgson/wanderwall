<script setup>
import { ref, computed } from 'vue'
import { globalState } from "../globalState.js"
import { getBackend } from "../communications/backend_wrapper.js"

function enableNotifs() {
  Notification.requestPermission().then(async (res) => {
    if (res === "granted") {
      await setupNotificationServiceWorker();
    }
  });
}

const password = ref("")


const getJoincode = (async () => {
  if (globalState.currentTourID) {
    const code = await getBackend().getTourJoincode(globalState.currentTourID)
    console.log(code)
    return code
  } else {
    return "No Tour!"
  }
})

const joincode = ref(await getJoincode())

function goBack() {
  console.log('Back button clicked!');
}

async function becomeAdmin() {
  globalState.isAdmin = await getBackend().requestAdmin(globalState.currentTourID, globalState.displayName, password.value)
  if (globalState.isAdmin) {

    alert("You are now an admin")
  } else {
    alert("Incorrect password")
  }
}

</script>
<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

input {
  margin: 10%;
  border-radius: 10px;
}

h2 {
  text-align: center;
  margin: 10%;
  color: #000;
}

input {
  padding: 6px 10px;
  font-family: inherit;
  margin-bottom: 5%;
}

button {
  margin: 5%;
  background-color: #21aecd;
  border: 1px solid black;
  font-size: medium;
  font-weight: 600;
  padding: 10px;
  border-radius: 10px;
  color: #000;
  width: 40%;
}


.leaveButton {
  margin: 10%;
}

.adminButton {
  margin-top: 0;
}
</style>

<template>
  <div class="container">
    <Suspense>
      <h2 v-if="globalState.currentTourID">Join Code: {{ joincode }}</h2>
    </Suspense>
    <div class="adminStuff" v-if="globalState.currentTourID">
      <input type="text" placeholder="Admin Password" v-model="password">
      <button class="adminButton" @click="becomeAdmin">Become An Admin</button>
    </div>
    <button @click="enableNotifs()">Enable Notifications</button>
  </div>
</template>
