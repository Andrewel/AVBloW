<template>
  <div>
    <v-btn outline color="indigo" class="button home" v-on:click="home"
      >Home</v-btn
    >
    <v-btn outline color="indigo" class="button logout" v-on:click="logout"
      >Logout</v-btn
    >
    <article class="covers" v-for="(comic, idx) in comics" :key="idx">
      <div>
        <v-avatar
          class="avatar"
          :tile="false"
          size="200px"
          color="grey lighten-4"
        >
          <img
            style="margin: 10px"
            :src="comic.image"
            height="300px"
            width="200px"
          />
        </v-avatar>
        <p>{{ comic.name }}</p>
        <v-btn
          dark
          small
          color="error"
          class="button"
          @click="deleteComic(comic.id);"
          >Delete</v-btn
        >
      </div>
    </article>
    <form @submit="addComic(name, downloadURL);">
      <h2>Update</h2>
      <v-btn
        class="upload_button"
        @click.native="selectFile"
        v-if="!uploadEnd && !uploading"
      >
        Upload a cover image
        <v-icon right aria-hidden="true"> add_a_photo </v-icon>
      </v-btn>
      <input
        id="files"
        type="file"
        name="file"
        ref="uploadInput"
        accept="image/*"
        :multiple="false"
        @change="detectFiles($event);"
      />
      <v-progress-circular
        v-if="uploading && !uploadEnd"
        :size="100"
        :width="15"
        :rotate="360"
        :value="progressUpload"
        color="primary"
      >
        {{ progressUpload }}
      </v-progress-circular>
      <!--
        <img v-if="uploadEnd" :src="downloadURL" width="30%" />
        <div v-if="uploadEnd">
          <v-btn class="ma-0" dark small color="error" @click="deleteImage();">
            Delete
          </v-btn>
        </div>
      -->
      <br />
      <input
        v-model="name"
        type="text"
        class="input"
        placeholder="Login"
        required
      />
      <br />
      <v-btn small type="submit" class="button">Add New Comic</v-btn>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import { firestorage } from "../main";
import { db } from "../main";
export default {
  name: "profile",
  data() {
    return {
      progressUpload: 0,
      fileName: "",
      uploadTask: "",
      uploading: false,
      uploadEnd: false,
      downloadURL: "",
      comics: [],
      name: "",
      image: "",
      uid: firebase.auth().currentUser.uid
    };
  },
  firestore() {
    return {
      comics: db.collection("users").where("uid", "==", this.uid),
      key: db.collection("key").doc("key")
    };
  },
  methods: {
    addComic(name, downloadURL) {
      const createdAt = new Date();
      //let key = this.key.key;
      //let uid = firebase.auth().currentUser.uid;
      let key = 0;
      for (var i = 0; i < this.uid.length; i++) {
        key = key + this.uid.charCodeAt(i);
      }
      let user = {
        name: name,
        image: downloadURL,
        createdAt: createdAt,
        key: key,
        uid: this.uid
      };
      /* db.collection("users")
        .doc(uid)
        .add({ name, image, createdAt, key });*/
      // Clear values
      this.name = "";
      this.downloadURL = "";
      key = key + 1;
      let data = {
        key: key
      };
      db.collection("key")
        .doc("key")
        .set(data);
      db.collection("users")
        .doc(this.uid)
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
    },
    selectFile() {
      this.$refs.uploadInput.click();
    },
    detectFiles(e) {
      let fileList = e.target.files || e.dataTransfer.files;
      Array.from(Array(fileList.length).keys()).map(x => {
        this.upload(fileList[x]);
      });
    },
    upload(file) {
      //this.fileName = file.name;
      this.fileName = this.uid;
      this.uploading = true;
      this.uploadTask = firestorage.ref("images/" + this.uid).put(file);
      // this.uploadTask = firestorage.ref("images/" + file.name).put(file);
    },
    deleteImage() {
      firestorage
        .ref("images/" + this.fileName)
        .delete()
        .then(() => {
          this.uploading = false;
          this.uploadEnd = false;
          this.downloadURL = "";
        })
        .catch(error => {
          console.error(`file delete error occured: ${error}`);
        });
    }
  },
  watch: {
    uploadTask() {
      this.uploadTask.on(
        "state_changed",
        sp => {
          this.progressUpload = Math.floor(
            (sp.bytesTransferred / sp.totalBytes) * 100
          );
        },
        null,
        () => {
          this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.uploadEnd = true;
            this.downloadURL = downloadURL;
            this.$emit("downloadURL", downloadURL);
          });
        }
      );
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
  background-color: black;
}
.avatar {
  margin: 20px;
}
.upload_button {
  text-align: center;
}
.logout {
  position: absolute;
  left: 90%;
  top: 5%;
}
.home {
  position: absolute;
  left: 82%;
  top: 5%;
}
.progress-bar {
  margin: 10px 0;
}
input[type="file"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}
input {
  align-self: center;
  margin: 10px 0;
  width: auto;
  padding: 15px;
}
</style>
