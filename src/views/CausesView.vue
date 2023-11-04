<script setup>
import { onBeforeMount, computed, ref, watchEffect } from "vue";
import { mdiArrowLeftDropCircle, mdiPlus } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";

import BaseButton from "@/components/BaseButton.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import OrganizationController from "@/controllers/OrganizationController";
import { useRouter } from "vue-router";
import { useSessionStore } from "@/stores/session";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";

const host = import.meta.env.VITE_IMAGE_HOST;
const store = useSessionStore();

const causes = ref([]);
const causeId = ref({});
const modalActive = ref(false);
const loading = ref(Boolean);
const role = ref();
const filterData = computed(() => searchData());
const searchName = ref("");

function searchData() {
  return causes.value.filter((sponsor) =>
    sponsor.name.includes(searchName.value)
  );
}

watchEffect(() => {
  OrganizationController.getAll().then((data) => {
    causes.value = data;
  });
});

onBeforeMount(async () => {
  loading.value = true;
  role.value = store.getUserRole();
});
const router = useRouter();

function goEdit(id) {
  router.push({
    name: "create-cause",
    query: {
      id: id,
    },
  });
}

async function activateCause() {
  const id = causeId.value.id;
  const response = await OrganizationController.update(id, {
    status: !causeId.value.status ? 0 : 1,
  });
  const index = sponsors.value.indexOf(causeId.value);
  sponsors.value[index].status = response.status;
  modalActive.value = false;
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <!-- modal block user -->
      <v-dialog v-model="modalActive" width="auto">
        <v-card>
          <v-card-title class="text-h5" v-if="causeId.status">
            Activate Sponsor?
          </v-card-title>
          <v-card-title class="text-h5" v-else>
            Deactivate Sponsor?
          </v-card-title>
          <v-card-text v-if="causeId.status"
            >Are you sure you want to <b>Activate</b> this sponsor?</v-card-text
          >
          <v-card-text v-else
            >Are you sure you want to <b>Deactivate</b> this
            sponsor?</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green-darken-1"
              variant="text"
              @click="modalActive = false"
            >
              Disagree
            </v-btn>
            <v-btn color="red" variant="text" @click="activateCause()">
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <div class="flex justify-between pb-5">
        <div class="flex gap-2 items-center">
          <BaseButton
            to="/dashboard"
            :icon="mdiArrowLeftDropCircle"
            color="info"
            rounded-full
            small
          />

          <p class="lg:text-xl text-lg">Causes</p>
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
            label="Add Cause"
            color="info"
            :icon="mdiPlus"
            to="/create-cause"
          />
        </div>
      </div>
      <!-- <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Causes" main>
        <div></div>
      </SectionTitleLineWithButton> -->

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <!-- <CardBox class="flex items-center justify-center h-auto">
          <BaseButton
            label="Add Cause"
            color="info"
            :icon="mdiPlus"
            to="/create-cause"
          />
        </CardBox> -->

        <CardBox class="max-h-52" v-for="cause in filterData" :key="cause.id">
          <CardBoxComponentTitle title="With title & icon">
            <div class="flex justify-between mb-2">
              <p class="font-extrabold text-lg">{{ cause.name }}</p>
            </div>
          </CardBoxComponentTitle>
          <div class="grid grid-cols-3">
            <img
              class="col-span-1 mr-3"
              :src="host + cause.logo"
              style="height: 64px; width: 64px"
            />
            <p class="text-sm font-light col-span-2 line-clamp-4">
              {{ cause.description }}
            </p>
          </div>
          <BaseButton
            v-if="role === 'admin'"
            class="mt-3 text-lg font-bold italic mr-2"
            small
            :label="cause.status ? 'Deactivate' : 'Activate'"
            :color="cause.status ? 'danger' : 'info'"
            @click="
              {
                modalActive = true;
                causeId = cause;
              }
            "
          />
          <BaseButton
            v-if="role === 'admin'"
            class="mt-3 text-lg font-bold italic"
            small
            label="Edit"
            color="success"
            @click="goEdit(cause.id)"
          />
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
<style scoped>
.edit-search > .mb-6 {
  margin-bottom: 0px !important;
}
</style>
