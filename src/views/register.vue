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
        class="pa-0 text-center"
      >
        <v-slide-x-transition class="pa-0" hide-on-leave>
          <v-card class="elevation-0" v-show="step == 1">
            <v-avatar size="100" color="#41b883" class="mb-10 elevation-1">
              <v-icon size="70" color="white">mdi-star</v-icon>
            </v-avatar>
            <v-container grid-list-xs>
              <v-row no-gutters class="justify-space-around">
                <v-col cols="12" class="py-1 px-0 text-center">
                  <v-switch
                    v-model="account_type"
                    value="user"
                    class="my-0"
                    color="#41b883"
                    inset
                    label="Am a Regular User"
                  ></v-switch>
                  <v-switch
                    v-model="account_type"
                    value="doctor"
                    class="my-0"
                    color="#41b883"
                    inset
                    label="Am a Doctor"
                  ></v-switch>
                  <v-switch
                    v-model="account_type"
                    value="hospital"
                    class="my-0"
                    color="#41b883"
                    inset
                    label="Am Registering my Hospital"
                  ></v-switch>
                  <v-btn
                    :disabled="!account_type"
                    color="#41b883"
                    class="white my-0"
                    @click="step = 2"
                    text
                  >
                    Next<v-icon large>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-btn
                to="auth"
                block
                text
                color="#41b883"
                class="white mx-1 mt-5"
                >LOGIN INSTEAD</v-btn
              >
            </v-container>
          </v-card>
        </v-slide-x-transition>
        <v-slide-x-transition class="pa-0" hide-on-leave>
          <v-card class="elevation-0" v-show="step == 2">
            <v-avatar size="100" color="#41b883" class="mb-10 elevation-1">
              <v-icon size="70" color="white">{{
                account_type == "hospital"
                  ? "mdi-hospital-building"
                  : "mdi-account"
              }}</v-icon>
            </v-avatar>
            <v-container grid-list-xs>
              <v-row no-gutters class="justify-space-around">
                <v-col cols="12" class="py-1 px-0 text-center">
                  <v-text-field
                    v-model.trim="name"
                    outlined
                    hide-details
                    :label="
                      account_type == 'hospital' ? 'Hospital Name' : 'Full Name'
                    "
                    color="#41b883"
                    class="pa-0 mb-2"
                    prepend-icon="mdi-account"
                  ></v-text-field>
                  <v-select
                    v-model.trim="gender"
                    v-if="account_type != 'hospital'"
                    prepend-icon="mdi-gender-male-female"
                    outlined
                    hide-details
                    class="pa-0 mb-2"
                    :items="gender_items"
                    label="Gender"
                    color="#41b883"
                  ></v-select>
                  <v-select
                    v-model.trim="specialty"
                    v-if="account_type != 'user'"
                    outlined
                    hide-details
                    class="pa-0 mb-2"
                    :items="specialty_list"
                    label="Specialty"
                    color="#41b883"
                    prepend-icon="mdi-marker-check"
                  ></v-select>
                  <v-select
                    v-model.trim="age"
                    v-if="account_type != 'hospital'"
                    prepend-icon="mdi-timer"
                    outlined
                    hide-details
                    class="pa-0 mb-2"
                    :items="
                      account_type == 'user' ? user_age_range : doc_age_range
                    "
                    label="Age"
                    color="#41b883"
                  ></v-select>
                  <v-select
                    v-if="account_type != 'user'"
                    v-model.trim="op_years"
                    prepend-icon="mdi-timer"
                    outlined
                    hide-details
                    class="pa-0 mb-2"
                    :items="
                      account_type == 'doctor'
                        ? doc_op_years_range
                        : op_years_range
                    "
                    :label="
                      account_type == 'doctor'
                        ? 'Years of Experience'
                        : 'Years of Operation'
                    "
                    color="#41b883"
                  ></v-select>
                  <v-btn color="#41b883" class="white" @click="step = 1" text>
                    <v-icon large>mdi-chevron-left</v-icon>BACK
                  </v-btn>
                  <v-btn color="#41b883" class="white" @click="step = 3" text>
                    NEXT<v-icon large>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-slide-x-transition>
        <v-slide-x-transition class="pa-0" hide-on-leave>
          <v-card class="elevation-0" v-show="step == 3">
            <v-avatar size="100" color="#41b883" class="mb-10 elevation-1">
              <v-icon size="70" color="white">{{
                account_type == "hospital"
                  ? "mdi-hospital-marker"
                  : "mdi-map-marker"
              }}</v-icon>
            </v-avatar>
            <v-container grid-list-xs>
              <v-row no-gutters class="justify-space-around">
                <v-col cols="12" class="py-1 px-0 text-center">
                  <image-input
                    v-model="avatar"
                    class="d-flex mb-3 justify-center"
                  >
                    <div slot="activator">
                      <v-avatar
                        size="150px"
                        v-ripple
                        v-if="!avatar"
                        class="elevation-2 mb-3"
                        color="#41b883"
                        tile
                      >
                        <img
                          v-if="avatar != ('' || null)"
                          :src="avatar"
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
                  <v-select
                    v-model.trim="state"
                    outlined
                    hide-details
                    :items="states_lga"
                    name="user_gender"
                    item-value="state.name"
                    item-text="state.name"
                    label="State"
                    class="pa-0 mb-2"
                    prepend-icon="mdi-map-marker-radius"
                  ></v-select>
                  <v-select
                    v-model.trim="city"
                    outlined
                    class="pa-0 mb-2"
                    hide-details
                    :items="cities"
                    item-value="name"
                    item-text="name"
                    name="user_gender"
                    label="City"
                    prepend-icon="mdi-map-marker-radius"
                  ></v-select>
                  <v-text-field
                    v-if="account_type == 'hospital'"
                    v-model.trim="address"
                    outlined
                    class="pa-0 mb-2"
                    hide-details
                    label="Address"
                    color="#41b883"
                    prepend-icon="mdi-home-map-marker"
                  ></v-text-field>
                  <v-btn color="#41b883" class="white" @click="step = 2" text>
                    <v-icon large>mdi-chevron-left</v-icon> BACK
                  </v-btn>
                  <v-btn color="#41b883" class="white" @click="step = 4" text>
                    NEXT <v-icon large>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-slide-x-transition>
        <v-slide-x-transition class="pa-0" hide-on-leave>
          <v-card class="elevation-0" v-show="step == 4">
            <v-avatar size="100" color="#41b883" class="mb-10 elevation-1">
              <v-icon size="70" class="white--text" dark>mdi-lock</v-icon>
            </v-avatar>
            <v-container grid-list-xs>
              <v-row no-gutters class="justify-space-around">
                <v-col cols="12" class="py-1 px-0 text-center">
                  <v-slide-x-transition class="pa-0" hide-on-leave>
                    <v-text-field
                      v-model.trim="mobile_1"
                      outlined
                      hide-details
                      type="number"
                      v-if="account_type != null"
                      :label="
                        account_type == 'hospital'
                          ? 'Hospital Mobile No 1'
                          : 'Mobile No 1'
                      "
                      color="#41b883"
                      class="pa-0 mb-2"
                    ></v-text-field>
                  </v-slide-x-transition>
                  <v-slide-x-transition class="pa-0" hide-on-leave>
                    <v-text-field
                      v-if="account_type != null && account_type != 'user'"
                      v-model.trim="mobile_2"
                      outlined
                      hide-details
                      type="number"
                      :label="
                        account_type == 'hospital'
                          ? 'Hospital Mobile No 2'
                          : 'Mobile No 2'
                      "
                      color="#41b883"
                      class="pa-0 mb-2"
                    ></v-text-field>
                  </v-slide-x-transition>
                  <v-text-field
                    v-model.trim="password"
                    outlined
                    hide-details
                    label="Password"
                    type="password"
                    class="pa-0"
                    color="#41b883"
                  ></v-text-field>
                  <v-btn
                    x-large
                    block
                    color="#41b883"
                    class="my-2 elevation-1"
                    :disabled="loading"
                    :loading="loading"
                    @click="register()"
                  >
                    <v-icon large color="white">mdi-account-plus</v-icon>
                    <template v-slot:loader>
                      <span class="custom-loader">
                        <v-icon color="white" large>mdi-loading</v-icon>
                      </span>
                    </template>
                  </v-btn>
                  <v-btn
                    class="white"
                    @click="step = 3"
                    text
                    block
                    color="#41b883"
                  >
                    <v-icon large>mdi-chevron-left</v-icon>BACK
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-slide-x-transition>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";
import Axios from "axios";
import ImageInput from "../components/ImageInput";
import { StatesLgas, Specialties } from "@/config";
export default {
  data() {
    return {
      by: "",
      loading: false,
      rules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!"
      ],
      avatar: null,
      user_age_range: [...Array(80 + 1).keys()].slice(5),
      doc_age_range: [...Array(65 + 1).keys()].slice(20),
      op_years_range: [...Array(50 + 1).keys()].slice(1),
      doc_op_years_range: undefined,
      step: 1,
      op_years: "",
      mobile_1: "",
      mobile_2: "",
      name: "",
      password: "",
      age: 0,
      specialty: "",
      b64: "",
      state: "",
      city: "",
      gender: "",
      address: "",
      cities: [],
      account_type: "",
      form_action: false,
      form_directive: true,
      re_pin: "",
      specialty_list: Specialties,
      gender_items: ["Male", "Female"],
      states_lga: StatesLgas
    };
  },
  components: {
    ImageInput
  },
  watch: {
    state(val) {
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
    },
    age(val) {
      this.doc_op_years_range = [...Array(val - 18 + 1).keys()].slice(1);
      this.op_years = "";
    }
  },
  methods: {
    ...mapActions(["set_notification"]),
    jsonToFormData(data) {
      const formData = new FormData();

      this.buildFormData(formData, data);

      return formData;
    },
    buildFormData(formData, data, parentKey) {
      if (
        data &&
        typeof data === "object" &&
        !(data instanceof Date) &&
        !(data instanceof File)
      ) {
        Object.keys(data).forEach(key => {
          this.buildFormData(
            formData,
            data[key],
            parentKey ? `${parentKey}[${key}]` : key
          );
        });
      } else {
        const value = data == null ? "" : data;

        formData.append(parentKey, value);
      }
    },
    set_b64(val) {
      this.b64 = val;
      return;
    },
    validate_form() {
      const {
        mobile_1,
        mobile_2,
        age,
        specialty,
        gender,
        op_years,
        state,
        city,
        address,
        b64,
        account_type,
        name,
        password
      } = this;
      if (account_type == "user") {
        if (
          !mobile_1 ||
          !name ||
          !gender ||
          !state ||
          !city ||
          !age ||
          !b64 ||
          !password
        ) {
          this.set_notification({
            show: true,
            status: "info",
            message: "One or more empty fields."
          });
          this.step = 1;
          return false;
        } else {
          return {
            mobile_1: mobile_1,
            name: name,
            gender: gender,
            age: age,
            img: b64,
            acct_type: account_type,
            pwd: password,
            state: state,
            city: city
          };
        }
      } else if (account_type == "doctor") {
        if (
          !name ||
          !gender ||
          !age ||
          !b64 ||
          !password ||
          !state ||
          !city ||
          !mobile_1 ||
          !mobile_2 ||
          !specialty ||
          !op_years ||
          !b64
        ) {
          this.set_notification({
            show: true,
            status: "info",
            message: "One or more empty fields."
          });
          this.step = 1;
          return false;
        } else {
          return {
            mobile_1: mobile_1,
            mobile_2: mobile_2,
            name: name,
            gender: gender,
            age: age,
            img: b64,
            acct_type: account_type,
            pwd: password,
            state: state,
            city: city,
            op_years: op_years,
            specialty: specialty
          };
        }
      } else if (account_type == "hospital") {
        if (
          !name ||
          !op_years ||
          !b64 ||
          !password ||
          !state ||
          !city ||
          !mobile_1 ||
          !address ||
          !mobile_2 ||
          !specialty
        ) {
          this.set_notification({
            show: true,
            status: "info",
            message: "One or more empty fields."
          });
          this.step = 1;
          return false;
        } else {
          return {
            mobile_1: mobile_1,
            mobile_2: mobile_2,
            name: name,
            img: b64,
            pwd: password,
            state: state,
            city: city,
            acct_type: account_type,
            op_years: op_years,
            specialty: specialty,
            address: address
          };
        }
      }
    },
    registration_failed(error) {
      this.set_notification({
        show: true,
        status: "error",
        message: error
      });
      this.loading = !this.loading;
    },
    registration_success() {
      this.set_notification({
        show: true,
        status: "info",
        message: "Account Created Successfully, Redirecting you Login"
      });
      this.loading = !this.loading;
      setTimeout(() => {
        this.$router.push("/diagnose");
      }, 2000);
    },
    register() {
      this.loading = true;
      var { account_type } = this;
      const validFormData = this.validate_form();
      if (validFormData === !false) {
        Axios.post(
          `https://smartrex-server.herokuapp.com/api/v1/${account_type}/create`,
          validFormData
        )
          .then(() => {
            this.registration_success();
          })
          .catch(error => {
            console.log(error);
            this.registration_failed(error.response.data.message);
          });
      }
    }
  }
};
</script>
