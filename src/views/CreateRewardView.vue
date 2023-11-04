<script setup>
import { reactive, ref } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiAccount,
  mdiAccountGroup,
  mdiArrowLeftDropCircle,
  mdiBullseye,
  mdiHandCoinOutline,
  mdiInformation,
  mdiMail,
  mdiTextBox,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import UserCard from "@/components/UserCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { ColorPicker } from "vue-color-kit";
import "vue-color-kit/dist/vue-color-kit.css";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import UtilityMethods from "@/utility/utilityMethods";
import RewardController from "@/controllers/RewardController";
import { useAlertStore } from "@/stores/alerts.js";
import { useSessionStore } from "@/stores/session.js";
import UserController from "@/controllers/UserController";

const alertStore = useAlertStore();
const sessionStore = useSessionStore();
const store = useMainStore();
const backgroundUrl = ref();
const badgeUrl = ref();
const sendRewardOptions = [
  { id: 1, label: "Manual" },
  /*   { id: 2, label: "Date" },
  { id: 3, label: "Achievement" }, */
];

const certainTimeOptions = [
  { id: 1, label: "One Day" },
  { id: 2, label: "Two Days" },
  { id: 3, label: "A Week" },
  { id: 4, label: "A Month" },
  { id: 5, label: "Custom" },
];

const timeOptions = [
  { id: 1, label: "Minutes" },
  { id: 2, label: "Hours" },
  { id: 3, label: "Days" },
  { id: 4, label: "Weeks" },
  { id: 5, label: "Months" },
];

const typeRewardOptions = [
  { id: 1, label: "LightBeat" },
  { id: 2, label: "Graphics" },
  { id: 3, label: "UPC Code" },
  { id: 4, label: "QR Code" },
];

const dateReward = ref();
const form = ref({
  title: "",
  description: "",
  type: typeRewardOptions[0],
  point: "",
  sendReward: sendRewardOptions[0],
  certainTime: certainTimeOptions[0],
  certainTimeCustom: 0,
  hubEmail: false,
});
const handleBackgroundUrl = (newValue) => {
  backgroundUrl.value = newValue;
};
const handleBadgeUrl = (newValue) => {
  badgeUrl.value = newValue;
};
const submitProfile = async () => {
  let userId = sessionStore.getUserId();
  let userRole = sessionStore.getUserRole();
  let amount = 1;

  if (userRole != "admin") amount = await UserController.getCredit(userId);

  if (amount > 0) {
    // validate if you have sufficient credits
    let backgroundMedia = "";
    if (backgroundUrl) {
      backgroundMedia = await UtilityMethods.verifyMedia(
        backgroundUrl.value,
        "rewards"
      );
    }

    let badgeMedia = "";
    if (badgeUrl) {
      badgeMedia = await UtilityMethods.verifyMedia(badgeUrl.value, "rewards");
    }

    let rewardData = {
      title: form.value.title,
      description: form.value.description,
      type: form.value.type.label,
      point: form.value.point,
      imgBgReward: backgroundMedia,
      imgBadReward: badgeMedia,
    };

    await RewardController.create(rewardData, "Reward");
    // store.setUser(form);

  } else {
    // insufficient credits
    alertStore.createAlert({
      title: "Insufficient credits",
      color: "error",
      icon: "$warning",
      text: "Acquire more credits to create a reward",
    });
  }
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="flex justify-between pb-5">
        <div class="flex gap-2 items-center">
          <BaseButton
            :icon="mdiArrowLeftDropCircle"
            to="/rewards-messages"
            color="info"
            rounded-full
            small
          />
          <p class="font-extrabold">Create Reward</p>
        </div>
      </div>

      <CardBox is-form class="col-span-3" @submit.prevent="submitProfile">
        <div class="gap-3">
          <FormField label="Reward Name">
            <FormControl v-model="form.title" :icon="mdiAccount" required />
          </FormField>

          <FormField label="Reward Description">
            <FormControl
              v-model="form.description"
              :icon="mdiTextBox"
              required
            />
          </FormField>

          <FormField label="Reward Points">
            <FormControl v-model="form.point" :icon="mdiBullseye" />
          </FormField>

          <FormField label="Send Reward">
            <FormControl
              v-model="form.sendReward"
              :options="sendRewardOptions"
            />
          </FormField>

          <FormField v-if="form.sendReward.id == 2" label="Select Date">
            <Datepicker v-model="dateMessage" />
          </FormField>

          <FormField label="Afeter Certain Time">
            <FormControl
              v-model="form.certainTime"
              :options="certainTimeOptions"
            />
          </FormField>

          <div v-if="form.certainTime.id == 5" class="grid grid-cols-5 gap-5">
            <div class="col-span-3">
              <FormField label="After Certain Time Custom">
                <FormControl v-model="form.certainTimeCustom" type="number" />
              </FormField>
            </div>

            <div class="col-span-2">
              <FormField label="Time">
                <FormControl
                  v-model="form.certainTime"
                  :options="certainTimeOptions"
                />
              </FormField>
            </div>
          </div>

          <FormField label="Reward Type">
            <FormControl v-model="form.type" :options="typeRewardOptions" />
          </FormField>

          <FormField>
            <FormCheckRadio label="Hubspot Email" v-model="form.hubEmail" />
          </FormField>

          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-5 justify-items-center"
          >
            <FormField label="Background Image">
              <FormFilePicker
                label="Upload"
                :modelValue="backgroundUrl"
                v-on:update:model-value="handleBackgroundUrl"
              />
            </FormField>

            <FormField label="Reward Icon">
              <FormFilePicker
                label="Upload"
                :modelValue="badgeUrl"
                v-on:update:model-value="handleBadgeUrl"
              />
            </FormField>
          </div>
        </div>
        <template #footer>
          <BaseButtons class="justify-end">
            <BaseButton color="info" type="submit" label="Save" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
