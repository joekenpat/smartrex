<template>
  <v-container fluid grid-list-xs class="pa-0 white">
    <v-row no-gutters class="d-flex justify-center">
      <v-col cols="12" xl="3" lg="4" md="5" sm="6" class="pa-0">
        <v-list two-line>
          <v-list-item-group v-model="selected" class="green--text">
            <v-slide-x-transition class="py-0" group>
              <template v-for="(item, index) in nearby_doctors">
                <v-list-item
                  :to="{
                    name: 'doctor_details',
                    params: { doctor_id: item._id.toString() }
                  }"
                  class="py-0 px-1"
                  :key="'doctor_' + index"
                >
                  <v-list-item-avatar
                    class="my-0 mr-3"
                    size="58"
                    rounded
                    color="#41b883"
                  >
                    <v-img
                      :src="item.img"
                      class="cover-fill bg-cover"
                      :alt="item.name"
                    />
                  </v-list-item-avatar>
                  <v-list-item-content class="py-0">
                    <v-list-item-title
                      class="font-weight-bold"
                      v-text="item.name"
                    ></v-list-item-title>
                    <v-list-item-subtitle class="">
                      {{
                        `${item.specialty} - ${item.op_years} Years Experience`
                      }}</v-list-item-subtitle
                    >
                    <v-list-item-subtitle class="caption">{{
                      item.state + ", " + item.city
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider
                  v-if="index + 1 < nearby_doctors.length"
                  :key="index"
                  inset
                ></v-divider>
              </template>
            </v-slide-x-transition>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      selected: ""
    };
  },
  computed: {
    ...mapState(["nearby_doctors"])
  },
  created() {
    this.find_doctors();
    return;
  },
  methods: {
    find_doctors() {
      this.$store.dispatch("fetch_nearby_doctors");
      return;
    }
  }
};
</script>
