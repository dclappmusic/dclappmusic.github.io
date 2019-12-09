import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import moment from 'moment';

// Vue.use(require('vue-moment'));

Vue.config.productionTip = false;

var firebaseConfig = {
    apiKey: "AIzaSyCcFHmQQSZQMCLlNetLQbW2T4Z7AKH6ztc",
    authDomain: "weclapp-eddbd.firebaseapp.com",
    databaseURL: "https://weclapp-eddbd.firebaseio.com",
    projectId: "weclapp-eddbd",
    storageBucket: "",
    messagingSenderId: "611930943683",
    appId: "1:611930943683:web:c50aff0449c4ad6a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//global variables and setting to global object. To use it: this.$moment()
Vue.prototype.$moment = moment;

Date.prototype.getWeekNumber = function(){
  var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
};



new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
