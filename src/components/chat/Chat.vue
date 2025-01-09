<script setup>
import { ref } from 'vue'
import { socketState, sendChatMsg } from "../../communications/clientSocket.js"
import { globalState } from "../../globalState.js"

const msgToSend = ref('')

// example list


function goBack() {
  console.log('Back button clicked!');
}

function send() {
  sendChatMsg(globalState.currentTourID, globalState.displayName, msgToSend.value)
  msgToSend.value = ''
}
//will also need func to update list / accept messages from others
//This has been accomplished via the reactive socketState object - Eden

</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}

ul {
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 20px;

}

li {
  display: inline-block;
  width: fit-content;
  border-radius: 50%;
  border: 2px black;
  margin: -10px;
  align-items: start;
}

.myMsg {
  align-self: flex-end;
  margin-right: 10px;
}

.myMsg .content {
  background-color: #98e2f3;
  border-color: #135797;
  text-align: right;
}

.myMsg .name {
  text-align: right;
}

.name {
  font-weight: 600;
  font-size: small;
  margin: 0px;
  color: #000;
  text-align: left;
}

.content {
  padding: 10px;
  background-color: #71c5d8;
  border-radius: 15px;
  border: 2px solid #135797;
  margin: 3px 0px 40px 0px;
  color: #000;
}

h1 {
  text-align: center;
  margin: 40px;
}

form {
  display: block;
  width: 100%;
  padding: 8px;
  background-color: #11687b;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
}

.bottomBar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

input {
  flex-grow: 4;
  height: 22px;
  border-radius: 5px;
  background-color: white;
  color: #000;
}

.sendbutton {
  padding: 0;
  display: flex;
  flex-grow: 1;
  height: 35px;
  background-color: #21aecd;
  font-weight: 600;
  border: 1px solid black;
  border-radius: 5px;
  justify-content: center;
  flex-direction: column;
  color: #000;

}
</style>

<template>
  <ul style="height: 90%">
    <!-- the own chat message thing was cool but if im being honest i cba to go add more arguments on the server cause we'd have to use the participant ID not the display name - eden -->
    <li v-for="msg in socketState.chatMessages" :key="msg.id" :class="['wholeMessage']">
      <p class="name">{{ msg.displayName }}</p>
      <p class="content">{{ msg.content }}</p>
    </li>
  </ul>

  <form @submit.prevent="send" style="height:10%">
    <div class="bottomBar" style="height: 100%">
      <input v-model="msgToSend" required placeholder="Enter your message here" style="margin: 10%">
      <button class="sendbutton">Send</button>
    </div>
  </form>

</template>
