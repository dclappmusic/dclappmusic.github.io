// Initialize Firebase
var config = {
  apiKey: "AIzaSyB-XrsVnfHLPLNU5lNXo2-3x_IjV94Iph8",
  authDomain: "dclapp-49969.firebaseapp.com",
  databaseURL: "https://dclapp-49969.firebaseio.com",
  projectId: "dclapp-49969",
  storageBucket: "dclapp-49969.appspot.com",
  messagingSenderId: "346881274485"
};
firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);