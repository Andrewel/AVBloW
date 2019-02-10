<template>
  <v-layout column justify-center>
    <v-subheader>Today</v-subheader>

    <v-expansion-panel popout>
      <v-expansion-panel-content
        v-for="(user, i) in users"
        :key="i"
        hide-actions
      >
        <v-layout slot="header" align-center row spacer>
          <v-flex xs4 sm2 md1>
            <v-avatar slot="activator" size="36px">
              <img :src="user.image" alt="Avatar" />
            </v-avatar>
          </v-flex>
          <v-flex sm5 md3 hidden-xs-only>
            <strong v-html="user.name"></strong>
            <span v-if="user.key" class="grey--text">
              &nbsp;({{ user.key }})
            </span>
          </v-flex>
          <v-flex no-wrap xs5 sm3>
            <v-chip
              v-if="user.name"
              color="indigo lighten-4"
              class="ml-0"
              label
              small
            >
              {{ user.key }} new
            </v-chip>
            <strong v-html="user.name"></strong>
          </v-flex>
          <v-flex
            v-if="user.name"
            class="grey--text"
            ellipsis
            hidden-sm-and-down
          >
            &mdash; {{ user.name }}
          </v-flex>
        </v-layout>

        <v-card>
          <v-divider></v-divider>
          <v-card-text v-text="lorem"></v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-layout>
</template>

<script>
import firebase from "firebase/app";
import { db } from "../main";
export default {
  name: "likes",
  data() {
    return {
      messages: [
        {
          avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          name: "John Leider",
          title: "Welcome to Vuetify.js!",
          excerpt: "Thank you for joining our community..."
        },
        {
          color: "red",
          icon: "people",
          name: "Social",
          new: 1,
          total: 3,
          title: "Twitter"
        },
        {
          color: "teal",
          icon: "local_offer",
          name: "Promos",
          new: 2,
          total: 4,
          title: "Shop your way",
          exceprt: "New deals available, Join Today"
        }
      ],
      lorem:
        "Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.",
      uid: firebase.auth().currentUser.uid,
      users: []
    };
  },
  firestore() {
    return {
      users: db
        .collection("users")
        .doc(this.uid)
        .collection("MyLikes"),
      User: db.collection("users").where("uid", "==", this.uid)
    };
  },
  methods: {
    getImage() {
      const min = 550;
      const max = 560;

      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
};
</script>

<style></style>
