<template>
  <div id="app" v-cloak>
    <tinder ref="tinder" :queue.sync="users2" @submit="submit">
      <template slot-scope="{ data, index }">
        <span id="span_uid" class="text2">{{ data.uid }}</span>
        <span id="span_name" class="text">{{ data.name }}</span>
        <img id="span_image" :src="data.image" />
      </template>

      <img
        class="like-pointer"
        slot="like"
        src="https://johnnydan.oss-cn-beijing.aliyuncs.com/vue-tinder/like-txt.png"
      />
      <img
        class="nope-pointer"
        slot="nope"
        src="https://johnnydan.oss-cn-beijing.aliyuncs.com/vue-tinder/nope-txt.png"
      />
      <img
        class="super-pointer"
        slot="super"
        src="https://johnnydan.oss-cn-beijing.aliyuncs.com/vue-tinder/super-txt.png"
      />
    </tinder>
    <div class="btns">
      <img
        src="https://johnnydan.oss-cn-beijing.aliyuncs.com/vue-tinder/nope.png"
        @click="decide('nope');"
        width="70"
      />
      <img
        src="https://johnnydan.oss-cn-beijing.aliyuncs.com/vue-tinder/super-like.png"
        @click="decide('super');"
        width="100"
      />
      <img
        src="https://johnnydan.oss-cn-beijing.aliyuncs.com/vue-tinder/like.png"
        @click="decide('like');"
        width="70"
      />
    </div>

    <v-flex xs12 sm4 text-xs-center>
      <v-btn fab dark color="pink" class="like" v-on:click="likes">
        <v-icon dark>favorite</v-icon>
      </v-btn>
      <v-btn outline fab color="indigo" class="profile" v-on:click="profile">
        <v-icon>edit</v-icon>
      </v-btn>
    </v-flex>
  </div>
</template>

