<template>
  <v-card flat tile>
    <!--
      <article class="covers" v-for="(user, idx) in users" :key="idx">
        <div>
          <img
            style="margin: 10px"
            :src="user.image"
            height="291px"
            width="192px"
          />
          <p>{{ user.name }}</p>
          <hr />
          <button class="button" @click="deleteComic(user.id);">Delete</button>
        </div>
      </article>
    -->
    <v-toolbar color="cyan" dark>
      <v-toolbar-side-icon></v-toolbar-side-icon>

      <v-toolbar-title>Application</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon> <v-icon>search</v-icon> </v-btn>
    </v-toolbar>

    <v-container
      v-for="type in types"
      :key="type"
      fluid
      grid-list-md
      grey
      lighten-4
    >
      <v-subheader>{{ type }}</v-subheader>

      <v-layout row wrap>
        <v-spacer></v-spacer>
        <v-flex v-for="user in users" :key="user" xs12 sm6 md4>
          <v-card>
            <!--
              <v-img
                :src="`https://picsum.photos/200/300?image=${getImage()}`"
                height="300px"
              >
                <span
                  class="headline white--text pl-3 pt-3"
                  v-text="card.title"
                ></span>
              </v-img>
            -->
            <v-img :src="user.image" height="300px">
              <span
                class="headline white--text pl-3 pt-3"
                v-text="user.name"
              ></span>
            </v-img>

            <v-card-actions class="white justify-center">
              <v-btn
                v-for="(social, i) in socials"
                :key="i"
                :color="social.color"
                class="white--text"
                fab
                icon
                small
              >
                <v-icon>{{ social.icon }}</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import firebase from "firebase/app";
import { db } from "../main";
export default {
  name: "likes",
  data() {
    return {
      uid: firebase.auth().currentUser.uid,
      users: [],
      types: ["Places to Be", "Places to See", "Places to Live"],
      //cards: ["Good", "Best", "Finest"],
      cards: ["Good", "Best", "Finest"],
      socials: [
        {
          icon: "fab fa-facebook",
          color: "indigo"
        },
        {
          icon: "fab fa-linkedin",
          color: "cyan darken-1"
        },
        {
          icon: "fab fa-instagram",
          color: "red lighten-3"
        }
      ]
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
