<template>
  <v-container fluid grid-list-xs class="pa-0 white">
    <v-row no-gutters class="d-flex justify-center mb-5">
      <v-col cols="12" xl="3" lg="4" md="5" sm="6" class="pa-0">
        <v-card class="mx-auto elevation-0" light style="border-radius:0;">
          <v-form>
            <v-container grid-list-xs>
              <image-input v-model="avatar" class="d-flex mb-2 justify-center">
                <div slot="activator">
                  <v-avatar
                    size="150px"
                    v-ripple
                    v-if="!avatar"
                    class="elevation-2 mb-3"
                    color="#41b883"
                    tile
                  >
                    <v-img
                      v-if="update_user_data.img != ('' || null)"
                      :src="update_user_data.img"
                      alt="avatar"
                      class="elevation-2"
                    />
                    <v-icon v-else color="white" size="100"
                      >mdi-camera-plus</v-icon
                    >
                  </v-avatar>
                  <v-avatar size="150" tile v-ripple v-else class="mb-3">
                    <img :src="avatar.imageURL" alt="avatar" />
                  </v-avatar>
                </div>
              </image-input>
              <v-row no-gutters>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-if="update_user_data.name != null"
                    :disabled="form_status == 'VIEW'"
                    v-model.trim="update_user_data.name"
                    name="user_name"
                    label="Name"
                    type="text"
                    :outlined="form_status == 'EDIT'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-if="update_user_data.mobile_2 != null"
                    :disabled="form_status == 'VIEW'"
                    v-model.trim="update_user_data.mobile_2"
                    name="mobile_2"
                    label="Mobile 2"
                    type="text"
                    :outlined="form_status == 'EDIT'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-select
                    v-if="update_user_data.gender != null"
                    :disabled="form_status == 'VIEW'"
                    v-model.trim="update_user_data.gender"
                    :items="gender_items"
                    name="gender"
                    label="Gender"
                    :outlined="form_status == 'EDIT'"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-select
                    v-if="update_user_data.specialty != null"
                    :disabled="form_status == 'VIEW'"
                    v-model.trim="update_user_data.specialty"
                    name="specialty"
                    label="Specialty"
                    :items="specialty_list"
                    type="text"
                    :outlined="form_status == 'EDIT'"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-select
                    v-if="update_user_data.state != null"
                    :disabled="form_status == 'VIEW'"
                    v-model.trim="update_user_data.state"
                    :items="states_lga"
                    item-text="state.name"
                    item-value="state.name"
                    name="state"
                    label="State"
                    :outlined="form_status == 'EDIT'"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-select
                    v-if="update_user_data.city != null"
                    :disabled="form_status == 'VIEW'"
                    v-model.trim="update_user_data.city"
                    :items="cities"
                    item-value="name"
                    item-text="name"
                    name="city"
                    label="City"
                    :outlined="form_status == 'EDIT'"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-if="update_user_data.address != null"
                    v-model.trim="update_user_data.address"
                    :disabled="form_status == 'VIEW'"
                    name="address"
                    label="Address"
                    type="text"
                    :outlined="form_status == 'EDIT'"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <v-card-actions>
            <v-btn
              v-show="form_status === 'VIEW'"
              text
              color="red"
              @click="log_out()"
            >
              <v-icon right dark>mdi-lock</v-icon>
              Logout
            </v-btn>
            <v-btn
              v-show="form_status === 'EDIT'"
              text
              color="dark-grey"
              @click="form_status = 'VIEW'"
            >
              <v-icon right dark>mdi-chevron-left</v-icon>Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              v-show="form_status === 'VIEW'"
              color="orange"
              text
              class="white--text"
              @click="form_status = 'EDIT'"
            >
              <v-icon right dark>mdi-brush</v-icon>Edit
            </v-btn>
            <v-btn
              v-show="form_status === 'EDIT'"
              color="green"
              text
              @click="update()"
              class="white--text"
            >
              Update
              <v-icon right dark>mdi-check-circle</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
