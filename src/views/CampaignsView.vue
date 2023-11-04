<script setup>
import { onBeforeMount, computed, ref } from "vue";
import { mdiBallotOutline, mdiArrowLeftDropCircle, mdiPlus } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import BaseButton from "@/components/BaseButton.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import ChallengeController from "../controllers/ChallengeController";
import { useRouter } from "vue-router";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { useSessionStore } from "@/stores/session.js";
import SponsorController from "@/controllers/SponsorController";
import UserController from "@/controllers/UserController";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";

const sessionStore = useSessionStore();
const host = import.meta.env.VITE_IMAGE_HOST;
const challenges = ref([]);
const sponsorData = ref([]);
const loading = ref(Boolean);
const user = ref({});
const searchName = ref("");
const filterData = computed(() => searchData());

function searchData() {
  return challenges.value.filter((challenge) =>
    challenge.name.includes(searchName.value)
  );
}
onBeforeMount(async () => {
  loading.value = true;
  const challengeList = await ChallengeController.getAll();
  const role = sessionStore.getUserRole();
  const nickName = sessionStore.getUserNickname();
  if (role == "admin") {
    challenges.value = challengeList;
    loading.value = false;
  } else {
    if (role == "sponsor") {
      await SponsorController.getByUserId(parseInt(sessionStore.getUserId()))
        .then((data) => {
          sponsorData.value = data;
          let filteredChallenges = [];

          challengeList.forEach((challenge) => {
            if (challenge.id === 361) {
              console.log("challenge.sponsor", challenge.sponsors);
              console.log("sponsorData.value", sponsorData.value);
            }
            if (
              challenge.sponsors.reduce(
                (pv, cv) => pv || cv.sponsor?.id == sponsorData.value.id,
                false
              ) ||
              challenge.user?.id == parseInt(sessionStore.getUserId())
            ) {
              filteredChallenges.push(challenge);
            }
          });
          challenges.value = filteredChallenges;
          loading.value = false;
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
    if (role == "cause") {
      user.value = await UserController.userAction(nickName);
      let filteredChallenges = [];
      challengeList.forEach((challenge) => {
        console.log("organization", challenge.organization?.id);
        if (
          challenge.organization?.id == user.value.organization.id ||
          challenge.user?.id == parseInt(sessionStore.getUserId())
        ) {
          filteredChallenges.push(challenge);
        }
      });
      challenges.value = filteredChallenges;
      loading.value = false;
    }
  }
});

const router = useRouter();

function goView(id, message, view) {
  localStorage.setItem("shareMessage", message);
  router.push({
    name: view,
    query: {
      id: id,
    },
  });
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="flex justify-between pb-5">
        <div class="flex gap-2 items-center">
          <BaseButton
            to="/dashboard"
            :icon="mdiArrowLeftDropCircle"
            color="info"
            rounded-full
            small
          />
          <p class="lg:text-xl text-lg">Campaings</p>
        </div>
        <div class="flex gap-2 items-center edit-search">
          <FormField>
            <FormControl
              v-model="searchName"
              :icon="mdiAccountBox"
              value="Search"
            />
          </FormField>
          <BaseButton
            class="mr-5"
            label="Add Challenge"
            color="info"
            :icon="mdiPlus"
            to="/create-challenge"
          />
        </div>
      </div>
      <div
        v-if="!loading && challenges.length == 0"
        class="grid min-w-[50%] gap-6 mb-6"
      >
        <CardBoxWidget
          :icon="mdiCartOutline"
          label="It seems that there are no campaings related to you yet :("
          content='You can create a challenge by clicking on the "+ Add Challenge" button!!'
        />
      </div>
      <div
        v-if="!loading && challenges.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
      >
        <CardBox v-for="challenge in filterData" :key="challenge.id">
          <CardBoxComponentTitle title="With title & icon">
            <div class="flex justify-between mb-2">
              <p class="font-extrabold text-lg">{{ challenge.name }}</p>
              <!-- <FormCheckRadio type="switch" /> -->
            </div>
          </CardBoxComponentTitle>
          <div class="flex grid-cols-3">
            <img
              class="col-span-1 mr-3"
              :src="host + challenge.badge"
              style="height: 64px; width: 64px"
            />
            <p class="text-sm font-light col-span-2">
              {{ challenge.description }}
            </p>
          </div>

          <template #footer>
            <div class="flex flex-col">
              <div class="flex flex-row justify-around">
                <!-- <div class="flex flex-col">
                  <h2 class="font-extrabold">CAUSE</h2>
                  <p class="text-sm font-light">Data de la causa</p>
                </div>
                <div class="flex flex-col ml-2">
                  <h2 class="font-extrabold">SPONSOR</h2>
                  <p class="text-sm font-light">Data del sponsor</p>
                </div> -->
              </div>
              <div class="flex justify-end gap-3">
                <BaseButton
                  class="mt-3 text-lg font-bold"
                  small
                  label="Show Info"
                  color="success"
                  @click="
                    goView(
                      challenge.id,
                      challenge.shareMessageShort,
                      'challenge-info'
                    )
                  "
                />
                <BaseButton
                  class="mt-3 text-lg font-bold italic"
                  small
                  label="Go Live"
                  color="info"
                  @click="
                    goView(
                      challenge.id,
                      challenge.shareMessageShort,
                      'presentation'
                    )
                  "
                />
              </div>
            </div>
          </template>
        </CardBox>
      </div>
      <div v-if="loading" class="flex align-center justify-center h-screen">
        <LoadingSpinner></LoadingSpinner>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
<style scoped>
.edit-search > .mb-6 {
  margin-bottom: 0px !important;
}
</style>
