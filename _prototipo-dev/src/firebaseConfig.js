import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCcFHmQQSZQMCLlNetLQbW2T4Z7AKH6ztc",
    authDomain: "weclapp-eddbd.firebaseapp.com",
    databaseURL: "https://weclapp-eddbd.firebaseio.com",
    projectId: "weclapp-eddbd",
    storageBucket: "weclapp-eddbd.appspot.com",
    messagingSenderId: "611930943683",
    appId: "1:611930943683:web:c50aff0449c4ad6a"
};

firebase.initializeApp(firebaseConfig);

// const db = firebase.database();
const db = firebase.firestore();

export {db};




