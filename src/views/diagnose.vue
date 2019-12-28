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
              <v-col
                v-for="(selection, i) in selections"
                :key="selection"
                class="shrink pa-1"
              >
                <v-chip
                  :disabled="loading"
                  close
                  @click:close="selected.splice(i, 1)"
                  small
                  color="#41b883"
                  text-color="white"
                >
                  <v-icon left></v-icon>
                  {{ selection }}
                </v-chip>
              </v-col>
              <v-col v-if="!result" cols="12">
                <v-textarea
                  ref="user_explanation"
                  v-model="user_explanation"
                  full-width
                  hide-details
                  label="Talk To Smartrex"
                  auto-grow
                  rows="1"
                >
                  <v-btn
                    slot="append"
                    @click="(loading = true), ai_diagnose_user()"
                    text
                    icon
                    class="my-auto pa-0"
                    color="#41b883"
                    :disabled="user_explanation == ''"
                  >
                    <v-icon>mdi-send</v-icon>
                  </v-btn>
                </v-textarea>
              </v-col>
            </v-row>
          </v-container>

          <v-divider v-if="!allSelected"></v-divider>

          <v-list v-if="!result">
            <v-slide-x-transition class="py-0" group>
              <template v-for="(item, i) in symptom_list">
                <v-list-item
                  v-if="!selected.includes(i)"
                  :key="i"
                  :disabled="loading"
                  @click="selected.push(i)"
                >
                  <v-list-item-title v-text="item"></v-list-item-title>
                  <v-list-item-avatar class="my-0">
                    <v-icon color="#41b883">mdi-plus</v-icon>
                  </v-list-item-avatar>
                </v-list-item>
              </template>
            </v-slide-x-transition>
          </v-list>
          <v-list v-if="result">
            <v-subheader class="mx-auto px-auto">Possible Ailments</v-subheader>
            <v-slide-x-transition class="py-0" group>
              <template v-for="item in diseases">
                <v-list-item :key="item">
                  <v-list-item-avatar class="my-0">
                    <v-icon color="#41b883">mdi-information-variant</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-title v-text="item"></v-list-item-title>
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
      symptoms: [
        "aging, premature",
        "fever",
        "hypothermia",
        "body weight",
        "birth weight",
        "weight loss",
        "cyanosis",
        "muscle hypertonia",
        "muscle rigidity",
        "muscle weakness",
        "quadriplegia",
        "reflex, abnormal",
        "seizures",
        "abdominal pain",
        "anorexia",
        "diarrhea, infanti",
        "nausea",
        "anoxia",
        "apnea",
        "cough",
        "dyspnea",
        "hemoptysis",
        "hypercapnia",
        "hyperventilation",
        "respiratory aspir",
        "respiratory sound",
        "proteinuria",
        "weight gain",
        "cachexia",
        "obesity",
        "edema",
        "paralysis",
        "hearing disorders",
        "hearing loss",
        "hearing loss, con",
        "hearing loss, sen",
        "sleep disorders",
        "sleep deprivation",
        "oral manifestatio",
        "diarrhea",
        "hyperoxia",
        "sneezing",
        "asthenia",
        "fever of unknown ",
        "fetal macrosomia",
        "emaciation",
        "overweight",
        "obesity, morbid",
        "thinness",
        "cardiac output, l",
        "hydrops fetalis",
        "eye hemorrhage",
        "fatigue",
        "fetal distress",
        "hot flashes",
        "hypergammaglobuli",
        "mobility limitati",
        "cerebrospinal flu",
        "dyskinesias",
        "ataxia",
        "cerebellar ataxia",
        "gait ataxia",
        "athetosis",
        "chorea",
        "dystonia",
        "hyperkinesis",
        "hypokinesia",
        "myoclonus",
        "psychomotor agita",
        "akathisia, drug-i",
        "tics",
        "tremor",
        "gait disorders, n",
        "meningism",
        "apraxias",
        "catatonia",
        "communication dis",
        "language disorder",
        "dyslexia",
        "alexia, pure",
        "language developm",
        "speech disorders",
        "aphasia",
        "aphasia, broca",
        "dysarthria",
        "learning disorder",
        "confusion",
        "delirium",
        "consciousness dis",
        "unconsciousness",
        "coma",
        "syncope",
        "memory disorders",
        "amnesia",
        "mental retardatio",
        "auditory perceptu",
        "hallucinations",
        "psychomotor disor",
        "muscle cramp",
        "muscle spasticity",
        "muscle hypotonia",
        "muscular atrophy",
        "myotonia",
        "tetany",
        "pain",
        "back pain",
        "low back pain",
        "facial pain",
        "headache",
        "neck pain",
        "neuralgia",
        "neuralgia, posthe",
        "sciatica",
        "pain, intractable",
        "facial paralysis",
        "gastroparesis",
        "hemiplegia",
        "ophthalmoplegia",
        "ophthalmoplegia, ",
        "paraplegia",
        "pseudobulbar pals",
        "respiratory paral",
        "vocal cord paraly",
        "paresis",
        "paraparesis",
        "paraparesis, spas",
        "psychophysiologic",
        "sensation disorde",
        "dizziness",
        "deafness",
        "hearing loss, bil",
        "hearing loss, noi",
        "tinnitus",
        "olfaction disorde",
        "somatosensory dis",
        "hyperalgesia",
        "hyperesthesia",
        "hypesthesia",
        "paresthesia",
        "taste disorders",
        "dysgeusia",
        "vision disorders",
        "blindness",
        "blindness, cortic",
        "color vision defe",
        "diplopia",
        "hemianopsia",
        "vision, low",
        "urinary bladder, ",
        "vertigo",
        "voice disorders",
        "hoarseness",
        "oral hemorrhage",
        "abdomen, acute",
        "colic",
        "arthralgia",
        "chest pain",
        "angina pectoris",
        "acute coronary sy",
        "angina, unstable",
        "earache",
        "toothache",
        "pain, postoperati",
        "pelvic pain",
        "constipation",
        "dyspepsia",
        "flatulence",
        "heartburn",
        "hiccup",
        "hyperphagia",
        "bulimia",
        "vomiting",
        "hematemesis",
        "mouth breathing",
        "snoring",
        "ecchymosis",
        "jaundice",
        "jaundice, obstruc",
        "pruritus",
        "tinea pedis",
        "purpura",
        "purpura, schoenle",
        "purpura, thromboc",
        "purpura, thrombot",
        "hypercalciuria",
        "polyuria",
        "albuminuria",
        "hemoglobinuria",
        "urinary incontine",
        "virilism",
        "neurologic manife",
        "torticollis",
        "aphasia, wernicke",
        "stuttering",
        "gerstmann syndrom",
        "illusions",
        "phantom limb",
        "spasm",
        "reflex, babinski",
        "hearing loss, cen",
        "hearing loss, sud",
        "hyperacusis",
        "shoulder pain",
        "fetal hypoxia",
        "skin manifestatio",
        "body weight chang",
        "chills",
        "edema, cardiac",
        "mental fatigue",
        "feminization",
        "flushing",
        "intermittent clau",
        "motion sickness",
        "syncope, vasovaga",
        "lethargy",
        "perceptual disord",
        "trismus",
        "pupil disorders",
        "horner syndrome",
        "scotoma",
        "angina pectoris, ",
        "reticulocytosis",
        "postoperative nau",
        "hyperemesis gravi",
        "vomiting, anticip",
        "dyspnea, paroxysm",
        "hypoventilation",
        "livedo reticulari",
        "dysuria",
        "hirsutism",
        "hearing loss, hig",
        "dysphonia",
        "glossalgia",
        "halitosis",
        "cafe-au-lait spot",
        "cardiac output, h",
        "eye manifestation",
        "heart murmurs",
        "hearing loss, uni",
        "amblyopia",
        "photophobia",
        "pseudophakia",
        "pallor",
        "waterhouse-frider",
        "oliguria",
        "flank pain",
        "fetal weight",
        "mutism",
        "hearing loss, mix",
        "amaurosis fugax",
        "purpura, hyperglo",
        "persistent vegeta",
        "sarcopenia",
        "presbycusis",
        "prostatism",
        "pain, referred",
        "brown-sequard syn",
        "dysmenorrhea",
        "cheyne-stokes res",
        "labor pain",
        "articulation diso",
        "gagging",
        "supranuclear pals",
        "agnosia",
        "fasciculation",
        "metatarsalgia",
        "ageusia",
        "aphonia",
        "purpura fulminans",
        "gait apraxia",
        "neurobehavioral m",
        "orthostatic intol",
        "hypocapnia",
        "prosopagnosia",
        "anisocoria",
        "korsakoff syndrom",
        "decerebrate state",
        "miosis",
        "necrolytic migrat",
        "synkinesis",
        "hemifacial spasm",
        "hearing loss, fun",
        "agraphia",
        "dyslexia, acquire",
        "deaf-blind disord",
        "usher syndromes",
        "catalepsy",
        "anomia",
        "aphasia, conducti",
        "aphasia, primary ",
        "stupor",
        "amnesia, anterogr",
        "amnesia, retrogra",
        "apraxia, ideomoto",
        "tonic pupil",
        "encopresis",
        "echolalia",
        "aerophagy",
        "eructation",
        "amnesia, transien",
        "myokymia",
        "primary progressi",
        "coprophagia",
        "nocturia",
        "renal colic",
        "urinoma",
        "systolic murmurs",
        "striae distensae",
        "morning sickness",
        "eye pain",
        "sweating sickness"
      ],
      diseases: [],
      loading: false,
      user_explanation: "",
      selected: [],
      result: false
    };
  },
  methods: {
    ai_diagnose_user() {
      this.loading = true;
      axios
        .post("https://smartrex-server.herokuapp.com/api/v1/user/ai_diagnose", {
          user_explanation: this.user_explanation
        })
        .then(res => {
          this.diseases = [];
          var diseases_found = res.data.data.diseases_found;
          diseases_found.forEach(disease => {
            this.diseases.push(disease);
          });
          this.user_explanation = "";
          this.result = true;
          this.loading = false;
          return;
        })
        .catch(err => {
          console.log(err);
          this.result = false;
          this.loading = false;
          return;
        });
      return;
    }
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
        .filter(item => {
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
    }
  }
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
</style>
