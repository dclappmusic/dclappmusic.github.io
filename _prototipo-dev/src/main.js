import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import moment from 'moment';
// import VueI18n from 'vue-i18n'
import Vue2TouchEvents from 'vue2-touch-events'

Vue.config.productionTip = false;

// moment.locale('es');
Vue.prototype.$moment = moment;
// Vue.use(VueI18n);

Vue.use(Vue2TouchEvents);

// var firebaseConfig = {
//     apiKey: "AIzaSyCcFHmQQSZQMCLlNetLQbW2T4Z7AKH6ztc",
//     authDomain: "weclapp-eddbd.firebaseapp.com",
//     databaseURL: "https://weclapp-eddbd.firebaseio.com",
//     projectId: "weclapp-eddbd",
//     storageBucket: "",
//     messagingSenderId: "611930943683",
//     appId: "1:611930943683:web:c50aff0449c4ad6a"
// };
// firebase.initializeApp(firebaseConfig);

//adds get week number to the date method
Date.prototype.getWeekNumber = function(){
  var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');




