<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import {
  mdiAccount,
  mdiAt,
  mdiCellphone,
  mdiCheckDecagram,
  mdiCity,
  mdiCityVariant,
  mdiPlus,
  mdiStarCircle,
} from "@mdi/js";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";
import RegisterController from "../controllers/RegisterConstroller";

const selectOptions = [
  { id: 1, label: "cause - Non-profits" },
  { id: 2, label: "sponsor - Brands, Corporations, etc" },
  { id: 3, label: "influencer - Content Creators" },
  { id: 4, label: "agency - Marketing companies, concerts and events..." },
];

const countries = RegisterController.getCountries();

const form = reactive({
  rol: selectOptions[0],
  firstName: "",
  lastName: "",
  organizationName: "",
  phoneCode: countries[0],
  phone: "",
  email: "",
  code: "",
  promotional: "",
  setPass: false,
  pass: "",
  passVerify: "",
  organization: {
    name: "",
    description: "",
    logo: "",
    color: "#cccccc",
    personName: "",
    personLastname: "",
    personEmail: "",
  },
  sponsor: {
    name: "",
    logo: "",
    personName: "",
    personLastname: "",
    personEmail: "",
    status: 1,
  },
});

const router = useRouter();

const sendCode = async () => {
  await RegisterController.sendCode(`${form.phoneCode.id}${form.phone}`);
};

const submit = async () => {
  if (form.setPass) console.log("VALIDANDO: ", form.rol.id);
  // if (form.rol.id == 1) {
  //   form.organization.name = form.organizationName;
  //   form.organization.personName = form.firstName;
  //   form.organization.personLastname = form.lastName;
  //   form.organization.personEmail = form.email;
  // }
  // if (form.rol.id == 2) {
  //   form.sponsor.name = form.organizationName;
  //   form.sponsor.personName = form.firstName;
  //   form.sponsor.personLastname = form.lastName;
  //   form.sponsor.personEmail = form.email;
  // }
  console.log("malditasea todo", form);

  RegisterController.register(form).then((data) => {
    if (data) router.push("/");
  });
  if (!form.setPass) form.setPass = true;
};
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="blueWhite">
      <CardBox
        v-if="!form.setPass"
        :class="`${cardClass} my-8`"
        is-form
        @submit.prevent="submit"
      >
        <div class="flex justify-center">
          <img
            class="w-2/3"
            src="/assets/shareity-logo.png"
            alt="Shareity Logo"
          />
        </div>

        <FormField label="Who are you?">
          <FormControl
            v-model="form.rol"
            :options="selectOptions"
            :icon="mdiCity"
          />
        </FormField>

        <FormField v-if="form.rol.id === 2" label="Sponsor Name">
          <FormControl
            v-model="form.sponsor.name"
            :icon="mdiAccount"
            name="name"
            autocomplete="username"
          />
        </FormField>
        <FormField label="First Name">
          <FormControl
            v-model="form.firstName"
            :icon="mdiAccount"
            name="firstName"
            autocomplete="username"
          />
        </FormField>

        <FormField label="Last Name">
          <FormControl
            v-model="form.lastName"
            :icon="mdiAccount"
            name="lastName"
            autocomplete="current-password"
          />
        </FormField>

        <FormField v-if="form.rol.id != 3" label="Company Name">
          <FormControl
            v-model="form.organizationName"
            :icon="mdiCityVariant"
            name="companyName"
            autocomplete="current-password"
          />
        </FormField>

        <FormField label="Email">
          <FormControl
            v-model="form.email"
            :icon="mdiAt"
            name="email"
            autocomplete="current-password"
          />
        </FormField>

        <FormField label="Password">
          <FormControl
            v-model="form.pass"
            :icon="mdiStarCircle"
            name="promoCode"
            type="password"
          />
        </FormField>
        <FormField label="Verify Password">
          <FormControl
            v-model="form.passVerify"
            :icon="mdiStarCircle"
            name="promoCode"
            type="password"
          />
        </FormField>
        <FormField label="Phone">
          <div class="flex sm:flex-row flex-col gap-3">
            <FormControl
              v-model="form.phoneCode"
              :options="countries"
              :icon="mdiPlus"
              class="sm:w-1/3"
            />
            <FormControl
              v-model="form.phone"
              :icon="mdiCellphone"
              name="companyName"
              autocomplete="current-password"
              class="sm:w-2/3"
            />
          </div>
        </FormField>
        <FormField
          label="Registrarion Code"
          help="This code will be send to your phone"
        >
          <div class="flex sm:flex-row flex-col gap-3">
            <BaseButton
              outline
              color="info"
              label="Send Code"
              @click="sendCode"
              class="sm:w-1/3"
              :disabled="form.phone.length < 9"
            />
            <FormControl
              v-model="form.code"
              :icon="mdiCheckDecagram"
              name="regisCode"
              autocomplete="current-password"
              class="sm:w-2/3"
            />
          </div>
        </FormField>

        <FormField label="Pomotional Code">
          <FormControl
            v-model="form.promotional"
            :icon="mdiStarCircle"
            name="promoCode"
          />
        </FormField>

        <template #footer>
          <BaseButtons type="flex-col justify-center items-center">
            <BaseButton
              type="submit"
              color="info"
              class="sm:w-1/2 w-full"
              label="Create Account"
              :disabled="form.pass !== form.passVerify"
            />
            <BaseButton
              to="/"
              color="info"
              outline
              class="sm:w-1/2 w-full"
              label="I Already Have An Account"
            />
          </BaseButtons>
        </template>
      </CardBox>

      <!-- <CardBox
        v-if="form.setPass"
        :class="cardClass"
        is-form
        @submit.prevent="submit"
      >
        <div class="flex justify-center">
          <img
            class="w-2/3"
            src="/assets/shareity-logo.png"
            alt="Shareity Logo"
          />
        </div>

        <FormField label="Password">
          <FormControl
            v-model="form.pass"
            :icon="mdiStarCircle"
            name="promoCode"
            type="password"
          />
        </FormField>
        <FormField label="Verify Password">
          <FormControl
            v-model="form.passVerify"
            :icon="mdiStarCircle"
            name="promoCode"
            type="password"
          />
        </FormField>
        <template #footer>
          <BaseButtons type="flex-col justify-center items-center">
            <BaseButton
              type="submit"
              color="info"
              class="w-1/2"
              label="Create Account"
              :disabled="form.pass !== form.passVerify"
            />
            <BaseButton
              to="/"
              color="info"
              outline
              class="w-1/2"
              label="I Already Have An Account"
            />
          </BaseButtons>
        </template>
      </CardBox> -->
    </SectionFullScreen>
  </LayoutGuest>
</template>
