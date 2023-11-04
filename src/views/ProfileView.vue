<script setup>
import { reactive } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiAccount,
  mdiMail,
  mdiAsterisk,
  mdiFormTextboxPassword,
  mdiPhone,
  mdiSmartCard,
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
import { watchEffect } from "vue";
import UserController from "@/controllers/UserController";
import ProfileController from "@/controllers/ProfileController";
import { ref } from "vue";
import { useSessionStore } from "@/stores/session";
import { computed } from "vue";
import { useAlertStore } from "@/stores/alerts.js";

const host = import.meta.env.VITE_IMAGE_HOST;
const store = useSessionStore();
const nickname = store.getUserNickname();
const alertStore = useAlertStore();
let profileForm = ref({});
let userAvatar = ref("");
const userAvatarFile = ref({});
const passwordForm = ref({});
const validateAvatar = computed(() => {
  if (userAvatar.value && userAvatar.value.match(/.*\..{2,5}/)) {
    return userAvatar.value;
  } else {
    return mdiAccount;
  }
});

watchEffect(async () => {
  const { id, firstName, lastName, email, username, rol, bio, imagen } =
    await UserController.userAction(nickname);
  profileForm.value = {
    id,
    firstName,
    lastName,
    email,
    username,
    rol,
    bio,
  };
  userAvatar.value = host + imagen;
});

const submitProfile = () => {
  ProfileController.updateDataUser(profileForm.value).then(() => {
    alertStore.createAlert({
      title: "Data updated!",
      icon: "$success",
      text: "The data has been updated successfully!",
    });
  });
  submitAvatarUser();
};

const submitAvatarUser = async () => {
  const id = profileForm.id;
  const photo = await ProfileController.userAvatar({
    id,
    file: userAvatarFile.value,
  });
};

const submitPass = () => {
  try {
    const email = profileForm.value.email;
    console.log("passwordForm", passwordForm.value);
    console.log("profileForm.value", profileForm.value.email);
    if (passwordForm.value.oldPassword) {
      ProfileController.updatePassUser(email, passwordForm.value).then(() => {
        alertStore.createAlert({
          title: "Data updated!",
          icon: "$success",
          text: "The data has been updated successfully!",
        });
      });
    } else {
      return alertStore.createAlert({
        title: "Error!",
        icon: "$warning",
        text: "An error occurred while trying to update the data!",
      });
    }
  } catch (error) {
    console.log("error", error);
  }
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="validateAvatar" title="Profile" main>
      </SectionTitleLineWithButton>

      <UserCard class="mb-6" />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardBox is-form @submit.prevent="submitProfile">
          <FormField label="Avatar" help="Max 500kb">
            <FormFilePicker label="Upload" />
          </FormField>
          <div class="grid grid-cols-2 gap-2">
            <FormField label="First Name" help="Required. Your name">
              <FormControl
                v-model="profileForm.firstName"
                :icon="mdiAccount"
                name="FirstName"
                required
                autocomplete="FirstName"
              />
            </FormField>
            <FormField label="Last Name" help="Required. Your name">
              <FormControl
                v-model="profileForm.lastName"
                :icon="mdiAccount"
                name="lastName"
                required
                autocomplete="lastName"
              />
            </FormField>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <FormField label="Phone" help="This field can't be edited">
              <FormControl
                v-model="profileForm.phone"
                :icon="mdiPhone"
                type="phone"
                name="phone"
                autocomplete="Phone"
                disabled
              />
            </FormField>
            <FormField label="Rol User" help="This field can't be edited">
              <FormControl
                v-model="profileForm.rol"
                :icon="mdiSmartCard"
                type="rol"
                name="rol"
                autocomplete="rol"
                disabled
              />
            </FormField>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <FormField label="E-mail" help="This field can't be edited">
              <FormControl
                v-model="profileForm.email"
                :icon="mdiMail"
                type="email"
                name="email"
                required
                autocomplete="email"
                disabled
              />
            </FormField>
            <FormField
              v-if="profileForm.username === ''"
              label="Username"
              help="This field can't be edited"
            >
              <FormControl
                v-model="profileForm.username"
                :icon="mdiAccount"
                type="username"
                name="username"
                autocomplete="username"
              />
            </FormField>
            <FormField
              v-else
              label="Username"
              help="This field can't be edited"
            >
              <FormControl
                value="This user does not have a username"
                :icon="mdiAccount"
                type="username"
                name="username"
                required
                autocomplete="username"
              />
            </FormField>
          </div>

          <template #footer>
            <BaseButtons>
              <BaseButton
                color="info"
                type="submit"
                label="Submit"
                class="mr-2"
                :disabled="profileForm.valid"
              />
              <BaseButton color="info" label="Options" outline />
            </BaseButtons>
          </template>
        </CardBox>

        <CardBox is-form @submit.prevent="submitPass">
          <FormField
            label="Current password"
            help="Required. Your current password"
          >
            <FormControl
              v-model="passwordForm.oldPassword"
              :icon="mdiAsterisk"
              name="oldPassword"
              type="password"
              required
              autocomplete="current-password"
            />
          </FormField>

          <BaseDivider />

          <FormField label="New password" help="Required. New password">
            <FormControl
              v-model="passwordForm.newPassword"
              :icon="mdiFormTextboxPassword"
              name="newPassword"
              type="password"
              required
              autocomplete="new-password"
            />
          </FormField>

          <FormField
            label="Confirm password"
            help="Required. New password one more time"
          >
            <FormControl
              v-model="passwordForm.password_confirmation"
              :icon="mdiFormTextboxPassword"
              name="password_confirmation"
              type="password"
              required
              autocomplete="new-password"
            />
          </FormField>

          <template #footer>
            <BaseButtons>
              <BaseButton
                type="submit"
                color="info"
                label="Submit"
                class="mr-2"
                :disabled="
                  passwordForm.newPassword != passwordForm.password_confirmation
                "
              />
              <BaseButton color="info" label="Options" outline />
            </BaseButtons>
          </template>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
