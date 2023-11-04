<script setup>
import {
  mdiArrowLeftDropCircle,
  mdiTrashCan,
  mdiInformation,
  mdiAccountLock,
  mdiAccountLockOpen,
  mdiScaleBalance,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserController from "@/controllers/UserController";
import { computed, ref, watchEffect } from "vue";
import { useSessionStore } from "@/stores/session.js";
import UtilityMehods from "@/utility/utilityMethods";

const history = ref([]);
const host = import.meta.env.VITE_IMAGE_HOST;

const selectedUser = ref({});

const swayScore = ref({});

const snackbar = ref(false);

const selectedId = ref(0);

const checkable = false;

const isModalActive = ref(false);

const perPage = ref(10);

const currentPage = ref(1);

const checkedRows = ref([]);

const sorting = ref({ field: "", order: 1 });

const userDefault = "../../assets/user.png";

const modalInfo = ref(false);

const modalSwayInfo = ref(false);

const modalBlockUser = ref(false);

const user = ref({});

const sessionStore = useSessionStore();

const itemsPaginated = computed(() => {
  const start = currentPage.value * perPage.value;
  return sortedUsers.value.slice(start, start + perPage.value);
});

const sortedUsers = computed(() => {
  if (history.value.page) {
    const { field, order } = sorting.value;
    const usersCopy = [...history.value.page];

    if (field === "name") {
      usersCopy.sort((a, b) =>
        a.name && b.name ? a.name.toString().localeCompare(b.name) * order : 0
      );
    } else if (field === "status") {
      usersCopy.sort((a, b) =>
        a.status && b.status
          ? a.status.toString().localeCompare(b.status) * order
          : 0
      );
    }

    return usersCopy;
  }
  return [];
});

const numPages = computed(() => {
  if (history.value.page)
    Math.ceil(history.value.page.length / perPage.value) - 1;
});

const pagesList = computed(() => {
  const pagesList = [];
  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }
  return pagesList;
});

watchEffect(() => {
  let userId = sessionStore.getUserId();
  UserController.getCreditHistory(userId, 1000).then((data) => {
    history.value = data;
    console.log("🚚", history.value.page);
  });
});

function sort(field) {
  if (sorting.value.field === field) {
    sorting.value.order *= -1;
  } else {
    sorting.value.field = field;
    sorting.value.order = 1;
  }
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="flex justify-between pb-5">
        <div class="flex gap-2 items-center">
          <BaseButton
            to="/credits"
            :icon="mdiArrowLeftDropCircle"
            color="info"
            rounded-full
            small
          />
          <p class="lg:text-xl text-lg">Credit History</p>
        </div>
      </div>
      <CardBox class="mb-6 m" has-table>
        <div>
          <div
            v-if="checkedRows.length"
            class="p-3 bg-gray-100/50 dark:bg-slate-800"
          >
            <span
              v-for="checkedRow in checkedRows"
              :key="checkedRow.id"
              class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-slate-700"
            >
              {{ checkedRow.name }}
            </span>
          </div>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table
              class="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th scope="col" class="px-6 py-3">Date</th>
                  <th scope="col" class="px-6 py-3">Amount</th>
                  <th scope="col" class="px-6 py-3">Credits obtained</th>
                  <th scope="col" class="px-6 py-3">Card type</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="client in itemsPaginated"
                  :key="client.id"
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td class="px-6 py-4">
                    {{ UtilityMehods.formatDate(client.createAt) }}
                  </td>
                  <td class="px-6 py-4">
                    {{ `$ ${client.amount || 0}` }}
                  </td>
                  <td class="px-6 py-4">
                    {{ client.credit }}
                  </td>
                  <td class="px-6 py-4">
                    {{ client.type }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800"
          >
            <BaseLevel>
              <v-pagination
                :length="pagesList.length"
                color="black"
                :total-visible="10"
                v-model="currentPage"
              ></v-pagination>
            </BaseLevel>
          </div>
        </div>
      </CardBox>
    </SectionMain>
    <v-snackbar v-model="snackbar" :timeout="3000" color="red">
      <p class="text-lg italic font-bold">User has been <b>Deleted</b></p>

      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </LayoutAuthenticated>
</template>
<style>
.button {
  display: flex;
  align-items: center !important;
}
</style>
