<script setup>
import { onBeforeMount, reactive, ref, watchEffect } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiAccount,
  mdiAccountBox,
  mdiAccountGroup,
  mdiArrowLeftDropCircle,
  mdiAt,
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
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import "vue-color-kit/dist/vue-color-kit.css";
import "@vuepic/vue-datepicker/dist/main.css";
import { useRoute } from "vue-router";
import SponsorController from "@/controllers/SponsorController";
import UtilityMethods from "@/utility/utilityMethods";

const router = useRoute();
const host = import.meta.env.VITE_IMAGE_HOST;
const snackbar = ref(false);
const logo = ref();
const form = reactive({
  name: "",
  personEmail: "",
  personName: "",
  personLastname: "",
  logo: "",
  status: false,
});
const snack = reactive({
  color: "green",
  message: "",
});

const title = router.query.id ? "Edit" : "Create";

const handleLogo = (newValue) => {
  logo.value = newValue;
};

watchEffect(() => {
  SponsorController.getById(router.query.id).then((data) => {
    form.name = data.name;
    form.personEmail = data.personEmail;
    form.personName = data.personName;
    form.personLastname = data.personLastname;
    logo.value = host + data.logo;
  });
}, [router.query.id]);
const submit = async () => {
  if (typeof logo.value != "string") {
    let logoMedia = await UtilityMethods.verifyMedia(logo.value, "sponsors");
    logo.value = host + logoMedia;
    form.logo = logoMedia;
  }
  if (router.query.id) {
    let inp = JSON.parse(JSON.stringify(form));
    SponsorController.update(router.query.id, inp).then((data) => {
      if (data.statusCode == 200) {
        snackbar.value = true;
        snack.message = "Sponsor Updated";
      } else {
        snackbar.value = true;
        snack.message = data.message[0];
      }
    });
  } else {
    let inp = JSON.parse(JSON.stringify(form));
    console.log("inp", inp);
    SponsorController.create(inp).then((data) => {
      if (data.statusCode == 200) {
        snackbar.value = true;
        snack.message = "Sponsor Created";
      } else {
        snackbar.value = true;
        snack.message = data.message[0];
      }
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
            to="/sponsors"
            :icon="mdiArrowLeftDropCircle"
            color="info"
            rounded-full
            small
          />
          <p class="font-extrabold">{{ title }} Sponsor</p>
        </div>
      </div>

      <CardBox is-form class="col-span-3" @submit.prevent="submit">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField label="Organization Name">
            <FormControl v-model="form.name" :icon="mdiAccount" required />
          </FormField>

          <FormField label="Contact Person Email">
            <FormControl
              v-model="form.personEmail"
              :icon="mdiAt"
              type="email"
              name="email"
              required
              autocomplete="email"
              label="data"
            />
          </FormField>

          <FormField label="Contact Person First Name">
            <FormControl v-model="form.personName" :icon="mdiAccountBox" />
          </FormField>

          <FormField label="Contact Person Last Name">
            <FormControl v-model="form.personLastname" :icon="mdiAccountBox" />
          </FormField>

          <FormField label="Select Sponsor Logo">
            <FormFilePicker
              :modelValue="logo"
              v-on:update:model-value="handleLogo"
              label="Upload"
              mediaClass="w-52 h-52"
            />
          </FormField>
        </div>
        <template #footer>
          <BaseButtons class="justify-end">
            <BaseButton color="info" type="submit" label="Save" />
          </BaseButtons>
        </template>
      </CardBox>
      <v-snackbar v-model="snackbar" :timeout="3000" :color="snack.color">
        <p class="text-lg italic font-bold">{{ snack.message }}</p>
        <template v-slot:actions>
          <v-btn color="white" variant="text" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </SectionMain>
  </LayoutAuthenticated>
</template>
