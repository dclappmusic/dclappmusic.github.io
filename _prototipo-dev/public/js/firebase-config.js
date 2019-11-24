var app_firebase = {};
(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDG0-qVAOkxpGbJaLuctrJE3xTSVR2QDMk",
    authDomain: "dclapp-49969.firebaseapp.com",
    databaseURL: "https://dclapp-49969.firebaseio.com",
    projectId: "dclapp-49969",
    storageBucket: "dclapp-49969.appspot.com",
    messagingSenderId: "346881274485"
  };
  firebase.initializeApp(config);

  app_firebase = firebase;
})();

const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);
