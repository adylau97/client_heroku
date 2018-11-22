import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD14synFX4iAmDosT6mWUrbRMhf7NfNzLk",
    authDomain: "wave-website-45b09.firebaseapp.com",
    databaseURL: "https://wave-website-45b09.firebaseio.com",
    projectId: "wave-website-45b09",
    storageBucket: "wave-website-45b09.appspot.com",
    messagingSenderId: "1047751138696"
  };

const fire = firebase.initializeApp(config);
export default fire;
