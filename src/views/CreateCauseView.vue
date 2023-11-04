<script setup>
import { reactive, ref, watchEffect } from "vue";
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
import { useSessionStore } from "@/stores/session.js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import "@vuepic/vue-datepicker/dist/main.css";
import { useRoute } from "vue-router";
import OrganizationController from "@/controllers/OrganizationController";
import UtilityMethods from "@/utility/utilityMethods";
import { ColorPicker } from "vue-color-kit";
import "vue-color-kit/dist/vue-color-kit.css";

let store = useSessionStore();
const role = store.getUserRole()
const host = import.meta.env.VITE_IMAGE_HOST;
const logo = ref();
const snackbar = ref(false);
const picker = reactive({
  showcolorpicker: false,
  color: "#59c7f9",
  suckerCanvas: null,
  suckerArea: [],
  isSucking: false,
});
const form = reactive({
  name: "",
  personEmail: "",
  personFirstname: "",
  personLastname: "",
  logo: "",
  description: "",
  donationLink: "",
  color: picker.color,
});
const snack = reactive({
  color: "green",
  message: "",
});

const router = useRoute();

const title = router.query.id ? "Edit" : "Create";

const changeColor = (color) => {
  picker.color = color.hex;
};

const handleLogoUrl = (newValue) => {
  logo.value = newValue;
};

watchEffect(() => {
  OrganizationController.getById(router.query.id).then((data) => {
    form.name = data.name;
    form.personEmail = data.personEmail;
    form.personLastname = data.personLastname;
    logo.value = host + data.logo;
  });
}, [router.query.id]);

const submit = async () => {
  let logoMedia = await UtilityMethods.verifyMedia(
      logo.value,
      "organization"
    );
  if (router.query.id) {
    form.logo = logoMedia;
    let organizationData = {
      name: form.name,
      personEmail: form.personEmail,
      personFirstname: form.personFirstname,
      personLastname: form.personLastname,
      logo: form.logo,
      description: form.description,
      donationLink: form.donationLink,
      color: form.color,
    }
    OrganizationController.update(router.query.id,organizationData).then((data) => {
      if (data.statusCode == 200) {
        snackbar.value = true;
        snack.message = "Cause Updated";
        if(role == 'cause'){
          router.push({
            name: "dashboard",
          });
        }else{
          router.push({
            name: "causes",
          });
        }

      } else {
        snackbar.value = true;
        snack.message = data.message[0];
      }
    });
  } else {
    form.logo = logoMedia;
    let inp = JSON.parse(JSON.stringify(form));
    OrganizationController.create(inp).then((data) => {
      if (data.statusCode == 200) {
        snackbar.value = true;
        snack.message = "Cause Created";
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
            to="/causes"
            :icon="mdiArrowLeftDropCircle"
            color="info"
            rounded-full
            small
          />
          <p class="lg:text-xl text-lg">{{ title }} Cause</p>
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
            <FormControl v-model="form.personFirstname" :icon="mdiAccountBox" />
          </FormField>

          <FormField label="Contact Person Last Name">
            <FormControl v-model="form.personLastname" :icon="mdiAccountBox" />
          </FormField>
          <FormField label="Organization Description">
            <FormControl v-model="form.description" :icon="mdiAccountBox" />
          </FormField>
          <FormField label="Donation link">
            <FormControl v-model="form.donationLink" :icon="mdiAccountBox" required/>
          </FormField>
          <FormField label="Organization Color">
            <div class="flex flex-row">
              <BaseButton
                @click="
                  picker.showcolorpicker = picker.showcolorpicker ? false : true
                "
                class="text-black w-full"
                label="Select Color"
              />
              <div
                class="ml-2 h-12 w-24 rounded-md"
                :style="{ background: picker.color }"
              ></div>
            </div>
            <div style="position: relative">
              <div v-show="picker.showcolorpicker" style="position: absolute">
                <ColorPicker
                  theme="light"
                  :color="picker.color"
                  :sucker-hide="false"
                  :sucker-canvas="picker.suckerCanvas"
                  :sucker-area="picker.suckerArea"
                  @changeColor="changeColor"
                  @openSucker="picker.openSucker"
                />
              </div>
            </div>
          </FormField>
          <FormField label="Select Cause Logo">
            <FormFilePicker
              :modelValue="logo"
              v-on:update:model-value="handleLogoUrl"
              label="Upload"
              mediaClass="h-52 w-52"
            />
          </FormField>
          <div class="w-24 h-24">
            <img v-if="logo != null" :src="host + logo" alt="" />
          </div>
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
