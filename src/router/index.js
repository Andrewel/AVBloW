import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";

import Comics from "../components/Comics";
import Login from "../components/Login";
import SignUp2 from "../components/SignUp2";
import NotFound from "../components/NotFound";
import Profile from "../components/Profile";
import Likes from "../components/Likes";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/signup",
      name: "SignUp",
      component: SignUp2
    },
    {
      path: "/comics",
      name: "Comics",
      component: Comics,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "*",
      name: "NotFound",
      component: NotFound
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/likes",
      name: "Likes",
      component: Likes,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next("login");
  else if (!requiresAuth && currentUser) next("comics");
  else if (!requiresAuth && currentUser) next("profile");
  else if (!requiresAuth && currentUser) next("likes");
  else next();
});

export default router;
