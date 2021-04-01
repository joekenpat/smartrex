import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import Axios from "axios";
import router from "../router";

Vue.use(Vuex);

const vuexLocal = new VuexPersist({
  key: "smartrexLocalStore",
  storage: window.localStorage,
  reducer: (state) => ({
    current_user: state.current_user,
    user_data: state.user_data,
    nearby_doctors: state.nearby_doctors,
    nearby_hospitals: state.nearby_hospitals,
  }),
});

export const store = new Vuex.Store({
  state: {
    current_user: null,
    user_data: {},
    nearby_doctors: [],
    nearby_hospitals: [],
    loader: false,
    notification: {
      show: false,
      status: "info",
      message: "",
    },
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
    },
    set_notification(state, val) {
      state.notification = { ...val };
    },
  },
  getters: {
    getDoctorDetailById: (state) => (doctor_id) => {
      return Array.from(state.nearby_doctors).find(
        (doctor) => doctor._id.toString() == doctor_id
      );
    },
  },
  actions: {
    set_notification({ commit }, val) {
      commit("set_notification", val);
      setTimeout(() => {
        commit("set_notification", { show: false, status: "info", message: "" });
      }, 5000);
    },
    log_out({ commit }) {
      commit("set_current_user", null);
      commit("set_user_data", {});
      commit("set_nearby_doctors", {});
      commit("set_nearby_hospitals", {});
      commit("set_notification", { show: false, status: "", message: "" });
      router.push({ name: "auth" });
    },
    fetch_user_data({ commit, state }) {
      Axios.get("https://smartrex-server.herokuapp.com/api/v1/user/find", {
        params: {
          user_id: state.current_user,
        },
      })
        .then((res) => {
          commit("set_user_data", res.data);
        })
        .catch((error) => {
          console.error("error getting user Data");
          console.error(error);
          commit("set_user_data", {});
        });
    },
    fetch_nearby_doctors({ commit, state }) {
      Axios.get("https://smartrex-server.herokuapp.com/api/v1/user/find", {
        params: {
          user_type: "doctor",
          user_city: state.user_data.city,
        },
      })
        .then((res) => {
          commit("set_nearby_doctors", res.data);
        })
        .catch((error) => {
          console.error("error nearby doctors");
          console.error(error);
          commit("set_nearby_doctors", {});
        });
    },
    fetch_nearby_hospitals({ commit, state }) {
      Axios.get("https://smartrex-server.herokuapp.com/api/v1/user/find", {
        params: {
          user_type: "hospital",
          user_city: state.user_data.city,
        },
      })
        .then((res) => {
          commit("set_nearby_hospitals", res.data);
        })
        .catch((error) => {
          console.error("error nearby hospitals");
          console.error(error);
          commit("set_nearby_hospitals", {});
        });
    },
  },
  modules: {},
  plugins: [vuexLocal.plugin],
});
