import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import Axios from "axios";

Vue.use(Vuex);

const vuexLocal = new VuexPersist({
  key: "smartrexLocalStore",
  storage: window.localStorage,
  reducer: state => ({
    current_user: state.current_user,
    user_data: state.user_data
  })
});

export const store = new Vuex.Store({
  state: {
    current_user: null,
    user_data: {},
    nearby_doctors: {},
    nearby_hospitals: {},
    loader: false,
    notification: {
      show: false,
      status: "",
      message: ""
    }
  },
  mutations: {
    set_current_user(state, val) {
      state.current_user = val;
    },
    set_user_data(state, val) {
      state.user_data = val;
    },
    set_nearby_doctors(state, val) {
      state.nearby_doctors = val;
    },
    set_nearby_hospitals(state, val) {
      state.nearby_hospitals = val;
    }
  },
  actions: {
    log_out({ commit }) {
      commit("set_current_user", null);
      commit("set_user_data", {});
      commit("set_nearby_doctors", {});
      commit("set_nearby_hospitals", {});
    },
    fetch_user_data({ commit, state }) {
      Axios.get("https://smartrex-server.herokuapp.com/api/v1/user/find", {
        params: {
          user_id: state.current_user
        }
      })
        .then(res => {
          commit("set_user_data", res.data);
        })
        .catch(error => {
          console.error("error getting user Data");
          console.error(error);
          commit("set_user_data", {});
        });
    },
    fetch_nearby_doctors({ commit, state }) {
      Axios.get("https://smartrex-server.herokuapp.com/api/v1/user/find", {
        params: {
          user_type: "doctor",
          user_city: state.user_data.city
        }
      })
        .then(res => {
          commit("set_nearby_doctors", res.data);
        })
        .catch(error => {
          console.error("error nearby doctors");
          console.error(error);
          commit("set_nearby_doctors", {});
        });
    },
    fetch_nearby_hospitals({ commit, state }) {
      Axios.get("https://smartrex-server.herokuapp.com/api/v1/user/find", {
        params: {
          user_type: "hospital",
          user_city: state.user_data.city
        }
      })
        .then(res => {
          commit("set_nearby_hospitals", res.data);
        })
        .catch(error => {
          console.error("error nearby hospitals");
          console.error(error);
          commit("set_nearby_hospitals", {});
        });
    }
  },
  modules: {},
  plugins: [vuexLocal.plugin]
});
