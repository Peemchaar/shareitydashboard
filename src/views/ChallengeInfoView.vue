<script setup>
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import { ref, watchEffect, reactive } from "vue";
import ChallengeController from "@/controllers/ChallengeController";
import UserController from "@/controllers/UserController";
import { useSessionStore } from "@/stores/session.js";

import {
  mdiArrowLeftDropCircle,
  mdiBookEdit,
  mdiGift,
  mdiInformation,
  mdiPencil,
  mdiStar,
} from "@mdi/js";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { computed } from "vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import UtilityMehods from "@/utility/utilityMethods";
import { useRouter, useRoute } from "vue-router";
import RewardController from "@/controllers/RewardController";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import SponsorController from "@/controllers/SponsorController";

const sessionStore = useSessionStore();

const stepsShare = {
  SHARE_VIEW: "initial challenge view",
  SHARE_UPLOAD: "challenge upload",
  SHARE_NUMBER: "phone number input",
  SHARE_NAME: "challenge finised",
  TWILIO_VIEW: "initial challenge view",
  TWILIO_UPLOAD: "challenge finished",
  TWILIO_NAME: "code and name input",
};
const rates = {
  engagementRate: "Engagement Rate",
  inbound: "Inbound Rate",
  networkRate: "Network Rate",
  outbound: "Outbound Rate",
  peer: "Peer Rate",
  throughRate: "Through Rate",
};
const RRSS = {
  instagram: "social/instagram.png",
  tiktok: "social/tiktok.png",
  facebook: "social/facebook.png",
  twitter: "social/twitter.png",
  whatsapp: "social/whatsapp.png",
  pinterest: "social/pinterest.png",
  email: "social/email.png",
  direct: "social/link.png",
};

const route = useRoute();
const router = useRouter();
const host = import.meta.env.VITE_IMAGE_HOST;
const shareUrl =
  "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=" +
  import.meta.env.VITE_FRONT_HOST +
  "/challenges/" +
  route.query.id;

const urlWithMessage =
  localStorage.getItem("shareMessage") +
  " " +
  import.meta.env.VITE_FRONT_HOST +
  "/challenges/" +
  route.query.id;

const urlShred = ref();
const dataChallenge = ref({});
const dataStats = ref();
const swayScore = ref();
const dataSteps = ref({ SHARE: [], TWILIO: [] });
const challengesFeed = ref([]);
const allUsers = ref([]);
const messagesOut = ref();
const networkUsers = ref();
const selectedUser = ref({});
const rate = ref({});
const rewards = ref([]);
const sponsorData = ref([]);
const status = computed(() => {
  return !!dataChallenge.value.status;
});
const snackbar = ref(false);
const isModalActive = ref(false);

const modalShare = ref(false);
const modalReward = ref(false);

const modalStatus = ref(false);
const linkCopied = ref(false);
let shareToInstagram = ref(false);
let shareToTikTok = ref(false);

const form = reactive({
  reward: rewards[0],
  user: "",
});

watchEffect(() => {
  console.log("ROL DE USUARIO: ", sessionStore.getUserRole());
  if (sessionStore.getUserRole() == "sponsor") {
    SponsorController.getByUserId(parseInt(sessionStore.getUserId())).then(
      (data) => {
        sponsorData.value = data;
      }
    );
  }
  ChallengeController.getChallengesStats(route.query.id).then((data) => {
    console.log("data-stats", data);
    dataChallenge.value = data.challenge;
    dataStats.value = data.stats;
    Object.keys(data.steps).forEach((step) => {
      dataSteps.value[step.split("_")[0]].push({
        data: data.steps[step],
        title: stepsShare[step],
      });
    });
    dataSteps.value.SHARE = dataSteps.value.SHARE.reverse();
    dataSteps.value.TWILIO = dataSteps.value.TWILIO.reverse();
    allUsers.value = data.challenge.userChallenges.map((item) => {
      return { user: item.user, url: item.url };
    });
    allUsers.value = allUsers.value.filter(
      (value) => value.user.firstName !== "Unknown"
    );
    networkUsers.value = data.networkUsers;
    messagesOut.value = data.messagesOut;
    rate.value = data.rate;
  });

  ChallengeController.getUrlChallengeShared(route.query.id).then((data) => {
    console.log("shred-data", data.twilio.id);
    urlShred.value =
      import.meta.env.VITE_FRONT_HOST +
      `/challenge/shares/${data.twilio.id}/` +
      route.query.id;
  });
  RewardController.getAll().then((data) => {
    let list = data.map((item) => {
      return { id: item.id, label: item.Name };
    });
    rewards.value = list;
    form.reward = list[0];
  });
}, [route.query.id]);

