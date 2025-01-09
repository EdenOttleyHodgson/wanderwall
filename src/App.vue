<script setup>
import HelloWorld from "./components/HelloWorld.vue"
import Header from "./components/Header.vue"
</script>

<template>
  <div class="app-wrapper">
    <div class="main">
      <Header />
      <Suspense>
        <div style="overflow-y: auto"><router-view /></div>
        <template #fallback>Loading...</template>
      </Suspense>
    </div>
  </div>
</template>

<style scoped>
.app-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90vw;
  height: 90vh;
  overflow: hidden;
}

.main {
  aspect-ratio: 9/16;
  border: 5px solid black;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  position: relative;
  background-color: white;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  max-width: 100%;
  box-sizing: border-box;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
