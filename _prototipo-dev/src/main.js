import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import moment from 'moment';
import Vuex from 'vuex';

Vue.use(Vuex);

Vue.config.productionTip = false;

//global variables and setting to global object. To use it: this.$moment()
Vue.prototype.$moment = moment;


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

Date.prototype.getWeekNumber = function(){
  var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
};



const store = new Vuex.Store({
    state: {
        shows: [],
        bands: [],
        venues: [],
        user: {}
    },
    mutations: {
        updateShows(state, shows) {
            state.shows = shows;
        },
        updateBands(state, bands) {
            state.bands = bands;
        },
        updateVenues(state, venues) {
            state.venues = venues;
        }
    }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');




