<script setup>
import { ref } from 'vue'

const joinCode = ref('')

  
function newTour(){
  
}

function logOut(){

}

function join(){

}
    
</script>

<style>

.container{
  display: flex;
  flex-direction: column; 
  align-items: center; 
  text-align: center;  
  background-color: #21aecd;
}
input{

  margin: 10px;
  border: 1px solid black;
  padding: 10px;;
  border-radius: 8px;
  width: 50vw;

}
h1 {
  color: #000;
}
h2{
  text-align: center;
  margin-bottom: 10px;
  color: #000;
}

.joinText{
  text-align: center;
  margin: 20px;
  color: #000;
}
textarea {
  width: 280px;
  height: 140px;
  padding: 5px 10px;
  font-family: inherit;
}
button{
  margin: 20px;
  margin-top: 10px;
  background-color: white;
  border: 1px solid black;
  font-size: medium;
  font-weight: 600;
  padding: 10px;
  border-radius: 10px;
  width: 60px;
  color: #000;
}

.logout{
  position: fixed;
  bottom: 2px;
  border: none;
  background-color: #21aecd;
  font-size: medium;
}

.createContainer{
  margin-top: 20px;
}

input {
  width: 100px;
}
</style>
  
<template>
<div class="container">
<h1>Welcome to WanderWall!</h1>
<div class="joinContainer">
<h2 class="joinText">Join a tour</h2>
<input v-model="joinCode" placeholder="Enter Code">
<button @click="join">Join Tour</button>
</div>
<div class="createContainer">
<h2>Or start a new tour</h2>
<button @click="newTour">Create Tour</button>
</div>
<button @click="logOut" class="logout">Logout</button>
</div>
</template>
