<template>
  <v-app>
    <v-app-bar v-if="!authPage" color="#41b883" dark app>
      <v-btn @click="$router.go(-1)" text icon color="white">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title class="font-weight-bold">SMARTREX</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-x class="pa-0" v-if="$store.state.current_user">
        <template v-slot:activator="{ on }">
          <v-btn icon color="white" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list class="pa-0">
          <v-list-item
            v-if="$route.path != '/view_profile'"
            to="/view_profile"
            class="px-1"
          >
            <v-list-item-avatar class="mr-0"
              ><v-icon color="#41b883">mdi-account</v-icon></v-list-item-avatar
            >
            <v-list-item-title color="#41b883">Profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click="log_out()" class="px-1">
            <v-list-item-avatar class="mr-0"
              ><v-icon color="#41b883"
                >mdi-logout-variant</v-icon
              ></v-list-item-avatar
            >
            <v-list-item-title color="#41b883">Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-bottom-navigation
      v-if="!authPage"
      v-model="bottomNav"
      shift
      app
      grow
      dark
      background-color="#41b883"
      class="pt-2 "
      color="white"
    >
      <v-btn to="nearby_doctors">
        <span>Doctors</span>
        <v-icon x-large>mdi-doctor</v-icon>
      </v-btn>
      <v-btn to="diagnose">
        <span>Diagnose</span>
        <v-icon x-large>mdi-medical-bag</v-icon>
      </v-btn>
      <v-btn to="nearby_hospitals">
        <span>Hospitals</span>
        <v-icon x-large>mdi-hospital-marker</v-icon>
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
    <v-snackbar
      v-model="$store.state.notification.show"
      :color="
        $store.state.notification.status == 'success'
          ? 'green accent-4'
          : 'error'
      "
      :timeout="7000"
      top
    >
      <v-icon color="white">mdi-shape-circle-plus</v-icon>
      {{ $store.state.notification.message }}
      <v-btn
        color="white"
        text
        icon
        @click="$store.state.notification.show = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-content class="white">
      <router-view class="white"></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      bottomNav: 3,
      splash: true
    };
  },
  computed: {
    authPage() {
      return this.$route.path == "/auth" || this.$route.path == "/register";
    }
  },
  methods: {
    log_out() {
      this.$store.state.loader = true;
      this.$store.dispatch("log_out");
      this.$store.state.loader = false;
      this.$router.push("/auth");
    }
  }
};
</script>
