<template>
  <v-container fluid grid-list-xs class="pa-0">
    <v-row no-gutters class="justify-space-around">
      <v-col
        cols="12"
        xl="3"
        lg="4"
        md="5"
        sm="6"
        align-self="center"
        class="py-1 px-0 text-center"
      >
        <v-card class="elevation-0">
          <v-avatar size="100" color="#41b883" class="mb-10 elevation-2">
            <v-icon size="70" color="white">mdi-lock</v-icon>
          </v-avatar>
          <v-container grid-list-xs>
            <v-row no-gutters class="justify-space-around">
              <v-col cols="12" sm="8" class="py-1 px-0 text-center mr-1">
                <v-form autocomplete="off">
                  <v-text-field
                    v-model.trim="mobile_1"
                    outlined
                    type="number"
                    label="Phone"
                    hide-details
                    class="pa-0 mb-1"
                    color="#41b883"
                  ></v-text-field>
                  <v-text-field
                    v-model.trim="password"
                    outlined
                    label="password"
                    type="password"
                    hide-details
                    class="pa-0 mb-1"
                  ></v-text-field>
                </v-form>
                <v-btn
                  x-large
                  block
                  color="#41b883"
                  class="mb-5 elevation-1"
                  :disabled="loading"
                  :loading="loading"
                  @click="login()"
                >
                  <v-icon large color="white">mdi-key</v-icon>
                  <template v-slot:loader>
                    <span class="custom-loader">
                      <v-icon color="white" large>mdi-loading</v-icon>
                    </span>
                  </template>
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapMutations } from "vuex";
import Axios from "axios";
export default {
  data() {
    return {
      loading: false,
      mobile_1: "",
      password: "",
    };
  },
  methods: {
    ...mapActions([
      "set_notification",
      "fetch_nearby_doctors",
      "fetch_nearby_hospitals",
    ]),
    ...mapMutations(["set_current_user", "set_user_data"]),
    login() {
      this.loading = !this.loading;
      if ((this.mobile_1 || this.password) == "") {
        this.set_notification({
          show: true,
          status: "info",
          message: "One or more empty fields.",
        });
      } else {
        // let auth_data = new FormData();
        // auth_data.append("mobile_1", this.mobile_1);
        // auth_data.append("pwd", this.password);
        let auth_data ={
          mobile_1: this.mobile_1,
          pwd: this.password
        }

        Axios.post(
          "https://smartrex-server.herokuapp.com/api/v1/user/auth",
          auth_data
        )
          .then((res) => {
            this.set_current_user(res.data._id);
            this.set_user_data(res.data);
            this.fetch_nearby_doctors();
            this.fetch_nearby_hospitals();
            this.set_notification({
              show: true,
              status: "success",
              message: "Login Successful, Redirecting in 2secs",
            });
            this.loading = !this.loading;
            setTimeout(() => {
              this.$router.push("/diagnose");
            }, 2000);
          })
          .catch((error) => {
            console.log(error);
            this.set_notification({
              show: true,
              status: "error",
              message: error.response.data.message,
            });
            this.loading = !this.loading;
          });
      }
    },
  },
};
</script>
<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
