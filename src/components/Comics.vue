<template>
  <div id="app" v-cloak>
    <button class="button logout" v-on:click="logout">Logout</button>
    <button class="button profile" v-on:click="profile1">Profile</button>
    <tinder ref="tinder" :queue.sync="users" @submit="submit">
      <template slot-scope="{ data, index }">
        <span class="text">{{ data.name }}</span>
        <img :src="data.image" width="400" />
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
        width="100"
        height="100"
      />
      <img
        src="https://johnnydan.oss-cn-beijing.aliyuncs.com/vue-tinder/super-like.png"
        @click="decide('super');"
        width="100"
        height="100"
      />
      <img
        src="https://johnnydan.oss-cn-beijing.aliyuncs.com/vue-tinder/like.png"
        @click="decide('like');"
        width="100"
        height="100"
      />
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";
import Tinder from "./Tinder";
//import Tinder from "./vue-tinder";
export default {
  name: "Comics",
  components: {
    Tinder
  },
  data() {
    return {
      users: [],
      queue: [
        {
          key: 1,
          image:
            "https://firebasestorage.googleapis.com/v0/b/avpush-1267f.appspot.com/o/photo%2Felon2.jpg?alt=media&token=b78706c3-fcbd-4cfd-96ad-513f85b26cc7"
        },
        {
          key: 2,
          image:
            "https://firebasestorage.googleapis.com/v0/b/avpush-1267f.appspot.com/o/photo%2Felon2.jpg?alt=media&token=b78706c3-fcbd-4cfd-96ad-513f85b26cc7"
        }
      ]
    };
  },
  firestore() {
    return {
      users: db.collection("users").orderBy("createdAt")
    };
  },
  created() {
    this.getData();
  },
  methods: {
    /**
     * 用于产生demo用的数据
     * @method getData
     */
    getData() {
      const list = [];
      for (let i = 0; i < 3; i++) {
        list.push({
          //text: "GGWP"
          //key: Math.random()
        });
      }
      // this.locations = this.locations.concat(list);
      this.queue = this.queue.concat(list);
      //this.locations.map(v => (v.key = Math.random() * 100 - 5));
      this.locations.map(o => {
        o.key = Math.random() * 100 - 5;
        return o;
      });
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
      switch (choice) {
        case "nope": // 左滑
          break;
        case "like":
          alert("Маловато"); // 右滑
          break;
        case "super": // 上滑
          break;
        default:
          alert("Я таких значений не знаю");
      }
      if (this.queue.length < 0) {
        this.getData();
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
    profile1() {
      this.$router.replace("/profile");
    },
    profile() {
      firebase
        .auth()
        .signOut()
        .then(user => {
          this.$router.replace("/profile");
        })
        .catch(err => {
          alert(err.message);
        });
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
  overflow: hidden;
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
  height: 15%;
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
  bottom: 30px;
}
.logout {
  left: 50%;
  top: 100%;
}
.profile {
  left: 50%;
  top: 100%;
}
</style>
