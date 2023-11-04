<script setup>
import { onBeforeMount, ref, watchEffect } from "vue";
import { mdiArrowLeftDropCircle, mdiPlus } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SponsorController from "@/controllers/SponsorController";
import { useRouter } from "vue-router";
import { useSessionStore } from "@/stores/session";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import { computed } from "vue";

const host = import.meta.env.VITE_IMAGE_HOST;
const store = useSessionStore();
const sponsors = ref([]);
const router = useRouter();
const role = ref();
const loading = ref(Boolean);
const modalActive = ref(false);
const sponsorId = ref({});
const filterData = computed(() => searchData());
const searchName = ref("");
watchEffect(() => {
  SponsorController.getAll().then((data) => {
    sponsors.value = data;
  });
});

function searchData() {
  return sponsors.value.filter((sponsor) =>
    sponsor.name.includes(searchName.value)
  );
}

onBeforeMount(async () => {
  loading.value = true;
  role.value = store.getUserRole();
});

function goEdit(id) {
  router.push({
    name: "create-sponsor",
    query: {
      id: id,
    },
  });
}

async function activateSponsor() {
  console.log("sponsorId.value", sponsorId.value, !sponsorId.value.status);
  const id = sponsorId.value.id;
  console.log("id", id);
  const response = await SponsorController.update(id, {
    status: !sponsorId.value.status ? 0 : 1,
  });
  console.log("response", response);
  const index = sponsors.value.indexOf(sponsorId.value);
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
          <v-card-title class="text-h5" v-if="sponsorId.status">
            Activate Sponsor?
          </v-card-title>
          <v-card-title class="text-h5" v-else>
            Deactivate Sponsor?
          </v-card-title>
          <v-card-text v-if="sponsorId.status"
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
            <v-btn color="red" variant="text" @click="activateSponsor()">
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
          <p class="lg:text-xl text-lg">Sponsors</p>
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
            label="Add Sponsor"
            color="info"
            :icon="mdiPlus"
            to="/create-sponsor"
          />
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <!-- <CardBox class="flex items-center justify-center h-auto">
          <BaseButton
            label="Add Sponsor"
            color="info"
            :icon="mdiPlus"
            to="/create-sponsor"
          />
        </CardBox> -->

        <CardBox v-for="sponsor in filterData" :key="sponsor.id">
          <CardBoxComponentTitle title="With title & icon">
            <div class="flex justify-between mb-2">
              <p class="font-extrabold text-lg">{{ sponsor.name }}</p>
            </div>
          </CardBoxComponentTitle>
          <div class="flex grid-cols-3">
            <img
              class="col-span-1 mr-3"
              :src="host + sponsor.logo"
              style="height: 64px; width: 64px"
            />
          </div>
          <BaseButton
            v-if="role === 'admin'"
            class="mt-3 text-lg font-bold italic mr-2"
            small
            :label="sponsor.status ? 'Deactivate' : 'Activate'"
            :color="sponsor.status ? 'danger' : 'info'"
            @click="
              {
                modalActive = true;
                sponsorId = sponsor;
              }
            "
          />
          <BaseButton
            v-if="role === 'admin'"
            class="mt-3 text-lg font-bold italic"
            small
            label="Edit"
            color="success"
            @click="goEdit(sponsor.id)"
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
