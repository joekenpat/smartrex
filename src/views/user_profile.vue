<template>
  <v-container fluid grid-list-xs class="pa-0 white">
    <v-row no-gutters class="d-flex justify-center">
      <v-col cols="12" xl="3" lg="4" md="5" sm="6" class="pa-0">
        <v-card class="mx-auto">
          <v-img :src="user_data.img" height="300px" dark>
            <v-row class="fill-height">
              <v-card-title class="black--text mx-auto px-auto mt-auto">
                <div
                  class="display-1 font-weight-bold px-2 py-0 white bg-1 mt-12"
                  style="border-radius:10px; opacity:0.65;"
                >
                  {{ user_data.name }}
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
                <v-list-item-title>{{ user_data.mobile_1 }}</v-list-item-title>
                <v-list-item-subtitle>Mobile</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-action></v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ user_data.mobile_2 }} </v-list-item-title>
                <v-list-item-subtitle>Work</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="#41b883">mdi-marker-check</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ user_data.specialty }}</v-list-item-title>
                <v-list-item-subtitle>Specialty</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-action></v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ user_data.op_years }}</v-list-item-title>
                <v-list-item-subtitle
                  >Years of
                  {{
                    user_data.acct_type == "doctor" ? "Experience" : "Operation"
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
                <v-list-item-title>{{ user_data.address }}</v-list-item-title>
                <v-list-item-title
                  >{{ user_data.state }},
                  {{ user_data.city }}</v-list-item-title
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
export default {
  data() {
    return {};
  },
  props: {
    user_data: {
      type: Object
    }
  }
};
</script>
