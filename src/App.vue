<template>
  <v-app>
    <v-app-bar v-if="!authPage" color="#41b883" dark app class="elevation-2">
      <v-btn @click="$router.go(-1)" text icon color="white">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title class="font-weight-bold">SMARTREX</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-avatar
        @click="$router.push({ name: 'view_profile' })"
        size="38"
        color="white"
        class="pa-0 av"
        v-if="current_user"
      >
        <v-img
          :src="user_data.img"
          class="cover-fill bg-cover"
          :alt="user_data.name"
        />
      </v-avatar>
    </v-app-bar>
    <v-bottom-navigation
      v-if="!authPage"
      v-model="bottomNav"
      shift
      app
      grow
      class="pt-0"
      color="#41b883"
    >
      <v-btn :to="{ name: 'nearby_doctors' }" class="pt-1">
        <span>DOCTORS</span>
        <v-icon large>mdi-doctor</v-icon>
      </v-btn>
      <v-btn :to="{ name: 'diagnose' }" class="pt-1">
        <span>DIAGNOSE</span>
        <v-icon large>mdi-stethoscope</v-icon>
      </v-btn>
      <v-btn :to="{ name: 'nearby_hospitals' }" class="pt-1">
        <span>HOSPITALS</span>
        <v-icon large>mdi-hospital-building</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-overlay :value="this.$store.state.loader" z-index="99999">
      <v-progress-circular
        width="15"
        size="120"
        indeterminate
        color="#41b883"
      ></v-progress-circular>
    </v-overlay>
    <v-main class="white">
      <v-alert
        dense
        dismissible
        class="mb-0 rounded-0"
        v-model="$store.state.notification.show"
        :type="`${$store.state.notification.status}`"
      >
        {{ $store.state.notification.message }}
      </v-alert>
      <router-view class="white"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import Axios from "axios";
export default {
  name: "App",
  data() {
    return {
      bottomNav: 3,
      splash: true,
    };
  },
  created(){
    this.test_server()
  },
  computed: {
    ...mapState(["user_data", "current_user"]),
    authPage() {
      return this.$route.path == "/auth" || this.$route.path == "/register";
    },
  },
  methods: {
    test_server() {
      Axios.get(
        `https://smartrex-server.herokuapp.com/api/v1/test`
      ).then(() => {});
    },
  },
};
</script>
<style scoped>
.av {
  border: 2px solid white;
}
</style>