import ImageInput from "@/components/ImageInput";
import { StatesLgas, Specialties } from "@/config";
import Axios from "axios";
export default {
  data() {
    return {
      avatar: null,
      form_status: "VIEW",
      specialty_list: Specialties,
      gender_items: ["Male", "Female"],
      update_user_data: {
        _id: null,
        name: null,
        mobile_2: null,
        state: null,
        gender: null,
        city: null,
        address: null,
        specialty: null,
        img: null
      },
      b64: null,
      states_lga: StatesLgas,
      cities: []
    };
  },
  watch: {
    "update_user_data.state"(val) {
      for (let opt of this.states_lga) {
        if (opt.state.name == val) {
          this.cities = [...opt.state.locals];
        }
      }
    },
    avatar(val) {
      fetch(val.imageURL)
        .then(res => res.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            this.set_b64(reader.result);
          };
        });
    }
  },
  components: {
    ImageInput
  },
  created() {
    this.load_data();
  },
  methods: {
    ...mapActions(["log_out"]),
    load_data() {
      this.$store.dispatch("fetch_user_data");
      this.update_user_data = this.user_data;
      this.b64 = this.update_user_data.img;
      return;
    },
    update() {
      this.$store.state.loader = true;
      var { update_user_data, b64 } = this;
      if (this.user_data.acct_type == "user") {
        if (
          (update_user_data._id ||
            update_user_data.name ||
            update_user_data.gender ||
            update_user_data.state ||
            update_user_data.city) != ("" || null)
        ) {
          var update_user = {
            _id: update_user_data._id,
            name: update_user_data.name,
            gender: update_user_data.gender,
            img: b64,
            state: update_user_data.state,
            city: update_user_data.city
          };
          Axios.post(
            "https://smartrex-server.herokuapp.com/api/v1/user/update",
            update_user
          )
            .then(res => {
              console.log(res);
              this.$store.state.notification.status = "success";
              this.$store.state.notification.message =
                "Account Updated Successfully";
              this.$store.state.loader = false;
              this.$store.state.notification.show = true;
              this.load_data();
              this.form_status = "VIEW";
            })
            .catch(error => {
              console.log(error);
              this.$store.state.notification.status = "error";
              this.$store.state.notification.message =
                error.response.data.message;
              this.$store.state.loader = false;
              this.$store.state.notification.show = true;
            });
        } else {
          console.error("empty user field");
        }
      } else if (this.user_data.acct_type == "doctor") {
        if (
          (update_user_data._id ||
            update_user_data.name ||
            update_user_data.gender ||
            update_user_data.state ||
            update_user_data.city ||
            update_user_data.mobile_2 ||
            update_user_data.specialty) != ("" || null)
        ) {
          var update_doctor = {
            _id: update_user_data._id,
            mobile_2: update_user_data.mobile_2,
            name: update_user_data.name,
            gender: update_user_data.gender,
            img: b64,
            state: update_user_data.state,
            city: update_user_data.city,
            specialty: update_user_data.specialty
          };
          Axios.post(
            "https://smartrex-server.herokuapp.com/api/v1/user/update",
            update_doctor
          )
            .then(res => {
              console.log(res.data);
              this.$store.state.notification.status = "success";
              this.$store.state.notification.message =
                "Account Updated Successfully";
              this.$store.state.loader = false;
              this.$store.state.notification.show = true;
              this.load_data();
              this.form_status = "VIEW";
            })
            .catch(error => {
              console.log(error.response);
              this.$store.state.notification.status = "error";
              this.$store.state.notification.message =
                error.response.data.message;
              this.$store.state.loader = false;
              this.$store.state.notification.show = true;
            });
        } else {
          console.error("empty doctor field");
        }
      } else if (this.user_data.acct_type == "hospital") {
        if (
          (update_user_data._id ||
            update_user_data.name ||
            update_user_data.state ||
            update_user_data.city ||
            update_user_data.address ||
            update_user_data.mobile_2 ||
            update_user_data.specialty) != ("" || null)
        ) {
          var update_hospital = {
            _id: update_user_data._id,
            mobile_2: update_user_data.mobile_2,
            name: update_user_data.name,
            img: b64,
            state: update_user_data.state,
            city: update_user_data.city,
            specialty: update_user_data.specialty,
            address: update_user_data.address
          };
          Axios.post(
            "https://smartrex-server.herokuapp.com/api/v1/user/update",
            update_hospital
          )
            .then(res => {
              console.log(res);
              this.$store.state.notification.status = "success";
              this.$store.state.notification.message =
                "Account Updated Successfully";
              this.form_status = "VIEW";
              this.$store.state.loader = false;
              this.$store.state.notification.show = true;
              this.load_data();
            })
            .catch(error => {
              console.log(error);
              this.$store.state.notification.status = "error";
              this.$store.state.notification.message =
                error.response.data.message;
              this.$store.state.loader = false;
              this.$store.state.notification.show = true;
            });
        } else {
          console.error("empty hospital field");
        }
      }
    },
    set_b64(val) {
      this.b64 = val;
      return;
    }
  },
  computed: {
    ...mapState(["current_user", "user_data"])
  }
};
</script>
