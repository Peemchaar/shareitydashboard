<script setup>
import {
  mdiAccount,
  mdiAccountGroup,
  mdiHandCoinOutline,
  mdiInformation,
  mdiMail,
  mdiArrowLeftDropCircle,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
// import ColorPicker from "@/components/ColorPicker.vue";
import { ColorPicker } from "vue-color-kit";
import "vue-color-kit/dist/vue-color-kit.css";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import SponsorController from "@/controllers/SponsorController";
import AnimationController from "@/controllers/AnimationController";
import ChallengeController from "@/controllers/ChallengeController";
import { useRoute, useRouter } from "vue-router";
import OrganizationController from "@/controllers/OrganizationController";
import UtilityMethods from "@/utility/utilityMethods";
import { useAlertStore } from "@/stores/alerts.js";
import { useSessionStore } from "@/stores/session.js";
import UserController from "@/controllers/UserController";

const host = import.meta.env.VITE_IMAGE_HOST;
const route = useRoute();
const router = useRouter();
const challengeType = [
  { id: 1, label: "Picture" },
  { id: 2, label: "Selfie" },
  { id: 3, label: "Video" },
  { id: 4, label: "Audio" },
  { id: 5, label: "Game" },
  { id: 6, label: "Animation Image" },
  { id: 7, label: "Animation Video" },
  { id: 8, label: "Animation Share No Donate Image" },
  { id: 9, label: "Animation Share No Donate Video" },
  { id: 10, label: "No Donate Video" },
  { id: 11, label: "No Donate Meta Image" },
  { id: 12, label: "No Donate Meta Video" },
];

const inviteDonate = [
  { id: 1, label: "Yes" },
  { id: 2, label: "No" },
];

const challengeData = ref();
const startDate = ref();
const endDate = ref();
const lightbeatStartDate = ref();
const lightbeatEndDate = ref();
const sponsors = ref([]);
const animations = ref([]);
const organizations = ref([]);
const badge = ref();
const url = ref();
const animationUrl = ref();
const lightbeatDesign = ref();
const typeDonationIcon = ref();
const introduction = ref();
const animation = ref();
const customQr = ref();
const isLoading = ref(false);
const alertStore = useAlertStore();
const sessionStore = useSessionStore();

const form = reactive({
  name: "",
  description: "",
  amount: "",
  maxAmount: "",
  donateName: "",
  instructions: "",
  shareMessage: "",
  shareMessageShort: "",
  type: challengeType[0],
  organization: organizations[0],
  sponsor: sponsors[0],
  animation: animations[0],
  inviteDonate: inviteDonate[0],
  haveSponsor: false,
  typeDonation: false,
  typeDonationName: "",
  addLighBeat: false,
  reactions: false,
  addIntroduction: false,
  addInstructions: false,
  newAnimation: false,
  newAnimationName: "",
  newAnimationDuration: "",
});
const title = route.query.id ? "Edit" : "Create";

watchEffect(() => {
  SponsorController.getAll().then((data) => {
    let list = data.map((item) => {
      return { id: item.id, label: item.name };
    });
    sponsors.value = list;
    form.sponsor = list[0];
  });

  AnimationController.getAll().then((data) => {
    let list = data.map((item) => {
      return { id: item.id, label: item.name };
    });
    animations.value = list;
    form.animation = list[0];
  });
  OrganizationController.getAll().then((data) => {
    let list = data.map((item) => {
      return { id: item.id, label: item.name };
    });
    organizations.value = list;
    form.organization = list[0];
  });
  if (route.query.id)
    ChallengeController.getById(route.query.id).then((data) => {
      console.log("data-challenge: ", data);
      challengeData.value = data;
      form.badge = host + data.badge;
      form.url = host + data.url;
      typeDonationIcon.value = host + data.typeDonationIcon;
      startDate.value = data.startDate;
      endDate.value = data.endDate;
      form.name = data.name;
      form.description = data.description;
      form.amount = data.amount;
      form.maxAmount = data.maxAmount;
      form.donateName = data.donateName;
      form.instructions = data.instructions;
      form.shareMessage = data.shareMessage;
      form.shareMessageShort = data.shareMessageShort;
      form.type = challengeType.filter(
        (type) => type.id === data.resource.id
      )[0];
      form.organization = organizations.value.filter(
        (org) => org.id === data.organization.id
      )[0];
      form.sponsor =
        data.sponsors.length > 0
          ? sponsors.value.filter((spn) => spn.id === data.sponsors[0].id)[0]
          : null;
      form.typeDonationName = data.typeDonationDescription;
      form.inviteDonate =
        data.inviteDonate == 1 ? inviteDonate[0] : inviteDonate[1];
      form.haveSponsor = data.sponsors.length == 0;
      form.typeDonation = data.typeDonation === "object";
      form.addLighBeat = data.lightbeatStartDate ? true : false;
      form.reactions = data.reactions == 1;
      form.addInstructions = data.instructions != "";
    });
}, [route.query.id]);

const picker = reactive({
  showcolorpicker: false,
  color: "#59c7f9",
  suckerCanvas: null,
  suckerArea: [],
  isSucking: false,
});

const changeColor = (color) => {
  picker.color = color.hex;
};

const handleBadge = (newValue) => {
  console.log("newValue-create:", newValue);
  badge.value = newValue;
};
const handleUrl = (newValue) => {
  url.value = newValue;
};
const handleLightbeatDesign = (newValue) => {
  lightbeatDesign.value = newValue;
};
const handleTypeDonationIcon = (newValue) => {
  typeDonationIcon.value = newValue;
};
const handleIntroduction = (newValue) => {
  introduction.value = newValue;
};
const handleAnimation = (newValue) => {
  animation.value = newValue;
};
const handleAnimationUrl = (newValue) => {
  animationUrl.value = newValue;
};
const handleCustomQr = (newValue) => {
  customQr.value = newValue;
};

const test = async () => {
  alertStore.createAlert({
    title: "Challenge Created!",
    icon: "$success",
    text: "the challenge has been created successfully!",
  });
};

const submit = async () => {
  /*   await ChallengeController.createThumbnail(url.value).then((response)=>{
    console.log("RESPONSE Thumbnail: ", response)
  }); */
  isLoading.value = true;
  if (form.newAnimation) {
    let newAnimation = await UtilityMethods.verifyMedia(
      animationUrl.value,
      "animations"
    );
    let animationData = {
      recource: newAnimation,
      duration: form.newAnimationDuration,
      name: form.newAnimationName,
      format: newAnimation.split(".")[1],
    };
    form.animation = await AnimationController.create(animationData);
  }

  let lightbeatDesignMedia = "";
  if (form.addLighBeat) {
    lightbeatDesignMedia = await UtilityMethods.verifyMedia(
      lightbeatDesign.value,
      "challenges"
    );
  }

  let badgeMedia = await UtilityMethods.verifyMedia(badge.value, "challenges");
  console.log("pruebita", badge.value);
  let urlMedia = await UtilityMethods.verifyMedia(url.value, "challenges");

  let typeDonationIconMedia = "";
  if (form.typeDonation) {
    typeDonationIconMedia = await UtilityMethods.verifyMedia(
      typeDonationIcon.value,
      "challenges"
    );
  }

  let introductionMedia = "";
  if (form.addIntroduction) {
    introductionMedia = await UtilityMethods.verifyMedia(
      introduction.value,
      "challenges"
    );
  }

  let animationMedia = "";
  if (animation.value != undefined) {
    animationMedia = await UtilityMethods.verifyMedia(
      animation.value,
      "animations"
    );
  }

  let customQrMedia = "";
  if (customQr.value != undefined) {
    customQrMedia = await UtilityMethods.verifyMedia(
      customQr.value,
      "challenges"
    );
  }
  console.log("qr", customQrMedia);

  let challengeData = {
    name: form.name,
    description: form.description,
    startDate: startDate.value,
    endDate: endDate.value,
    amount: form.amount,
    inviteDonate: form.inviteDonate.id == 1,
    maxAmount: form.maxAmount,
    lightbeatStartDate: lightbeatStartDate.value,
    lightbeatEndDate: lightbeatEndDate.value,
    shareMessage: form.shareMessage,
    shareMessageShort: form.shareMessageShort,
    reactions: form.reactions,
    color: picker.color,
    instructions: form.instructions,
    typeDonation: form.typeDonation ? "object" : "money",
    typeDonationDescription: form.typeDonationName,
    idAnimation: form.animation.id,
    idSponsor: form.sponsor.id,
    idResource: form.type.id,
    idOrganization: form.organization.id,
    badge: badgeMedia,
    url: urlMedia,
    lightbeatDesign: lightbeatDesignMedia,
    typeDonationIcon: typeDonationIconMedia,
    introduction: introductionMedia,
    animation: animationMedia,
    customQr: customQrMedia,
  };

  let userId = sessionStore.getUserId();
  let userRole = sessionStore.getUserRole();
  let amount = 1;

  if (userRole != "admin") amount = await UserController.getCredit(userId);

  if (amount > 0) {
    // validate if you have sufficient credits
    await ChallengeController.createChallenge(challengeData)
      .then((response) => {
        alertStore.createAlert({
          title: "Challenge Created!",
          icon: "$success",
          text: "the challenge has been created successfully!",
        });
        router.push("/campaigns");
      })
      .catch((error) => {
        alertStore.createAlert({
          title: "Error!",
          color: "error",
          icon: "$warning",
          text: "We could not create the challenge!",
        });
        console.log("error", error);
      })
      .finally(() => {
        isLoading.value = false;
      });
  } else {
    // insufficient credits
    alertStore.createAlert({
      title: "Insufficient credits",
      color: "error",
      icon: "$warning",
      text: "Acquires more credits to create a challenge",
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
            to="/campaigns"
            color="info"
            rounded-full
            small
          />
          <p class="font-extrabold">{{ title }} Challenge</p>
        </div>
      </div>

      <div class="grid grid-cols-3 lg:grid-cols-4 gap-6">
        <CardBox is-form class="col-span-3" @submit.prevent="submit">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <FormField label="Challenge Name" help="Required.">
              <FormControl
                v-model="form.name"
                :icon="mdiAccount"
                name="challengeName"
                required
                autocomplete="challengeName"
              />
            </FormField>
            <FormField label="Challenge Description" help="Required.">
              <FormControl
                v-model="form.description"
                :icon="mdiMail"
                name="description"
                required
                autocomplete="description"
                label="data"
              />
            </FormField>

            <FormField label="Badge Image" help="Max 500kb">
              <FormFilePicker
                label="Upload"
                :modelValue="badge"
                v-on:update:model-value="handleBadge"
                mediaClass="h-24 w-24 mt-3"
                required
              />
              <!-- <img class="w-24 h-24 mt-3" :src="badge" alt="" /> -->
            </FormField>
            <FormField label="Challenge Background" help="Max 500kb">
              <FormFilePicker
                label="Upload"
                :modelValue="url"
                v-on:update:model-value="handleUrl"
                mediaClass="w-full h-96"
                required
              />
            </FormField>

            <FormField label="Type">
              <FormControl
                v-model="form.type"
                :options="challengeType"
                :icon="mdiCity"
              />
            </FormField>

            <FormField label="Organization">
              <FormControl
                v-model="form.organization"
                :options="organizations"
                :icon="mdiCity"
              />
            </FormField>

            <FormField label="Select an Animation">
              <FormControl
                :disabled="title == 'Edit'"
                v-model="form.animation"
                type="text"
                :options="animations"
                :icon="mdiAnimation"
              />
            </FormField>

            <FormField label="New Animation">
              <FormCheckRadio
                v-model="form.newAnimation"
                type="checkbox"
                label="Or upload a new one"
              />
            </FormField>

            <FormField
              v-if="form.newAnimation"
              label="Upload new animation"
              help="Max 500kb"
            >
              <FormFilePicker
                label="Upload"
                :modelValue="animationUrl"
                v-on:update:model-value="handleAnimationUrl"
                mediaClass="w-full h-96"
              />
            </FormField>

            <FormField
              v-if="form.newAnimation"
              label="Animation name"
              help="Required."
            >
              <FormControl
                v-model="form.newAnimationName"
                :icon="mdiAnimation"
                name="animationName"
                required
                autocomplete="newAnimationName"
              />
            </FormField>

            <FormField
              v-if="form.newAnimation"
              label="Animation duration (seconds)"
              help="Required."
            >
              <FormControl
                v-model="form.newAnimationDuration"
                :icon="mdiAnimation"
                name="animationDuration"
                required
                autocomplete="5"
              />
            </FormField>

            <FormField label="Type">
              <FormCheckRadio
                v-model="form.haveSponsor"
                type="checkbox"
                label="Unsponsored?"
              />
            </FormField>

            <FormField v-if="!form.haveSponsor" label="Sponsor">
              <FormControl
                :disabled="title == 'Edit'"
                v-model="form.sponsor"
                type="text"
                :options="sponsors"
                :icon="mdiCity"
              />
            </FormField>

            <FormField label="Start Date">
              <Datepicker v-model="startDate" />
            </FormField>

            <FormField label="End Date">
              <Datepicker v-model="endDate" />
            </FormField>

            <FormField>
              <FormCheckRadio
                v-model="form.typeDonation"
                type="checkbox"
                label="Something Different Than Money?"
              />
            </FormField>

            <FormField v-if="!form.typeDonation" label="Invite Donate">
              <FormControl
                v-model="form.inviteDonate"
                type="text"
                :options="inviteDonate"
              />
            </FormField>

            <FormField
              v-if="!form.typeDonation"
              label="Amount Per Challenge ($)"
            >
              <FormControl v-model="form.amount" :icon="mdiHandCoinOutline" />
            </FormField>

            <FormField v-if="!form.typeDonation" label="Maximun Donation ($)">
              <FormControl
                v-model="form.maxAmount"
                :icon="mdiHandCoinOutline"
              />
            </FormField>

            <FormField v-if="form.typeDonation" label="Name">
              <FormControl v-model="form.typeDonationName" :icon="mdiAccount" />
            </FormField>

            <FormField
              v-if="form.typeDonation"
              label="Select Image"
              help="Max 500kb"
            >
              <FormFilePicker
                label="Upload"
                :modelValue="typeDonationIcon"
                v-on:update:model-value="handleTypeDonationIcon"
                mediaClass="h-24 w-24 mt-3"
              />
            </FormField>

            <FormField>
              <FormCheckRadio
                v-model="form.addLighBeat"
                type="checkbox"
                label="Add LightBeat To This Challenge"
              />
            </FormField>

            <FormField v-if="form.addLighBeat" label="Select Lightbeat Design">
              <FormFilePicker
                label="Upload"
                :modelValue="lightbeatDesign"
                v-on:update:model-value="handleLightbeatDesign"
              />
            </FormField>

            <FormField v-if="form.addLighBeat" label="Start Lightbeat Date">
              <Datepicker v-model="lightbeatStartDate" />
            </FormField>

            <FormField v-if="form.addLighBeat" label="End Lightbeat Date">
              <Datepicker v-model="lightbeatEndDate" />
            </FormField>

            <FormCheckRadio
              v-model="form.reactions"
              type="checkbox"
              label="Do you want members to react to your challenge?"
            />

            <FormField
              v-if="form.addIntroduction"
              label="Select Introduction Video"
            >
              <FormFilePicker
                label="Upload"
                :modelValue="introduction"
                v-on:update:model-value="handleIntroduction"
              />
            </FormField>

            <FormField>
              <FormCheckRadio
                v-model="form.addInstructions"
                type="checkbox"
                label="Do you want to add instructions to this challenge?"
              />
            </FormField>

            <FormField
              v-if="form.addInstructions"
              label="Challenge instructions"
            >
              <FormControl v-model="form.instructions" :icon="mdiInformation" />
            </FormField>

            <FormField label="Social Media Sharing Text">
              <FormControl
                v-model="form.shareMessage"
                :icon="mdiAccountGroup"
              />
            </FormField>

            <FormField label="Social Media Sharing Text (Short)">
              <FormControl
                v-model="form.shareMessageShort"
                :icon="mdiAccountGroup"
              />
            </FormField>

            <FormField label="Banner Color">
              <div class="flex flex-row">
                <BaseButton
                  @click="
                    picker.showcolorpicker = picker.showcolorpicker
                      ? false
                      : true
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

            <FormField label="Select Custom QR">
              <FormFilePicker
                label="Upload"
                :modelValue="customQr"
                v-on:update:model-value="handleCustomQr"
                mediaClass="h-52 w-52"
              />
            </FormField>

            <FormField label="Select Advertisement Animation">
              <FormFilePicker
                label="Upload"
                :modelValue="animation"
                v-on:update:model-value="handleAnimation"
                mediaClass="h-52 w-52"
              />
            </FormField>
          </div>
          <template #footer>
            <BaseButtons class="justify-end">
              <BaseButton
                color="info"
                type="submit"
                label="Save"
                v-if="form"
                :isLoading="isLoading"
              />
            </BaseButtons>
          </template>
        </CardBox>

        <CardBox
          class="col-span-full lg:col-span-1 text-center items-center justify-center"
        >
          <p class="text-xl font-bold">
            CHALLENGE PREVIEW <br />
            <br />
            COMING SOON...
          </p>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
