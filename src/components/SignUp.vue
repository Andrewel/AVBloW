<template>
  <div class="sign-up">
    <img src="../assets/google-logo.png" width="100px" />
    <h3>Create a new account</h3>
    <input
      v-model="login"
      type="text"
      class="input"
      placeholder="Login"
      required
    />
    <br />
    <input
      v-model="email"
      type="text"
      class="input"
      placeholder="Email"
      required
    />
    <br />
    <input
      v-model="password"
      type="password"
      class="input"
      placeholder="Password"
      required
    />
    <br />
    <v-btn v-on:click="signUp" class="button">Sign Up!</v-btn>
    <v-btn class="button">
      <router-link to="/login"> Back </router-link>
    </v-btn>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "signup",
  data() {
    return {
      login: "",
      email: "",
      password: ""
    };
  },
  methods: {
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$router.replace("/login");
        })
        .catch(err => {
          alert(err.message);
        });
    }
  }
};
</script>

<style scoped>
.sign-up {
  margin-top: 40px;
}
input {
  align-self: center;
  margin: 10px 0;
  width: auto;
  padding: 15px;
}
button {
  margin: 10px 0;
  background-color: #0476f2;
}
a {
  color: #2c3e50;
}
p {
  margin-top: 40px;
  font-size: 13px;
}
h3 {
  font-weight: normal;
}
</style>
