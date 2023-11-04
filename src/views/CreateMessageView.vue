<script setup>
import { reactive, ref } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiAccount,
  mdiAccountGroup,
  mdiArrowLeftDropCircle,
  mdiHandCoinOutline,
  mdiInformation,
  mdiMail,
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
import { useAlertStore } from "@/stores/alerts.js";
import { useSessionStore } from "@/stores/session.js";
import UserController from "@/controllers/UserController";

const alertStore = useAlertStore();
const sessionStore = useSessionStore();

const typeMessage = [
  { id: 1, label: "Manual" },
  { id: 2, label: "Date" },
  { id: 3, label: "Achievement" },
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

const dateMessage = ref();
const form = reactive({
  name: "",
  sendMessage: typeMessage[0],
  certainTime: certainTimeOptions[0],
  certainTimeCustom: 0,
  time: timeOptions[0],
  subject: "",
  message: "",
});

const submitProfile = async () => {
  let userId = sessionStore.getUserId();
  let userRole = sessionStore.getUserRole();
  let amount = 1;

  if (userRole != "admin") amount = await UserController.getCredit(userId);

  if (amount > 0) {
    // validate if you have sufficient credits
    mainStore.setUser(profileForm);
  } else {
    // insufficient credits
    alertStore.createAlert({
      title: "Insufficient credits",
      color: "error",
      icon: "$warning",
      text: "Acquire more credits to create a message",
    });
  }
};

const submitPass = () => {
  //
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
          <p class="font-extrabold">Create Message</p>
        </div>
      </div>

      <CardBox is-form class="col-span-3" @submit.prevent="submitProfile">
        <div class="gap-3">
          <FormField label="Name">
            <FormControl v-model="form.name" :icon="mdiAccount" required />
          </FormField>

          <FormField label="Send Message">
            <FormControl v-model="form.sendMessage" :options="typeMessage" />
          </FormField>

          <FormField v-if="form.sendMessage.id == 2" label="Select Date">
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
                <FormControl v-model="form.time" :options="timeOptions" />
              </FormField>
            </div>
          </div>

          <FormField label="Subject">
            <FormControl v-model="form.subject" :icon="mdiHandCoinOutline" />
          </FormField>

          <FormField label="Message">
            <FormControl v-model="form.message" :icon="mdiHandCoinOutline" />
          </FormField>
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