function copySocial() {
  document.getElementById("urlSocial").focus();
  document.execCommand("copy");
}

function copyUrlLink() {
  var dummy = document.createElement("input");
  document.body.appendChild(dummy);
  dummy.value = urlShred;
  dummy.select();
  dummy.setSelectionRange(0, 99999);
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

function formatNumber(property) {
  return dataStats.value.total[property].toFixed(0) != 0
    ? "$" +
        (
          (allUsers.value.length * dataChallenge.value.amount) /
          dataStats.value.total[property]
        ).toFixed(2)
    : "No Data";
}

async function changeStatusChallenge(force = false) {
  try {
    let response;
    const id = route.query.id;
    const newStatus = !dataChallenge.value.status;
    if (force) {
      //call back
      response = await ChallengeController.changeStatus(id, newStatus);
      if (response.status === 200) {
        dataChallenge.value.status = newStatus; // Actualiza el estado local
      }
    }
    modalStatus.value = !force;

    return response?.data; // Retorna los datos de la respuesta del servidor
  } catch (error) {
    console.error("Error al cambiar el estado:", error);
    // Manejo de errores aquí
    throw error;
  }
}

function goEdit() {
  router.push({
    name: "create-challenge",
    query: {
      id: route.query.id,
    },
  });
}
function onClickSelectedUser(selected_User) {
  isModalActive.value = true;
  selectedUser.value = selected_User;
  UserController.getSwayScore(selected_User.user.id).then((data) => {
    swayScore.value = data.value;
    console.log(data);
    return data;
  });
}

function openRewardModal(selected_User) {
  modalReward.value = true;
  selectedUser.value = selected_User;
}

async function sendReward() {
  let rewardData = {
    reward: form.reward.id,
    idUsr: selectedUser.value.user.id,
  };

  await RewardController.giveReward(rewardData).then((response) => {
    modalReward.value = false;
  });
}

function checkFile(url) {
  const imgExt = [".GIF", ".MP4", ".MOV"];
  const ext = "." + url.split(".").pop();
  if (imgExt.indexOf(ext.toUpperCase()) < 0) {
    return false;
  } else {
    return true;
  }
}

function statusShow(status) {
  switch (status) {
    case 0:
      return "Inactive";
    case 1:
      return "Active";
    case 2:
      return "Deleted";
    default:
      return "Unknown";
  }
}

// Table
const perPage = ref(6);
const currentPage = ref(1);
const checkedRows = ref([]);
const imagenRef = ref(null);
const videoRef = ref(null);
const itemsPaginated = computed(() =>
  allUsers.value.slice(
    perPage.value * (currentPage.value - 1),
    perPage.value * currentPage.value - 1
  )
);

const numPages = computed(() =>
  Math.ceil(allUsers.value.length / perPage.value)
);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }

  return pagesList;
});
</script>