<script>
import firebase from "firebase/app";
import { db } from "../main";
import Tinder from "./Tinder";
export default {
  name: "comics",
  components: {
    Tinder
  },
  data() {
    return {
      bottomNav: "recent",
      matches: [],
      User: [],
      users3: [],
      users2: [],
      users1: [],
      users: [],
      uid: firebase.auth().currentUser.uid
    };
  },
  firestore() {
    return {
      // users: db.collection("users").where("like", "==", false).orderBy("createdAt"),
      users: db.collection("users"),
      users1: db
        .collection("users")
        .doc(this.uid)
        .collection("MyLikes"),
      User: db.collection("users").doc(this.uid),
      matches: db
        .collection("users")
        .doc(this.uid)
        .collection("MeLikes")
    };
  },
  created() {
    this.getData();
    //this.Compare();
  },
  methods: {
    /**
     * 用于产生demo用的数据
     * @method getData
     */
    getData() {
      /*
      let users = [];
      let users1 = [];
      db.collection("users")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            users = doc.data();
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", users);
          });
        });
      db.collection("users")
        .doc(this.uid)
        .collection("MyLikes")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            this.users3 = doc.data();
            //  this.users3 = doc.data();
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", this.users3.uid);
          });
        });
      console.log(users1); */
      /*
      var officersIds = [];
      for (const [key, value] of Object.entries(this.users)) {
        let compare = 0;
        for (const [key1, value1] of Object.entries(this.users1)) {
          console.log("value" + value.uid);
          console.log("value1" + value1.uid);
          if (value.uid == value1.uid) {
            compare = 1;
          }
        }
        if (compare == 0) {
          officersIds.push(value);
        }
        console.log(officersIds);
      }
      console.log(this.users3);
      this.users2 = this.users2.concat(officersIds);
      */
      /*
      let arr = [];
      this.$bind("users3", db.collection("users")).then(todos => {
        this.users3 === todos;
        arr = this.users3;
        // todos are ready to be used
        // if it contained any reference to other document or collection, the
        // promise will wait for those references to be fetched as well
        console.log(this.users3);
        // you can unbind a property anytime you want
        // this will be done automatically when the component is destroyed
        //this.$unbind("todos");
        return arr;
      });
      console.log(arr);
      */
      const list = [];
      for (let i = 0; i < 1; i++) {
        list.push({
          name: "Swipe to Update!",
          key: 123,
          uid: 228,
          image:
            "https://lh3.googleusercontent.com/A1kOKhL2FErp3GjXewczMYeT-FGVgiS0NFo0FQeT1w3eqWfsgV_Mp3PVk4pDSvXbu6kpkteceaJF0mQVt1aDNAbb8OqZybxI26Ek5CHfAqWSH5UsdjxSpkkuwx4JxnoW-MHl-q6B71XTjfmWSfqadBdYmW5FusZelIA1dFoOy0J3OmCRVWgmIGm7gE77RP5gCPw52mRCoB145xJdWIqY90VQ-AaF9vpUgHBy2Cp3HrgxviC30YpAacySUuZr4WmE7FvYIB3m5J3QHFAgOxermRFnkb2w43elDWmFUR6hg_J03DtzHVRcuZ6RVIdqRGsZREML5imNE-x7umo3heAr110Rt7NiFkoB67v7e2i133PBu8qqutMt7O5A3Tjk2Uw0FFWDRNwUl_NXby9_yxYCLQ8xJLL1BPxWB0Y2wgPk6WDM65yp3XcU8DYozAIjU7D32KXizEFEoJPMcSPNURs8Wy5wV-rxPSXRzSoEEcKKSsJghXZRqDnK7CPaAc4Q3Y-Empv6TogthFJeDPJomRN1dRAaxENL3dqsq3pEgu_y4sImxt4aAR-HwamBpsiwm_r-xh_Kq1-Vgt5Pfoo6_rekApVXVo8KYvAu3tV_9oZhYahlMgzFZnGV1TMttjgljPH4r2wsJq_dV0wTtwlKhgs57i5TDepjFbIE=w400-h374-no"
        });
      }
      // this.locations = this.locations.concat(list);
      this.users2 = this.users2.concat(list);
      //this.locations.map(v => (v.key = Math.random() * 100 - 5));
    },
    Compare() {
      var officersIds = [];
      for (const [key, value] of Object.entries(this.users)) {
        let compare = 0;
        for (const [key1, value1] of Object.entries(this.users1)) {
          console.log("value" + value.uid);
          console.log("value1" + value1.uid);
          if (value.uid == value1.uid) {
            compare = 1;
          }
        }
        if (compare == 0) {
          officersIds.push(value);
        }
        console.log(officersIds);
      }
      this.users2 = this.users2.concat(officersIds);

      let unique = [...new Set(this.users.map(item => item.uid))];
      console.log("unique" + unique);

      var officersIds = [];
      this.users.forEach(function(officer) {
        officersIds.push(officer.uid);
      });
      console.log(officersIds);
    },
    Likes(choice) {
      let span_uid = document.getElementById("span_uid").innerText;
      //let span_uid = document.getElementById("span_uid").value // innerHTML;
      let span_name = document.getElementById("span_name").innerText;
      let span_image = document.getElementById("span_image").src;
      let key = {
        key: choice.key,
        name: span_name,
        image: span_image,
        like: true,
        uid: span_uid
      };
      db.collection("users")
        .doc(this.uid)
        .collection("MyLikes")
        .doc(span_uid)
        .set(key);
      //
      db.collection("users")
        .doc(span_uid)
        .collection("MeLikes")
        .doc(this.uid)
        .set(this.User);
      db.collection("users")
        .doc(span_uid)
        .collection("MeLikes")
        .doc(this.uid)
        .set(
          {
            like: true
          },
          { merge: true }
        );
      //
      /*
      Object.entries(this.matches).forEach(([key, value]) =>
       console.log(key, value)
      );*/

      for (const entry of this.matches.entries()) {
        //   console.log(entry);
      }
      for (const [key, value] of this.matches.entries()) {
        // console.log(key, value.uid);
      }
      for (const [key, value] of Object.entries(this.matches)) {
        if (value.uid === span_uid) {
          db.collection("users")
            .doc(this.uid)
            .collection("Matches")
            .doc(span_uid)
            .set({
              key: choice.key,
              name: span_name,
              image: span_image,
              uid: span_uid,
              match: true,
              [this.uid]: span_uid
            });
          db.collection("users")
            .doc(span_uid)
            .collection("Matches")
            .doc(this.uid)
            .set(this.User);
          db.collection("users")
            .doc(span_uid)
            .collection("Matches")
            .doc(this.uid)
            .set(
              {
                match: true,
                [span_uid]: this.uid
              },
              { merge: true }
            );
        }
      }
      /*
      db.collection("users")
        .doc(this.uid)
        .collection("Matches")
        .set({
          match: true,
          [this.uid]: span_uid
        }); */
      /*
      for (var i = 0; i < this.matches.length; i++) {
        if (this.matches.uid == span_uid) {
          db.collection("users")
            .doc(this.uid)
            .collection("Matches")
            .set({
              match: true,
              [this.uid]: span_uid
            });
        }
      }*/
      /*
      db.collection("users")
        .doc(this.uid)
        .collection("MeLikes")
        .doc(span_uid)
        .update({
          match: true,
          [this.uid]: true
        });
        */
    },
    DisLikes(choice) {
      let span_uid = document.getElementById("span_uid").innerText;
      //let span_uid = document.getElementById("span_uid").value // innerHTML;
      let span_name = document.getElementById("span_name").innerText;
      let span_image = document.getElementById("span_image").src;
      let key = {
        key: choice.key,
        name: span_name,
        image: span_image,
        like: false,
        uid: span_uid
      };
      db.collection("users")
        .doc(this.uid)
        .collection("MyLikes")
        .doc(span_uid)
        .set(key);
      db.collection("users")
        .doc(span_uid)
        .collection("MeLikes")
        .doc(this.uid)
        .set(this.User);
      db.collection("users")
        .doc(span_uid)
        .collection("MeLikes")
        .doc(this.uid)
        .set(
          {
            like: false
          },
          { merge: true }
        );
    },
    SuperLikes(choice) {
      let span_uid = document.getElementById("span_uid").innerText;
      //let span_uid = document.getElementById("span_uid").value // innerHTML;
      let span_name = document.getElementById("span_name").innerText;
      let span_image = document.getElementById("span_image").src;
      let key = {
        key: choice.key,
        name: span_name,
        image: span_image,
        superlike: true,
        uid: span_uid
      };
      db.collection("users")
        .doc(this.uid)
        .collection("MyLikes")
        .doc(span_uid)
        .set(key);
      db.collection("users")
        .doc(span_uid)
        .collection("MeLikes")
        .doc(this.uid)
        .set(this.User);
      db.collection("users")
        .doc(span_uid)
        .collection("MeLikes")
        .doc(this.uid)
        .set(
          {
            like: true,
            superlike: true
          },
          { merge: true }
        );
    },
    /**
     * 点击按钮所绑定的方法，此方法为调用vue-tinder组件内方法的示例，仅供参考
     * @method submit
     * @param  {String} choice
     */
    decide(choice) {
      this.$refs.tinder.decide(choice);
    },
    /**
     * 自定义事件submit绑定的方法，移除卡片的回调
     * @method submit
     * @param  {Object} choice {type,key}
     */

    submit(choice) {
      let span_uid = document.getElementById("span_uid").innerText;
      if (span_uid != 228) {
        switch (choice.type) {
          case "nope":
            //alert("Nope");
            this.DisLikes(choice); // 左滑
            break;
          case "like":
            // alert("Yep" + choice.key);
            this.Likes(choice); // 右滑
            //this.Compare();
            break;
          case "super":
            //  alert("Super");
            this.SuperLikes(choice); // 上滑
            break;
          default:
            // alert("Error");
            this.Compare();
        }
        if (this.users2.length < 0) {
          this.getData();
          //this.Compare();
        }
      } else {
        this.Compare();
      }
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("/login");
        });
    },
    profile() {
      this.$router.replace("/profile");
    },
    likes() {
      this.$router.replace("/likes");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>
html,
body {
  height: 100%;
}
body {
  margin: 0;
  background-image: linear-gradient(rgba(252, 252, 253, 0.5), #f7f7fb);
  // overflow: auto;
}

#app .vue-tinder {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 2%;
  margin: auto;
  width: calc(100% - 20px);
  height: calc(100% - 23px - 18%);
  min-width: 300px;
  max-width: 355px;
}
.background_photo {
  margin: 20px;
}

[v-cloak] {
  display: none;
}

.nope-pointer,
.like-pointer {
  position: absolute;
  z-index: 1;
  top: 20px;
  width: 64px;
  height: 64px;
}

.nope-pointer {
  right: 10px;
}

.like-pointer {
  left: 10px;
}
.super-pointer {
  position: absolute;
  z-index: 1;
  bottom: 80px;
  left: 0;
  right: 0;
  margin: auto;
  width: 112px;
  height: 78px;
}
.pic {
  width: 100%;
  height: 100%;
  background-size: cover;
}
.btns {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  height: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 300px;
  max-width: 355px;
}
.card {
  align-items: center;
  background-color: green;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  font-size: 72px;
  height: 300px;
  justify-content: center;
  left: calc(50% - 550px);
  position: absolute;
  top: calc(50% - 100px);
  width: 300px;
}
.text {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10%;
}
.text2 {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  color: white;
}
#app .like {
  position: absolute;
  left: 0;
  bottom: 0;
}
#app .profile {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
