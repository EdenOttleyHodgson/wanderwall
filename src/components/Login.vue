<script setup>
import { ref } from 'vue'

const login = ref(true)

function toggle() {
  login.value = !login.value
}
</script>

<style>
*{
    align-items: center;
}

.container{
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}

h2{
  text-align: center;
  margin: 40px;
  color: #000;
}

.details{
    display: flex;
    flex-direction: column;
    margin: 40px;
    width: 90%;
}

.buttons{
    display: flex;
    flex-direction: column;
    width: 90%;
}

button{
    width: 50%;
    margin: 10px;
    padding:10px;
    background-color: #21aecd;
    border: 1px solid black;
    font-size: medium;
    font-weight: 600;
    border-radius: 10px;
    color: #000;
}

input{
  margin: 10px;
  border: 1px solid black;
  padding: 8px;
  border-radius: 8px;
  width: 72%

}

</style>

<!-- login and signup one component, can switch between login or signup w button -->

<template> 
<div class="container">
<h2 v-if="login">Log In</h2>
<h2 v-else>Sign Up</h2>

<div class="details">
    
    <input placeholder="Username">
    <input placeholder="Password">

</div>
<div class="buttons">
    <button v-if="login">Login</button>
    <button v-else=>Sign Up</button>

    <button v-if="login" @click="toggle">Sign up instead</button>
    <button v-else @click="toggle">I already have an account</button>
</div>
</div>
</template>