<template>
  <LayoutAuthenticated>
    <div v-if="dataStats">
      <input
        id="urlSocial"
        style="opacity: 0; position: absolute"
        readonly
        v-on:focus="$event.target.select()"
        :value="urlWithMessage"
      />
      <!-- Modal Copy Links -->
      <v-dialog v-model="linkCopied" width="auto" class="justify-center">
        <v-card
          v-bind:style="[
            !shareToInstagram && !shareToTikTok
              ? { height: '400px' }
              : { height: '420px' },
          ]"
        >
          <v-card-title class="text-4xl font-bold pt-5 text-center">
            Your link was copied!
          </v-card-title>
          <div class="flex items-center justify-center flex-wrap gap-3 p-5">
            <v-sheet class="text-center container-modal" height="260px">
              <div class="flex justify-center">
                <img
                  class="flex"
                  style="max-width: 30%"
                  src="/assets/img/png/steve_buy_usd.png"
                  alt=""
                />
              </div>
              <div
                class="my-2 text-center"
                v-if="!shareToInstagram && !shareToTikTok"
              >
                Now paste your challenge link everywhere!
              </div>
              <div class="my-2 text-center" v-else>
                Now post the challenge link on your story and direct fans to
                click and accept your challenge!
              </div>
              <div class="pb-5 flex justify-center">
                <BaseButton
                  v-if="!shareToInstagram && !shareToTikTok"
                  label="Got it!"
                  color="info"
                  rounded-full
                  @click="linkCopied = false"
                />
                <a
                  v-if="shareToInstagram"
                  href="https://www.instagram.com/"
                  target="_blank"
                >
                  <div class="flex items-center">
                    <img class="w-8 h-8" src="/assets/social/instagram.png" />
                    <p
                      class="bg-pink-700 text-white italic font-bold rounded-r-md py-0.5 -ml-1 -z-1 px-2"
                    >
                      Go to Instagram!
                    </p>
                  </div>
                </a>
                <a
                  v-if="shareToTikTok"
                  href="https://www.tiktok.com/"
                  target="_blank"
                >
                  <div class="flex items-center">
                    <img class="w-8 h-8" src="/assets/social/tiktok.png" />
                    <p
                      class="bg-black text-white italic font-bold rounded-r-md py-0.5 -ml-1 -z-1 px-2"
                    >
                      Go to TikTok!
                    </p>
                  </div>
                </a>
              </div>
            </v-sheet>
          </div>
        </v-card>
      </v-dialog>
      <!-- Modal confirmation status -->
      <v-dialog v-model="modalStatus" width="auto">
        <v-card>
          <v-card-title class="text-h5 ml-2 red-darken-1">
            Are you sure you want to change the status of the challenge?
          </v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="mr-2"
              color="red-darken-1"
              variant="text"
              @click="changeStatusChallenge(true)"
            >
              Yes
            </v-btn>
            <v-btn
              class="mr-2"
              color="green-darken-1"
              variant="text"
              @click="modalStatus = false"
            >
              No
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Modal Share -->
      <v-dialog v-model="modalShare" width="auto">
        <v-card>
          <v-card-title class="text-4xl font-bold pt-5">
            Share to promote your challenge
          </v-card-title>

          <div class="flex items-center justify-center flex-wrap gap-3 p-5">
            <div class="social-item">
              <div
                @click="
                  copySocial(),
                    (shareToInstagram = true),
                    (shareToTikTok = false),
                    (modalShare = false),
                    (linkCopied = true)
                "
                class="flex items-center cursor-pointer"
              >
                <img
                  class="w-8 h-8 cursor-pointer"
                  src="/assets/social/instagram.png"
                />
                <p
                  class="bg-pink-700 text-white italic font-bold rounded-r-md py-0.5 -ml-1 -z-1 px-2 cursor-pointer"
                >
                  Instagram
                </p>
              </div>
            </div>
            <div class="social-item">
              <div
                @click="
                  copySocial(),
                    (shareToInstagram = false),
                    (shareToTikTok = true),
                    (modalShare = false),
                    (linkCopied = true)
                "
                class="flex items-center cursor-pointer"
              >
                <img
                  class="w-8 h-8 cursor-pointer"
                  src="/assets/social/tiktok.png"
                />
                <p
                  class="bg-black text-white italic font-bold rounded-r-md py-0.5 -ml-1 -z-1 px-2 cursor-pointer"
                >
                  TikTok
                </p>
              </div>
            </div>
            <ShareNetwork
              network="facebook"
              :url="urlShred"
              title="I CHALLENGE YOU TO DO THIS CHALLENGE"
              hashtags="Shareity"
              class="flex items-center"
            >
              <img class="w-8 h-8" src="/assets/social/facebook.png" />
              <p
                class="bg-sky-700 text-white italic font-bold rounded-r-md py-0.5 -ml-1 -z-1 px-2"
              >
                Facebook
              </p>
            </ShareNetwork>
            <ShareNetwork
              network="twitter"
              :url="urlShred"
              title="I CHALLENGE YOU TO DO THIS CHALLENGE"
              hashtags="Shareity"
              class="flex items-center"
            >
              <img class="w-8 h-8" src="/assets/social/twitter.png" />
              <p
                class="bg-blue-400 text-white italic font-bold rounded-r-md py-0.5 -ml-1 -z-1 px-2"
              >
                Twitter
              </p>
            </ShareNetwork>
            <ShareNetwork
              network="whatsApp"
              :url="urlShred"
              title="I CHALLENGE YOU TO DO THIS CHALLENGE"
              hashtags="Shareity"
              class="flex items-center"
            >
              <img class="w-8 h-8" src="/assets/social/whatsapp.png" />
              <p
                class="bg-green-400 text-white italic font-bold rounded-r-md py-0.5 -ml-1 -z-1 px-2"
              >
                Whatsapp
              </p>
            </ShareNetwork>
            <ShareNetwork
              network="pinterest"
              :url="urlShred"
              title="I CHALLENGE YOU TO DO THIS CHALLENGE"
              class="flex items-center"
            >
              <img class="w-8 h-8" src="/assets/social/pinterest.png" />
              <p
                class="bg-red-800 text-white italic font-bold rounded-r-md py-0.5 -ml-1 -z-1 px-2"
              >
                Pinterest
              </p>
            </ShareNetwork>
            <ShareNetwork
              network="linkedin"
              :url="urlShred"
              class="flex items-center"
            >
              <img class="w-8 h-8" src="/assets/social/linkedin.png" />
              <p
                class="bg-cyan-800 text-white italic font-bold rounded-r-md py-0.5 -ml-1 -z-1 px-2"
              >
                LinkedIn
              </p>
            </ShareNetwork>
            <div class="social-item">
              <a
                :href="`mailto:?&body=${
                  'I INVITE YOU TO JOIN MY CHALLENGE' + urlShred
                }`"
                target="_blank"
                class="flex items-center"
              >
                <img class="w-8 h-8" src="/assets/social/email.png" />
                <p
                  class="bg-blue-400 text-white italic font-bold rounded-r-md py-0.5 -ml-1 -z-1 px-2"
                >
                  Email
                </p>
              </a>
            </div>
            <div
              @click="
                copyUrlLink(),
                  (modalShare = false),
                  (shareToInstagram = false),
                  (shareToTikTok = false),
                  (linkCopied = true)
              "
              class="flex items-center"
            >
              <img
                class="w-8 h-8 cursor-pointer"
                src="/assets/social/link.png"
              />
              <p
                class="bg-blue-400 text-white italic font-bold rounded-r-md py-0.5 -ml-1 -z-1 px-2 cursor-pointer"
              >
                Copy Link
              </p>
              <input
                class="cursor-pointer"
                ref="url"
                style="opacity: 0; position: absolute"
                readonly
                v-on:focus="$event.target.select()"
                :value="urlShred"
              />
            </div>
            <div data-app>
              <Loading :active="loading" />
            </div>
          </div>
          <div class="flex justify-center mt-10">
            <img class="w-96 h-96" :src="shareUrl" />
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" variant="text" @click="modalShare = false">
              Disagree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- MODAL REWARDS -->
      <v-dialog v-model="modalReward" width="auto">
        <v-card>
          <v-card-title class="text-4xl font-bold pt-5">
            Reward this user-challenge
          </v-card-title>
          <div
            class="flex flex-column items-center justify-center flex-wrap gap-3 p-5"
          >
            <FormField label="Select reward">
              <FormControl
                v-model="form.reward"
                :options="rewards"
                :icon="mdiStar"
              />
            </FormField>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="mr-2"
                color="red-darken-1"
                variant="text"
                @click="modalReward = false"
              >
                Cancel
              </v-btn>
              <v-btn
                class="mr-2"
                color="green-darken-1"
                variant="text"
                @click="sendReward()"
              >
                Submit
              </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-dialog>

      <!-- MAIN -->
      <SectionMain v-if="dataChallenge.badge" class="col-span-1">
        <div class="flex justify-between pb-5">
          <div class="flex gap-2 items-center">
            <BaseButton
              to="/campaigns"
              :icon="mdiArrowLeftDropCircle"
              color="info"
              rounded-full
              small
            />
            <p class="font-extrabold">
              {{ dataChallenge.name }}
            </p>
          </div>
        </div>
        <!-- HEADER -->
        <CardBox class="mb-6">
          <div class="flex flex-col lg:flex-row items-center justify-between">
            <div class="rounded-lg shadow-md m-5">
              <img class="w-28" :src="host + dataChallenge.badge" alt="" />
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div class="flex flex-col col-span-1 gap-2">
                <div>
                  <p class="font-bold">START DATE:</p>
                  <p class="font-light">
                    {{ UtilityMehods.formatDate(dataChallenge.startDate) }}
                  </p>
                </div>
                <div>
                  <p class="font-bold">END DATE:</p>
                  <p class="font-light">
                    {{ UtilityMehods.formatDate(dataChallenge.endDate) }}
                  </p>
                </div>
              </div>
              <div class="flex flex-col col-span-1 gap-2">
                <div>
                  <p class="font-bold">CAUSE:</p>
                  <p class="font-light">
                    {{
                      dataChallenge.organization.name
                        ? dataChallenge.organization.name
                        : "Organization"
                    }}
                  </p>
                </div>
                <div>
                  <p class="font-bold">BRAND:</p>
                  <p class="font-light">
                    {{ dataChallenge.sponsors[0].sponsor.name }}
                  </p>
                </div>
              </div>
              <div class="flex flex-col col-span-1 align-center text-center">
                <p class="font-bold">DONATION:</p>

                <img
                  v-if="dataChallenge.typeDonation === 'object'"
                  class="w-28"
                  :src="host + dataChallenge.typeDonationIcon"
                  alt=""
                />
                <p v-else class="font-extrabold text-4xl text-green-600">
                  ${{ dataChallenge.amount }}
                </p>
              </div>
              <div class="flex flex-col col-span-1 justify-center gap-3">
                <div>
                  <p class="font-bold">
                    STATUS:
                    <span :class="status ? 'text-success' : 'text-red'">
                      {{ status ? "ACTIVE" : "INACTIVE" }}
                    </span>
                  </p>
                  <BaseButton
                    :label="(status ? 'Disable' : 'Enable') + ' Challenge'"
                    :color="status ? 'danger' : 'success'"
                    @click="changeStatusChallenge()"
                    small
                    class="w-100"
                  />
                </div>
                <BaseButton
                  label="Promote your challenge"
                  color="info"
                  @click="modalShare = true"
                  small
                />
              </div>
            </div>
            <div class="flex m-5">
              <BaseButton
                :icon="mdiPencil"
                color="info"
                rounded-full
                @click="goEdit"
              />
            </div>
          </div>
        </CardBox>

        <!-- TOTALS -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <NotificationBar color="info">
            COMUNITY MEMBERS:
            <span v-if="dataChallenge.id === 349" class="font-bold text-l">{{
              allUsers.length
            }}</span>
            <span v-else class="font-bold text-l">{{ allUsers.length }}</span>
          </NotificationBar>
          <NotificationBar color="success">
            TOTAL SHARES:
            <span class="font-bold text-l">{{
              dataStats.total.shares.toFixed(0)
            }}</span></NotificationBar
          >
          <NotificationBar color="warning">
            NETWORK EFFECT USERS:
            <span class="font-bold text-l">{{ networkUsers.toFixed(0) }}</span>
          </NotificationBar>
          <NotificationBar color="danger">
            MESSAGING OPT - OUTS:
            <span class="font-bold text-l">{{ messagesOut.toFixed(0) }}</span>
          </NotificationBar>
        </div>

        <!-- STEPS COUNT -->
        <CardBox class="mb-6">
          <p class="font-bold text-xl uppercase mb-5">
            User Phone Number Input Flow Stats
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div
              v-for="item in dataSteps.SHARE"
              :key="item"
              class="col-span-1 flex flex-col items-center"
            >
              <p class="font-bold text-lg italic capitalize">
                {{ item.title }}
              </p>
              <p class="text-green-600 text-2xl font-bold">
                {{ item.data }}
              </p>
            </div>
          </div>
        </CardBox>
        <CardBox class="mb-6">
          <p class="font-bold text-xl uppercase mb-5">User Textl Link Stats</p>
          <div class="grid grid-cols-1 md:grid-cols-3">
            <div
              v-for="item in dataSteps.TWILIO"
              :key="item"
              class="col-span-1 flex flex-col items-center"
            >
              <p class="font-bold text-lg italic capitalize">
                {{ item.title }}
              </p>
              <p class="text-green-600 text-2xl font-bold">
                {{ item.data }}
              </p>
            </div>
          </div>
        </CardBox>

        <!-- STATS -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CardBox class="col-span-1 lg:col-span-2 mb-6">
            <p class="font-bold text-xl uppercase mb-5">Challenge Stats</p>
            <div class="grid grid-cols-3 grid-rows-2 gap-5">
              <div
                v-for="(value, key) in rate"
                :key="key"
                class="flex flex-col justify-center items-center"
              >
                <p class="text-xl italic font-bold pb-3">{{ rates[key] }}</p>
                <v-progress-circular
                  :rotate="360"
                  :size="100"
                  :width="15"
                  :model-value="value"
                  color="blue"
                >
                  {{ value.toFixed(2) }} %
                </v-progress-circular>
              </div>
            </div>
          </CardBox>
          <CardBox class="col-span-1 mb-6">
            <p class="font-bold text-xl mb-5 uppercase">Costs if you paid</p>
            <div class="grid grid-cols-2 gap-8">
              <div>
                <p class="italic font-bold">Impression</p>
                <p class="font-light text-green-500">
                  {{ formatNumber("impresion") }}
                </p>
              </div>
              <div>
                <p class="italic font-bold">Impressions</p>
                <p class="font-light text-blue-500">
                  {{ dataStats.total.impresion.toFixed(2) }}
                </p>
              </div>
              <div>
                <p class="italic font-bold">View</p>
                <p class="font-light text-green-500">
                  {{ formatNumber("views") }}
                </p>
              </div>
              <div>
                <p class="italic font-bold">Views</p>
                <p class="font-light text-blue-500">
                  {{ dataStats.total.views.toFixed(2) }}
                </p>
              </div>
              <div>
                <p class="italic font-bold">Share</p>
                <p class="font-light text-green-500">
                  {{ formatNumber("shares") }}
                </p>
              </div>
              <div>
                <p class="italic font-bold">Shares</p>
                <p class="font-light text-blue-500">
                  {{ dataStats.total.shares.toFixed(2) }}
                </p>
              </div>
            </div>
          </CardBox>
        </div>

        <!-- SOCIAL NETWORK TABLE -->
        <CardBox class="mb-6">
          <table>
            <thead>
              <tr>
                <th></th>
                <th v-for="(value, key) in Object.keys(RRSS)" :key="key">
                  <img class="w-8 h-8" :src="host + RRSS[value]" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <p class="text-center font-bold italic uppercase py-3">
                  Impressions
                </p>
                <td v-for="(value, key) in Object.keys(RRSS)" :key="key">
                  {{
                    dataStats[value]?.impresion ? dataStats[value].impresion : 0
                  }}
                </td>
              </tr>
              <tr>
                <p class="text-center font-bold italic uppercase py-3">Views</p>
                <td v-for="(value, key) in Object.keys(RRSS)" :key="key">
                  {{ dataStats[value]?.views ? dataStats[value].views : 0 }}
                </td>
              </tr>
              <tr>
                <p class="text-center font-bold italic uppercase py-3">
                  Shares
                </p>
                <td v-for="(value, key) in Object.keys(RRSS)" :key="key">
                  {{ dataStats[value]?.shares ? dataStats[value].shares : 0 }}
                </td>
              </tr>
            </tbody>
          </table>
        </CardBox>

        <CardBox class="mb-6">
          <p class="font-bold text-xl uppercase mb-5">Members Data</p>
          <v-dialog v-model="isModalActive" width="auto">
            <v-card>
              <v-card-title class="text-h5 ml-2"> Detail </v-card-title>
              <v-card-text>
                <div className="w-80 relative my-0 m-auto ">
                  <img
                    v-if="!checkFile(selectedUser.url)"
                    :src="host + selectedUser.url"
                    class="miniPlayer"
                  />
                  <video
                    v-else
                    :src="host + selectedUser.url"
                    class="w-full h-full object-cover rounded-lg shadow-2xl object-center"
                    style="max-width: 300px"
                    autoplay
                    loop
                    controls
                  ></video>
                  <div
                    className="flex gap-3 items-start absolute bottom-0 p-4 "
                  >
                    <img
                      className="w-[50px] h-[50px] rounded-full"
                      :src="host + selectedUser.user.imagen"
                      alt=""
                    />
                    <div>
                      <p className="text-white font-semibold text-[15px]">
                        {{ selectedUser.user.firstName }}
                      </p>
                      <p className="text-white font-semibold text-[15px]">
                        Sway Score: {{ swayScore }}
                      </p>
                    </div>
                  </div>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  class="mr-2"
                  color="red-darken-1"
                  variant="text"
                  @click="isModalActive = false"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <div
            v-if="checkedRows.length"
            class="p-3 bg-gray-100/50 dark:bg-slate-800"
          >
            <span
              v-for="checkedRow in checkedRows"
              :key="checkedRow.id"
              class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-slate-700"
            >
              {{ checkedRow.name }}
            </span>
          </div>

          <table>
            <thead>
              <tr>
                <th />
                <th>Name</th>
                <th>Status</th>
                <th v-if="sessionStore.getUserRole() == 'admin'">
                  Phone Number
                </th>
                <th>Created</th>
                <th>Challenge</th>
                <th>Detail</th>
                <!-- <th>More Info</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="client in itemsPaginated" :key="client.id">
                <TableCheckboxCell @checked="checked($event, client)" />
                <TableCheckboxCell
                  v-if="checkable"
                  @checked="checked($event, client)"
                />
                <td data-label="Name">
                  {{ `${client.user.firstName}` }}
                </td>
                <td data-label="Status">
                  {{ statusShow(client.user.status) }}
                </td>
                <td v-if="sessionStore.getUserRole() == 'admin'">
                  {{ client.user.phone }}
                </td>

                <td data-label="Created">
                  {{ UtilityMehods.formatDate(client.user.createdAt) }}
                </td>
                <td>
                  <img
                    v-if="!checkFile(client.url)"
                    :src="host + client.url"
                    class="miniPlayer"
                    style="max-width: 80px"
                  />
                  <video
                    v-else
                    :src="host + client.url"
                    class="miniPlayer"
                    style="max-width: 80px"
                    controls
                  ></video>
                </td>
                <td data-label="Sway Score" class="lg:w-32">
                  <div
                    class="flex flex-column justify-space-between"
                    style="height: 100px; align-items: flex-start"
                  >
                    <BaseButtons
                      type="justify-center lg:justify-end -mb-3"
                      no-wrap
                    >
                      <BaseButton
                        color="info"
                        :icon="mdiInformation"
                        small
                        @click="onClickSelectedUser(client)"
                      />
                    </BaseButtons>
                    <BaseButtons
                      type="justify-center lg:justify-end -mb-3"
                      no-wrap
                    >
                      <BaseButton
                        color="info"
                        :icon="mdiGift"
                        small
                        @click="openRewardModal(client)"
                      />
                    </BaseButtons>
                  </div>

                  <!-- <p class="italic font-bold">{{ client.user.pointsCount }}</p>
                <progress
                  class="flex w-2/5 self-center lg:w-full"
                  max="100"
                  :value="client.user.pointsCount"
                > -->
                  <!-- {{ client.userChallenges }} -->
                  <!-- </progress> -->
                </td>
              </tr>
            </tbody>
          </table>
          <div
            class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800"
          >
            <BaseLevel>
              <v-pagination
                :length="pagesList.length"
                color="black"
                :total-visible="10"
                v-model="currentPage"
              ></v-pagination>
            </BaseLevel>
          </div>
        </CardBox>
      </SectionMain>
      <v-snackbar v-model="snackbar" :timeout="3000" color="blue">
        <p class="text-xl italic font-bold">New Challenge has been added</p>

        <template v-slot:actions>
          <v-btn color="white" variant="text" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
    <div v-else class="flex align-center justify-center h-screen">
      <LoadingSpinner></LoadingSpinner>
    </div>
  </LayoutAuthenticated>
</template>
