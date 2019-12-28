<template>
  <v-container fluid grid-list-xs class="pa-0 white">
    <v-row no-gutters class="d-flex justify-center">
      <v-col cols="12" xl="3" lg="4" md="5" sm="6" class="pa-0">
        <v-list two-line>
          <v-list-item-group v-model="selected" class="green--text">
            <v-slide-x-transition class="py-0" group>
              <template v-for="(item, index) in nearby_hospitals">
                <v-list-item
                  :to="{ name: 'user_profile', params: { user_data: item } }"
                  class="py-0 px-1"
                  :key="item._id"
                >
                  <template v-slot:default="{ active, toggle }">
                    <v-list-item-content class="py-0">
                      <v-list-item-title v-text="item.name"></v-list-item-title>
                      <v-list-item-subtitle
                        class="text--primary"
                        v-text="item.specialty"
                      ></v-list-item-subtitle>
                      <v-list-item-subtitle>{{
                        item.state + ", " + item.city
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-avatar
                      class="my-0 ml-2"
                      size="58"
                      color="#41b883"
                    >
                      <img
                        :src="item.img"
                        class="bg-cover cover-fill"
                        :alt="item.name"
                      />
                    </v-list-item-avatar>
                  </template>
                </v-list-item>

                <v-divider
                  v-if="index + 1 < nearby_hospitals.length"
                  :key="index"
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
    ...mapState(["nearby_hospitals"])
  },
  created() {
    this.find_hospitals();
    return;
  },
  methods: {
    find_hospitals() {
      this.$store.dispatch("fetch_nearby_hospitals");
      return;
    }
  }
};
</script>
