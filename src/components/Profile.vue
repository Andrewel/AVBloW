<template>
  <div>
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
import firebase from "firebase";
import { db } from "../main";

export default {
  name: "profile",
  data() {
    return {
      key: 2,
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
      let key = this.key.key;
      db.collection("users").add({ name, image, createdAt, key });
      // Clear values
      this.name = "";
      this.image = "";
      key = key + 1;
      var data = {
        key: key
      };
      db.collection("key")
        .doc("key")
        .set(data);
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
</style>
