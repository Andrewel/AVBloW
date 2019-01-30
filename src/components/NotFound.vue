<template>
  <div class="not-found">
    <img src="../assets/google-logo.png" width="300px" />
    <h3>Wuh!?</h3>
    <p>Looks like you are lost.</p>
    <button v-on:click="notFound" class="button">Go Back To Login</button>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "login",
  data() {
    return {};
  },
  methods: {
    notFound() {
      this.$router.replace('/comics');
    }
  }
};
</script>

<style scoped>
.not-found {
  margin-top: 40px;
}
button {
  margin: 10px 0;
  background-color: #0476f2;
}
p {
  margin-top: 40px;
  font-size: 13px;
}
h3 {
  font-weight: normal;
}
</style>
