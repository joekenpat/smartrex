import Vue from "vue";
import Router from "vue-router";
import { store } from "../store/index";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () => import("../views/diagnose.vue"),
      props: true,
      meta: { requireAuth: true }
    },
    {
      path: "/diagnose",
      name: "diagnose",
      component: () => import("../views/diagnose.vue"),
      props: true,
      meta: { requireAuth: true }
    },
    {
      path: "/nearby_hospitals",
      name: "nearby_hospitals",
      component: () => import("../views/nearby_hospitals.vue"),
      props: true,
      meta: { requireAuth: true }
    },
    {
      path: "/nearby_doctors",
      name: "nearby_doctors",
      component: () => import("../views/nearby_doctors.vue"),
      props: true,
      meta: { requireAuth: true }
    },
    {
      path: "/doctor_details/:doctor_id",
      name: "doctor_details",
      component: () => import("../views/DoctorDetails.vue"),
      props: true,
      meta: { requireAuth: true }
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("../views/auth.vue"),
      props: true
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/register.vue"),
      props: true
    },
    {
      path: "/view_profile",
      name: "view_profile",
      component: () => import("../views/view_profile.vue"),
      props: true,
      meta: { requireAuth: true }
    },
    {
      path: "/page_not_found",
      alias: "/*",
      name: "page_not_found",
      component: () => import("../views/PageNotFound.vue"),
      props: true,
      meta: { requireAuth: false }
    }
  ]
});

const waitForStorageToBeReady = async (to, from, next) => {
  await store.restored;
  const current_user = store.state.current_user;
  const requireAuth = to.matched.some(x => x.meta.requireAuth);

  if (requireAuth && !current_user) {
    next("auth");
  } else if (current_user && (to.path == "/auth" || to.path == "/register")) {
    next("diagnose");
  } else if (requireAuth && current_user) {
    next();
  } else {
    next();
  }
};

router.beforeEach(waitForStorageToBeReady);

export default router;
