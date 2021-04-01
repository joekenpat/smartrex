<template>
  <v-container fluid grid-list-xs class="pa-0 white">
    <v-row no-gutters class="d-flex justify-center">
      <v-col cols="12" xl="3" lg="4" md="5" sm="6" class="pa-0">
        <v-card class="mx-auto">
          <v-img :src="details.img" height="360" dark>
            <v-row class="fill-height">
              <v-card-title class="black--text mx-auto px-auto mt-auto">
                <div
                  class="display-1 font-weight-bold px-2 py-0 white bg-1 mt-12"
                  style="border-radius:10px; opacity:0.65;"
                >
                  {{ details.name }}
                </div>
              </v-card-title>
            </v-row>
          </v-img>

          <v-list two-line>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="#41b883">mdi-phone</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ details.mobile_1 }}</v-list-item-title>
                <v-list-item-subtitle>Mobile</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-action></v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ details.mobile_2 }} </v-list-item-title>
                <v-list-item-subtitle>Work</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="#41b883">mdi-marker-check</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ details.specialty }}</v-list-item-title>
                <v-list-item-subtitle>Specialty</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-action></v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ details.op_years }}</v-list-item-title>
                <v-list-item-subtitle
                  >Years of
                  {{
                    details.acct_type == "doctor" ? "Experience" : "Operation"
                  }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="#41b883">mdi-map-marker</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ details.address }}</v-list-item-title>
                <v-list-item-title
                  >{{ details.state }}, {{ details.city }}</v-list-item-title
                >
                <v-list-item-subtitle>Location</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      windowHeight: `${window.innerWidth}px`,
    };
  },
  computed: {
    ...mapGetters({ getDoctorDetail: "getDoctorDetailById" }),
    details() {
      return this.getDoctorDetail(this.doctor_id);
    },
  },
  props: {
    doctor_id: {
      type: String,
      required: true,
    },
  },
};
</script>
