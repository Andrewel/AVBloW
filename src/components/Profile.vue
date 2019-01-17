<template>
  <div>
    <button class="button logout" v-on:click="home">Home</button>
    <button class="button logout" v-on:click="logout">Logout</button>
    <article class="covers" v-for="(comic, idx) in comics" :key="idx">
      <div>
        <img
          style="margin: 10px"
          :src="comic.image"
          height="291px"
          width="192px"
        />
        <p>{{ comic.name }}</p>
        <hr />
        <button class="button" @click="deleteComic(comic.id);">Delete</button>
      </div>
    </article>

    <form @submit="addComic(name, image);">
      <h2>Add a New Comic Cover</h2>
      <input v-model="name" placeholder="Comic Name" class="input" required />
      <input
        v-model="image"
        placeholder="Comic Image URL"
        class="input"
        required
      />
      <button type="submit" class="button">Add New Comic</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import { db } from "../main";

export default {
  name: "profile",
  data() {
    return {
      comics: [],
      name: "",
      image: ""
    };
  },
  firestore() {
    return {
      comics: db.collection("users").orderBy("createdAt"),
      key: db.collection("key").doc("key")
    };
  },
  methods: {
    addComic(name, image) {
      const createdAt = new Date();
      //let key = this.key.key;
      let uid = firebase.auth().currentUser.uid;
      let key = 0;
      for (var i = 0; i < uid.length; i++) {
        key = key + uid.charCodeAt(i);
      }
      let user = {
        name: name,
        image: image,
        createdAt: createdAt,
        key: key,
        uid: uid
      };
      /* db.collection("users")
        .doc(uid)
        .add({ name, image, createdAt, key });*/
      // Clear values
      this.name = "";
      this.image = "";
      key = key + 1;
      let data = {
        key: key
      };
      db.collection("key")
        .doc("key")
        .set(data);
      db.collection("users")
        .doc(uid)
        .set(user);
    },
    deleteComic(id) {
      db.collection("users")
        .doc(id)
        .delete();
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    },
    home() {
      this.$router.replace("/comics");
    }
  }
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: black;
}
input,
button {
  margin-bottom: 10px;
}
button {
  background-color: #0476f2;
}
.logout {
  left: 50%;
  top: 100%;
}
.home {
  left: 50%;
  top: 100%;
}
</style>
