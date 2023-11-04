<script setup>
import { reactive, ref, watchEffect } from "vue";
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
import CampaignsController from "@/controllers/ChallengeController";
import MessageController from "@/controllers/MessageController";

const typeMessage = [
  { id: 1, label: "Manual" },
  { id: 2, label: "Date" },
  { id: 3, label: "Achievement" },
];

watchEffect(() => {
  CampaignsController.getAll().then((data) => {
    data.forEach((challenge) => {
      challengeList.value.push({ id: challenge.id, label: challenge.name });
    });
  });
});

const challengeList = ref([]);
const snackbar = ref(false);
const form = reactive({
  challenge: challengeList[0],
  message: "",
  test: true,
  link: false,
});

const send = () => {
  MessageController.sendComunity(form).then((data) => {
    snackbar.value = true;
    form.message = "";
  });
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="flex justify-between pb-5">
        <div class="flex gap-2 items-center">
          <BaseButton
            :icon="mdiArrowLeftDropCircle"
            to="/dashboard"
            color="info"
            rounded-full
            small
          />
          <p class="lg:text-xl text-lg">Comunity Message</p>
        </div>
      </div>

      <CardBox is-form class="col-span-3" @submit.prevent="send">
        <div class="gap-3">
          <FormField label="Challenge">
            <FormControl
              v-model="form.challenge"
              value="Select challenge"
              :options="challengeList"
            />
          </FormField>

          <FormField>
            <div class="flex flex-col md:flex-row gap-5">
              <FormCheckRadio label="Test Message?" v-model="form.test" />
              <FormCheckRadio label="Sen Challenge Link?" v-model="form.link" />
            </div>
          </FormField>

          <FormField label="Message">
            <FormControl textarea v-model="form.message" />
          </FormField>
        </div>
        <template #footer>
          <BaseButtons class="justify-end">
            <BaseButton color="info" type="submit" label="Save" />
          </BaseButtons>
        </template> </CardBox
      ><v-snackbar v-model="snackbar" :timeout="3000" color="green">
        <p class="text-lg italic font-bold">Mensaje Enviado</p>

        <template v-slot:actions>
          <v-btn color="white" variant="text" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </SectionMain>
  </LayoutAuthenticated>
</template>
