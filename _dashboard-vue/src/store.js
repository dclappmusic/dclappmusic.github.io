import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        shows: [],
        bands: [],
        venues: [],
        user: null,
        geolocation: {},
        city: null
    },
    getters: {
    },
    mutations: {
        updateUser(state, user) {
            state.user = user;
        },
        updateShows(state, shows) {
        //before store it, sort them by time
            if (shows) shows.sort((a,b) => a.timestamp - b.timestamp);
            state.shows = shows;
        },
        updateBands(state, bands) {
            if (bands) bands.sort((a, b) => b.id - a.id);
            state.bands = bands;
        },
        updateVenues(state, venues) {
            if (venues) venues.sort((a, b) => b.id - a.id);
            state.venues = venues;
        },
        updateGeolocation(state, geolocation) {
            state.geolocation = geolocation;
        },
        updateCity(state, city) {
            state.city = city;
        }
    },
    actions: {

    }
})