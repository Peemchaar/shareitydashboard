<script setup>
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutSpecial from "@/layouts/LayoutSpecial.vue";
import SectionMain from "@/components/SectionMain.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { onBeforeMount, reactive, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import ChallengeController from "@/controllers/ChallengeController";

// const socket = io("localhost:3000/my-event2", { transports: ["pooling"] });
// console.log("io", socket);
// const msgList = ref([]);
// const newMessage = () => {
//   socket.emit("message", { data: "Mensaje" });
// };

// socket.on("message", ({ data }) => {
//   handleNewMessage(data);
// });

// const handleNewMessage = (message) => {
//   msgList.value.push(message);
// };

// socket.onopen = function (e) {
//   console.log("[open] Connection established");
//   console.loog("Sending to server");
//   socket.send("My name is John");
// };

const host = import.meta.env.VITE_IMAGE_HOST;
const router = useRoute();
const dataChallenge = ref({ name: "hola" });
const allChallenges = ref([]);
const challengesFeedMain = ref();
const challengesFeed = ref([]);
const lastChallenge = ref();
// const challengeCount = ref();
const snackbar = ref(false);

watchEffect(() => {
  // console.log("id", router.query.id);
  ChallengeController.getChallenges(router.query.id).then((data) => {
    console.log("data", data);
    dataChallenge.value = data;
    allChallenges.value = data.userChallenges;
    challengesFeed.value = data.userChallenges.filter(
      (value) => value.user.firstName !== "Unknown"
    );
    // challengeCount.value = data.userChallenges.length;
    challengesFeedMain.value = challengesFeed.value.shift();
    lastChallenge.value = JSON.parse(JSON.stringify(allChallenges.value[0].id));
  });
}, [router.query.id]);

function getChallenges() {
  console.log("last", lastChallenge.value);
  ChallengeController.getChallengesUpdate(lastChallenge.value).then((data) => {
    console.log("data-2", data);
    // console.log("len", challengeCount.value);
    if (data.length >= 1) {
      snackbar.value = true;
      allChallenges.value.unshift(data);
      challengesFeed.value = allChallenges.value.filter(
        (value) => value.user.firstName !== "Unknown"
      );
      challengesFeedMain.value = challengesFeed.value.shift();

      snackbar.value = true;
    }
  });
  setTimeout(getChallenges, 30000);
}
getChallenges();
</script>

