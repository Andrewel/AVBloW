<template>
  <v-app>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12>
          <img src="../assets/google-logo.png" width="100px" class="sign-up" />
          <h3>Create a new account</h3>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>

            <v-select
              v-model="select"
              :items="items"
              :rules="[v => !!v || 'Item is required']"
              label="Item"
              required
            ></v-select>
            <v-flex xs12 sm6 md4>
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="date"
                persistent
                lazy
                full-width
                width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="date"
                  label="Picker in dialog"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="date" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="modal = false;">Cancel</v-btn>
                  <v-btn color="primary" @click="$refs.dialog.save(date);"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-dialog>
            </v-flex>

            <v-checkbox
              v-model="checkbox"
              :rules="[v => !!v || 'You must agree to continue!']"
              label="Do you agree?"
              required
            ></v-checkbox>
            <v-btn v-on:click="signUp" class="button">Sign Up</v-btn>
            <v-btn
              v-on:click="signUp"
              :disabled="!valid"
              color="success"
              @click="validate"
            >
              Validate
            </v-btn>

            <v-btn color="error" @click="reset"> Reset Form </v-btn>

            <v-btn color="warning" @click="resetValidation">
              Reset Validation
            </v-btn>
            <v-btn class="button">
              <router-link to="/login">Back</router-link>
            </v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import firebase from "firebase";
export default {
  name: "signup",
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      login: "",
      email: "",
      password: "",
      valid: true,
      name: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ],
      // email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      select: null,
      items: ["Belarus", "Russia", "Norway", "Ukrain"],
      checkbox: false
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
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>

<style scoped>
.sign-up {
  align-self: center;
  margin-top: 10px;
}
form {
  align-self: center;
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
  margin-top: 10px;
  font-size: 13px;
}
h3 {
  font-weight: normal;
}
</style>
