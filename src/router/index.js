import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    meta: {
      title: "Login",
    },
    path: "/",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    meta: {
      title: "Register",
    },
    path: "/register",
    name: "register",
    component: () => import("@/views/RegisterView.vue"),
  },
  // {
  //   meta: {
  //     title: "Select style",
  //   },
  //   path: "/",
  //   name: "style",
  //   component: () => import("@/views/StyleView.vue"),
  // },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: "Dashboard",
    },
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: "All Users",
    },
    path: "/users",
    name: "users",
    component: () => import("@/views/AllUsersView.vue"),
  },
  {
    meta: {
      title: "Campaigns",
    },
    path: "/campaigns",
    name: "campaigns",
    component: () => import("@/views/CampaignsView.vue"),
  },
  {
    meta: {
      title: "Challenge Info",
    },
    path: "/challenge-info",
    name: "challenge-info",
    component: () => import("@/views/ChallengeInfoView.vue"),
  },
  {
    meta: {
      title: "Create Challenge",
    },
    path: "/create-challenge",
    name: "create-challenge",
    component: () => import("@/views/CreateChallengeView.vue"),
  },
  {
    meta: {
      title: "Sponsors",
    },
    path: "/sponsors",
    name: "sponsors",
    component: () => import("@/views/SponsorsView.vue"),
  },
  {
    meta: {
      title: "Create Sponsor",
    },
    path: "/create-sponsor",
    name: "create-sponsor",
    component: () => import("@/views/CreateSponsorView.vue"),
  },
  {
    meta: {
      title: "Causes",
    },
    path: "/causes",
    name: "causes",
    component: () => import("@/views/CausesView.vue"),
  },
  {
    meta: {
      title: "Create Cause",
    },
    path: "/create-cause",
    name: "create-cause",
    component: () => import("@/views/CreateCauseView.vue"),
  },
  {
    meta: {
      title: "Rewards & Messages",
    },
    path: "/rewards-messages",
    name: "rewards-messages",
    component: () => import("@/views/Rewards&MessagesView.vue"),
  },
  {
    meta: {
      title: "Create Reward",
    },
    path: "/create-reward",
    name: "create-reward",
    component: () => import("@/views/CreateRewardView.vue"),
  },
  {
    meta: {
      title: "Create Message",
    },
    path: "/create-message",
    name: "create-message",
    component: () => import("@/views/CreateMessageView.vue"),
  },
  {
    meta: {
      title: "Comunity Message",
    },
    path: "/comunity-message",
    name: "comunity-message",
    component: () => import("@/views/ComunityMessageView.vue"),
  },
  {
    meta: {
      title: "Credits",
    },
    path: "/credits",
    name: "credits",
    component: () => import("@/views/CreditsView.vue"),
  },
  {
    meta: {
      title: "Credit History",
    },
    path: "/credits-history",
    name: "credits-history",
    component: () => import("@/views/CreditsHistoryView.vue"),
  },
  {
    meta: {
      title: "Processing credits",
    },
    path: "/credits-validate/:token/:amount",
    name: "credits-validate",
    props: true,
    component: () => import("@/views/CreditsValidateView.vue"),
  },
  {
    meta: {
      title: "Presentation",
    },
    path: "/presentation",
    name: "presentation",
    component: () => import("@/views/PresentationView.vue"),
  },
  {
    meta: {
      title: "Tables",
    },
    path: "/tables",
    name: "tables",
    component: () => import("@/views/TablesView.vue"),
  },
  {
    meta: {
      title: "Forms",
    },
    path: "/forms",
    name: "forms",
    component: () => import("@/views/FormsView.vue"),
  },
  // {
  //   meta: {
  //     title: "Profile",
  //   },
  //   path: "/profile",
  //   name: "profile",
  //   component: () => import("@/views/ProfileView.vue"),
  // },
  {
    meta: {
      title: "Ui",
    },
    path: "/ui",
    name: "ui",
    component: () => import("@/views/UiView.vue"),
  },
  {
    meta: {
      title: "Responsive layout",
    },
    path: "/responsive",
    name: "responsive",
    component: () => import("@/views/ResponsiveView.vue"),
  },
  {
    meta: {
      title: "Error",
    },
    path: "/error",
    name: "error",
    component: () => import("@/views/ErrorView.vue"),
  },
  {
    meta: {
      title: "Profile",
    },
    path: "/profile",
    name: "profile",
    component: () => import("@/views/ProfileView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

export default router;