<template>
  <LayoutSpecial>
    <!-- <div>
      <ul>
        <li v-for="(msg, i) in msgList" :key="i">{msg}</li>
      </ul>
      <button @click="newMessage()">mensaje</button>
    </div> -->
    <div
      v-if="dataChallenge.badge"
      class="grid grid-cols-1 justify-items-center"
    >
      <SectionMain class="col-span-1">
        <CardBox>
          <div class="flex items-center">
            <div class="rounded-lg shadow-md">
              <img class="w-28" :src="host + dataChallenge.badge" alt="" />
            </div>
            <div class="flex flex-col ml-5 gap-3">
              <p class="font-extrabold text-4xl">
                {{ dataChallenge.name }}
              </p>
              <p class="text-lg font-light pr-10">
                {{ dataChallenge.description }}
              </p>
            </div>
          </div>
        </CardBox>
        <!-- <CardBox class="text-center items-center">
          <p class="text-4xl text-gray-600 font-extrabold">HUG ME CHALLENGE</p>

          <div
            class="flex flex-col items-center py-4 my-6 rounded-xl shadow-xl bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600"
          >
            <p class="font-bold text-white text-2xl">TOTAL TREE PLANTED:</p>
            <div class="rounded-xl shadow-xl bg-white my-3">
              <p class="font-bold text-3xl text-black mx-8 my-6">22</p>
            </div>
          </div>

          <p class="text-3xl text-gray-600 font-bold">IMPACT BY CHALLENGE</p>

          <div class="grid grid-cols-4 gap-4">
            <div
              class="flex flex-col items-center py-1 px-3 my-7 rounded-xl shadow-xl bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600"
            >
              <div class="rounded-lg shadow-xl bg-white my-3">
                <p class="font-extrabold text-2xl text-black mx-4 my-3">22</p>
              </div>
              <div class="h-12 w-12 bg-pink-400 mb-3"></div>
            </div>
            <div
              class="flex flex-col items-center py-1 px-3 my-7 rounded-xl shadow-xl bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600"
            >
              <div class="rounded-lg shadow-xl bg-white my-3">
                <p class="font-extrabold text-2xl text-black mx-4 my-3">22</p>
              </div>
              <div class="h-12 w-12 bg-pink-400 mb-3"></div>
            </div>
            <div
              class="flex flex-col items-center py-1 px-3 my-7 rounded-xl shadow-xl bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600"
            >
              <div class="rounded-lg shadow-xl bg-white my-3">
                <p class="font-extrabold text-2xl text-black mx-4 my-3">22</p>
              </div>
              <div class="h-12 w-12 bg-pink-400 mb-3"></div>
            </div>
            <div
              class="flex flex-col items-center py-1 px-3 my-7 rounded-xl shadow-xl bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600"
            >
              <div class="rounded-lg shadow-xl bg-white my-3">
                <p class="font-extrabold text-2xl text-black mx-4 my-3">22</p>
              </div>
              <div class="h-12 w-12 bg-pink-400 mb-3"></div>
            </div>
          </div> </CardBox
      > -->
      </SectionMain>

      <div class="col-span-1 min-w-full">
        <SectionMain>
          <CardBox>
            <p class="text-center text-gray-600 mb-6 text-4xl font-extrabold">
              LIVE FEED
            </p>
            <div class="overflow-y-auto h-[74vh] content-center">
              <div
                class="flex flex-col ml-[20%] justify-between w-3/5 rounded-lg shadow-xl"
              >
                <div class="flex bg-blue-800 rounded-t-lg p-3">
                  <div class="rounded-full w-14 h-12 bg-red-200 mr-3">
                    <!-- <img :src="host + challengesFeedMain.user.imagen" alt="" /> -->
                  </div>
                  <div class="flex w-full flex-col">
                    <p class="text-white text-lg font-bold">
                      {{ `${challengesFeedMain.user.firstName}` }}
                    </p>
                    <div class="flex w-full justify-between">
                      <div class="flex flex-col text-left">
                        <!-- <p class="text-white text-md">
                          <b>Sway:</b><span class="text-blue-300"> 25</span>
                        </p> -->
                        <p class="text-white text-md">
                          <b>Points:</b>
                          <span class="text-blue-300">
                            {{ challengesFeedMain.pointsCount }}</span
                          >
                        </p>
                      </div>
                      <!-- <div class="flex flex-col text-right">
                        <p class="text-white text-md">
                          <b>This Cause:</b>
                          <span class="text-blue-300"> 25</span>
                        </p>
                        <p class="text-white text-md">
                          <b>All Causes:</b>
                          <span class="text-blue-300">
                            {{ ` ${challengesFeedMain.user.pointCount}` }}</span
                          >
                        </p>
                      </div> -->
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-center rounded-b-xl">
                  <video
                    class="h-[30rem]"
                    autoplay
                    loop
                    :poster="host + challengesFeedMain.photoUrl"
                    controls
                    :src="host + challengesFeedMain.url"
                  ></video>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4 mt-5">
                <div
                  v-for="challenge in challengesFeed"
                  class="rounded-lg shadow-xl"
                  :key="challenge.id"
                >
                  <div class="flex bg-blue-800 rounded-t-lg p-3">
                    <div class="rounded-full w-14 h-12 bg-red-200 mr-3">
                      <!-- <img :src="host + challengesFeedMain.user.imagen" alt="" /> -->
                    </div>
                    <div class="flex w-full flex-col">
                      <p class="text-white text-lg font-bold">
                        {{ `${challenge.user.firstName}` }}
                      </p>
                      <div class="flex w-full justify-between">
                        <div class="flex flex-col text-left">
                          <!-- <p class="text-white text-xs">
                            <b>Sway:</b><span class="text-blue-300"> 25</span>
                          </p> -->
                          <p class="text-white text-xs">
                            <b>Points:</b>
                            <span class="text-blue-300">
                              {{ ` ${challenge.user.pointCount}` }}
                            </span>
                          </p>
                        </div>
                        <!-- <div class="flex flex-col text-right">
                          <p class="text-white text-xs">
                            <b>This Cause:</b>
                            <span class="text-blue-300"> 25</span>
                          </p>
                          <p class="text-white text-xs">
                            <b>All Causes:</b>
                            <span class="text-blue-300">
                              {{ ` ${challenge.pointsCount}` }}
                            </span>
                          </p>
                        </div> -->
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-center items-center">
                    <video
                      class="h-[26rem]"
                      loop
                      :poster="host + challenge.photoUrl"
                      controls
                      :src="host + challenge.url"
                    ></video>
                  </div>
                </div>
              </div>
            </div> </CardBox
        ></SectionMain>
      </div>
    </div>
    <v-snackbar v-model="snackbar" :timeout="3000" color="blue">
      <p class="text-xl italic font-bold">New Challenge has been added</p>

      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </LayoutSpecial>
</template>
