<template>
  <v-container fluid grid-list-xs class="pa-0">
    <v-row no-gutters class="justify-space-around">
      <v-col align-self="center" class="py-1 px-0 text-center">
        <v-card class="elevation-0">
          <v-stepper class="elevation-0" v-model="e1">
            <v-stepper-items class="px-0">
              <v-stepper-content step="1">
                <v-avatar size="100" color="#41b883" class="mb-10 elevation-1">
                  <v-icon size="70" color="white">mdi-phone</v-icon>
                </v-avatar>
                <v-container grid-list-xs>
                  <v-row no-gutters class="justify-space-around">
                    <v-col
                      cols="12"
                      xl="3"
                      lg="4"
                      md="5"
                      sm="6"
                      class="py-1 px-0 text-center mr-1"
                    >
                      <v-text-field
                        v-model.trim="mobile_1"
                        outlined
                        type="number"
                        label="mobile"
                        hide-details
                        class="pa-0 mb-5"
                        color="#41b883"
                      ></v-text-field>
                      <v-btn
                        color="#41b883"
                        class="white mb-12"
                        @click="e1 = 2"
                        icon
                        fab
                      >
                        <v-icon large>mdi-chevron-right</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-btn
                    to="register"
                    block
                    text
                    color="#41b883"
                    class="white mx-1 mt-12"
                    >REGISTER INSTEAD</v-btn
                  >
                </v-container>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-avatar size="100" color="#41b883" class="mb-10 elevation-1">
                  <v-icon size="70" class="white--text" dark>mdi-lock</v-icon>
                </v-avatar>
                <v-container grid-list-xs class="">
                  <v-row no-gutters class="d-flex">
                    <v-col
                      cols="12"
                      xl="3"
                      lg="4"
                      md="5"
                      sm="6"
                      class="py-1 px-0 text-center mx-auto"
                    >
                      <v-text-field
                        v-model.trim="password"
                        outlined
                        label="password"
                        type="password"
                        hide-details
                        class="pa-0"
                        id="id"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <v-spacer></v-spacer>
                <v-btn
                  @click="login()"
                  color="#41b883"
                  class="white mx-1 mb-12"
                  icon
                  fab
                >
                  <v-icon large>mdi-key</v-icon>
                </v-btn>
                <v-btn
                  block
                  color="#41b883"
                  class="white mt-12"
                  @click="e1 = 1"
                  text
                >
                  <v-icon large>mdi-chevron-left</v-icon>
                </v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Axios from "axios";
export default {
  data() {
    return {
      by: "",
      e1: 1,
      snackbar: false,
      form_action: false,
      form_directive: true,
      mobile_1: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.$store.state.loader = true;
      if ((this.mobile_1 || this.password) == "") {
        this.$store.state.notification.status = "error";
        this.$store.state.notification.message = "One or more empty fields.";
        this.$store.state.notification.show = true;
      } else {
        var auth_data = {
          mobile_1: this.mobile_1,
          pwd: this.password
        };
        Axios.post(
          "https://smartrex-server.herokuapp.com/api/v1/user/auth",
          auth_data
        )
          .then(res => {
            console.log(res.data);
            this.$store.commit("set_current_user", res.data._id);
            this.$store.commit("set_user_data", res.data);
            this.$store.dispatch("fetch_nearby_doctors");
            this.$store.dispatch("fetch_nearby_hospitals");
            this.$store.state.notification.status = "success";
            this.$store.state.notification.message = "Login Successful";
            this.$store.state.notification.show = true;
            this.$router.push("/diagnose");
          })
          .catch(error => {
            console.log(error);
            this.$store.state.notification.status = error.status;
            this.$store.state.notification.message =
              error.response.data.message;
            this.$store.state.notification.show = true;
          });
      }
      this.$store.state.loader = false;
    }
  }
};
</script>
