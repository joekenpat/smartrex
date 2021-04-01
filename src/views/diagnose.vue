<template>
  <v-container fluid grid-list-xs class="pa-0 white">
    <v-row no-gutters class="d-flex justify-center">
      <v-col cols="12" class="pa-0">
        <v-card class="mx-auto elevation-0" light style="border-radius:0;">
          <svg viewBox="-2000 -1000 4000 2000">
            <path
              id="inf"
              d="M354-354A500 500 0 1 1 354 354L-354-354A500 500 0 1 0-354 354z"
            ></path>
            <use
              xlink:href="#inf"
              stroke-dasharray="1570 5143"
              stroke-dashoffset="6713px"
              :class="{ use: loading }"
            ></use>
          </svg>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters class="d-flex justify-center">
      <v-col cols="12" class="pa-0">
        <v-card class="mx-auto elevation-0" max-width="500">
          <v-container v-if="!result" class="py-0">
            <v-row align="center" justify="start">
              <v-col v-if="!result" cols="12">
                <v-textarea
                  ref="user_explanation"
                  v-model="user_explanation"
                  full-width
                  hide-details
                  label="Talk To Smartrex"
                  auto-grow
                  color="#41b883"
                  outlined
                  shaped
                  clearable
                  class="mb-"
                />
                <v-btn
                  x-large
                  block
                  tile
                  color="#41b883"
                  class="mb-5 elevation-1"
                  :disabled="!user_explanation || loading"
                  @click="ai_diagnose_user()"
                >
                  <v-icon large color="white">mdi-medical-bag</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
          <v-list v-if="result">
            <v-subheader class="mx-auto px-auto">Possible Ailments</v-subheader>
            <v-slide-x-transition class="py-0" group>
              <template v-for="(disease,index) in diseases">
                <v-list-item :key="disease">
                  <v-list-item-avatar size="25" color="red accent-2" class="my-0">
                    <v-icon color="white" v-text="index+1"></v-icon>
                  </v-list-item-avatar>
                  <v-list-item-title v-text="disease"></v-list-item-title>
                  <v-divider
                  v-if="index + 1 < diseases.length"
                  :key="index"
                  inset
                ></v-divider>
                </v-list-item>
              </template>
            </v-slide-x-transition>
          </v-list>
          <v-btn
            v-if="result"
            @click="result = false"
            block
            text
            color="#41b883"
            >Run Another Diagnose</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      diseases: [
        'ant','goat','sdr'
      ],
      loading: false,
      user_explanation: "",
      selected: [],
      result: false,
    };
  },
  methods: {
    ai_diagnose_user() {
      this.loading = true;
      axios
        .post("https://smartrex-server.herokuapp.com/api/v1/user/ai_diagnose", {
          user_explanation: this.user_explanation,
        })
        .then((res) => {
          this.diseases = [];
          var diseases_found = res.data.data.diseases_found;
          diseases_found.forEach((disease) => {
            this.diseases.push(disease);
          });
          this.user_explanation = "";
          this.result = true;
          this.loading = false;
          return;
        })
        .catch((err) => {
          console.log(err);
          this.result = false;
          this.loading = false;
          return;
        });
      return;
    },
  },
  created() {},
  computed: {
    allSelected() {
      return this.selected.length === this.symptoms.length;
    },
    symptom_list() {
      const user_explanation = this.user_explanation.toLowerCase();

      if (!user_explanation) return this.symptoms.slice(0, 5);

      return this.symptoms
        .filter((item) => {
          const text = item.toLowerCase();

          return text.indexOf(user_explanation) > -1;
        })
        .slice(0, 5);
    },
    selections() {
      const selections = [];

      for (const selection of this.selected) {
        selections.push(this.symptom_list[selection]);
      }

      return selections;
    },
  },
};
</script>
<style scoped>
svg {
  display: block;
  max-width: 25em;
  border-radius: 3px;
  background: #fff;
  fill: none;
  margin: auto;
  stroke: #41b883;
  stroke-linecap: round;
  stroke-width: 3%;
}

.use {
  stroke: #fff;
  animation: a 2s linear infinite;
}

@keyframes a {
  to {
    stroke-dashoffset: 0px;
  }
}
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
