<template>
  <div id="app" class="content"><router-view /></div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
html {
  overflow-y: scroll;
}
#app {
  overflow-y: scroll;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin: 60px 10vw;
}
</style>
