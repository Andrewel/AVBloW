import Vue from "vue";
import firebase from "firebase";
//import firebase from "firebase/app";
import "firebase/firestore";
import VueFire from "vuefire";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCM7BS4mal3CCAHI6iS4wWjbXT4ZzcxyHI",
  authDomain: "aiproject-1541859847085.firebaseapp.com",
  databaseURL: "https://aiproject-1541859847085.firebaseio.com",
  projectId: "aiproject-1541859847085",
  storageBucket: "aiproject-1541859847085.appspot.com",
  messagingSenderId: "463964342483"
};

export const app = firebase.initializeApp(config);
export const usersCollection = firebase.firestore().collection("users");
export const messagesCollection = firebase.firestore().collection("messages");
export const typingStatus = firebase.firestore().collection("typing-status");
export const likesCollection = firebase.firestore().collection("likes");
