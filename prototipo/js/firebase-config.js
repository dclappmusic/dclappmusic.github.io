var app_firebase = {};
(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB-XrsVnfHLPLNU5lNXo2-3x_IjV94Iph8",
    authDomain: "dclapp-49969.firebaseapp.com",
    databaseURL: "https://dclapp-49969.firebaseio.com",
    projectId: "dclapp-49969",
    storageBucket: "dclapp-49969.appspot.com",
    messagingSenderId: "346881274485",
    appId: "1:346881274485:web:a3434eb0745a3013"
  };
  firebase.initializeApp(config);

  app_firebase = firebase;
})();

const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);