import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import firebase from 'firebase'
import router from './router';
import store from './store';

import moment from 'moment';
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
//General styles
import "@/css/styles.scss"


Vue.use(Vuesax);


Vue.config.productionTip = false;

Vue.prototype.$moment = moment;

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

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
