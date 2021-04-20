<template>
  <v-container fluid grid-list-xs class="pa-0 white">
    <v-row no-gutters class="d-flex justify-center mb-5">
      <v-col cols="12" class="pa-0">
        <div class="content">
          <canvas class="snow" id="snow" ref="snow"></canvas>
          <div class="main-text">
            <h1>
              {{ primaryText }}
            </h1>
            <h2>
              {{ secondaryText }}
            </h2>

            <router-link
              v-if="actionLink"
              class="home-link"
              :to="actionLink.path"
              >{{ actionLink.text }}</router-link
            >
          </div>
          <div class="ground">
            <div class="mound">
              <div v-if="typeof codeIcon === 'number'" class="mound_text">
                {{ codeIcon }}
              </div>
              <v-icon v-else class="mound_icon">
                {{ codeIcon }}
              </v-icon>
              <div class="mound_spade"></div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      el: undefined,
      ctxx: undefined
    };
  },
  mounted() {
    let cv = document.getElementById("snow");
    this.canvas = cv;
    this.ctxx = cv.getContext("2d");
    this.makeSnow(this.canvas, this.ctxx);
  },
  created() {},
  methods: {
    makeSnow(el, ctxx) {
      var ctx = ctxx;
      var width = 0;
      var height = 0;
      var particles = [];

      var Particle = function() {
        this.x = this.y = this.dx = this.dy = 0;
        this.reset();
      };

      Particle.prototype.reset = function() {
        this.y = Math.random() * height;
        this.x = Math.random() * width;
        this.dx = Math.random() * 1 - 0.5;
        this.dy = Math.random() * 0.5 + 0.5;
      };

      function createParticles(count) {
        if (count != particles.length) {
          particles = [];
          for (var i = 0; i < count; i++) {
            particles.push(new Particle());
          }
        }
      }

      function onResize() {
        width = window.innerWidth;
        height = window.innerHeight;
        el.width = width;
        el.height = height;

        createParticles((width * height) / 10000);
      }

      function updateParticles() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#f6f9fa";

        particles.forEach(function(particle) {
          particle.y += particle.dy;
          particle.x += particle.dx;

          if (particle.y > height) {
            particle.y = 0;
          }

          if (particle.x > width) {
            particle.reset();
            particle.y = 0;
          }

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 5, 0, Math.PI * 2, false);
          ctx.fill();
        });

        window.requestAnimationFrame(updateParticles);
      }

      onResize();
      updateParticles();

      window.addEventListener("resize", onResize);
    }
  },
  props: {
    primaryText: {
      required: true,
      type: String
    },
    secondaryText: {
      required: true,
      type: String
    },
    actionLink: {
      required: true,
      type: Object,
      default: null
    },
    codeIcon: {
      required: true,
      type: [String, Number]
    }
  }
};
</script>
<style scoped>
.content {
  height: 100%;
  position: relative;
  z-index: 1;
  background-color: #d2e1ec;
  background-image: linear-gradient(to bottom, #bbcfe1 0%, #e8f2f6 80%);
  overflow: hidden;
}

.snow {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 20;
}

.main-text {
  padding: 20vh 20px 0 20px;
  text-align: center;
  min-height: 75vh;
  line-height: 2em;
  font-size: 5vh;
}

.main-text h1 {
  font-size: 0.9em;
  line-height: 1.1em;
  color: #41b883;
}
.main-text h2 {
  font-size: 0.75em;
  line-height: 1.2em;
}

.home-link {
  font-size: 0.6em;
  line-height: 1.2em;
  font-weight: 400;
  color: inherit;
  text-decoration: none;
  opacity: 0.6;
  color: #41b883;
  border-bottom: 1px dashed rgba(93, 115, 153, 0.5);
}
.home-link:hover {
  opacity: 1;
}

.ground {
  height: 160px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #f6f9fa;
  box-shadow: 0 0 10px 10px #f6f9fa;
}
.ground:before,
.ground:after {
  content: "";
  display: block;
  width: 250px;
  height: 250px;
  position: absolute;
  top: -62.5px;
  z-index: -1;
  background: transparent;
  transform: scaleX(0.2) rotate(45deg);
}
.ground:after {
  left: 50%;
  margin-left: -166.6666666667px;
  box-shadow: -315px 285px 15px #9aa9c2, -610px 590px 15px #b0bccf,
    -925px 875px 15px #b4bed1, -1175px 1225px 15px #a7b4c9,
    -1495px 1505px 15px #7e90b0, -1765px 1835px 15px #9dabc4,
    -2115px 2085px 15px #adb9cd, -2375px 2425px 15px #8e9eba,
    -2720px 2680px 15px #b7c1d3, -3005px 2995px 15px #8e9eba,
    -3335px 3265px 15px #b0bccf, -3570px 3630px 15px #91a1bc,
    -3890px 3910px 15px #a7b4c9, -4235px 4165px 15px #97a6c0,
    -4455px 4545px 15px #a7b4c9, -4780px 4820px 15px #b0bccf;
}
.ground:before {
  right: 50%;
  margin-right: -166.6666666667px;
  box-shadow: 320px -280px 15px #9dabc4, 600px -600px 15px #8798b6,
    925px -875px 15px #a7b4c9, 1245px -1155px 15px #7e90b0,
    1470px -1530px 15px #aab6cb, 1815px -1785px 15px #8496b4,
    2095px -2105px 15px #9dabc4, 2380px -2420px 15px #b0bccf,
    2715px -2685px 15px #aab6cb, 3040px -2960px 15px #a4b1c8,
    3275px -3325px 15px #8e9eba, 3605px -3595px 15px #b4bed1,
    3930px -3870px 15px #adb9cd, 4180px -4220px 15px #aab6cb,
    4550px -4450px 15px #8193b2, 4780px -4820px 15px #8798b6;
}

.mound {
  margin-top: -110px;
  font-weight: 800;
  font-size: 11em;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  text-align: center;
  color: #dd4040;
  pointer-events: none;
}
.mound:before {
  content: "";
  display: block;
  width: 600px;
  height: 200px;
  position: absolute;
  left: 50%;
  margin-left: -300px;
  top: 50px;
  z-index: 1;
  border-radius: 100%;
  background-color: #e8f2f6;
  background-image: linear-gradient(to bottom, #dee8f1, #f6f9fa 60px);
}
.mound:after {
  content: "";
  display: block;
  width: 28px;
  height: 6px;
  position: absolute;
  left: 50%;
  margin-left: -150px;
  top: 68px;
  z-index: 2;
  background: #dd4040;
  border-radius: 100%;
  transform: rotate(-15deg);
  box-shadow: -56px 12px 0 1px #dd4040, -126px 6px 0 2px #dd4040,
    -196px 24px 0 3px #dd4040;
}

.mound_text,
.mound_icon {
  transform: rotate(5deg);
}
.mound_icon {
  font-size: 100px !important;
  margin-top: -60px;
  color: #dd4040 !important;
}

.mound_spade {
  display: block;
  width: 35px;
  height: 30px;
  position: absolute;
  right: 50%;
  top: 30%;
  margin-right: -190px;
  z-index: 0;
  transform: rotate(35deg);
  background: #dd4040;
}
.mound_spade:before,
.mound_spade:after {
  content: "";
  display: block;
  position: absolute;
}
.mound_spade:before {
  width: 40%;
  height: 30px;
  bottom: 98%;
  left: 50%;
  margin-left: -20%;
  background: #dd4040;
  color: #dd4040;
}
.mound_spade:after {
  width: 100%;
  height: 30px;
  top: -55px;
  left: 0%;
  box-sizing: border-box;
  border: 10px solid #dd4040;
  border-radius: 4px 4px 20px 20px;
}
</style>
