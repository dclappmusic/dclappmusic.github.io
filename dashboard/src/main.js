import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import firebase from 'firebase'

Vue.config.productionTip = false

var firebaseConfig = {
    apiKey: "AIzaSyCcFHmQQSZQMCLlNetLQbW2T4Z7AKH6ztc",
    authDomain: "weclapp-eddbd.firebaseapp.com",
    databaseURL: "https://weclapp-eddbd.firebaseio.com",
    projectId: "weclapp-eddbd",
    storageBucket: "",
    messagingSenderId: "611930943683",
    appId: "1:611930943683:web:c50aff0449c4ad6a"
};
firebase.initializeApp(firebaseConfig);

new Vue({
  render: h => h(App),
}).$mount('#app')
