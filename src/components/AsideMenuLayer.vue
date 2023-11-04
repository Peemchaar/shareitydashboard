<script setup>
import { mdiLogout, mdiClose } from "@mdi/js";
import { computed } from "vue";
import { useStyleStore } from "@/stores/style.js";
import AsideMenuList from "@/components/AsideMenuList.vue";
import AsideMenuItem from "@/components/AsideMenuItem.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import LoginController from "@/controllers/LoginController";
import { ref } from "vue";
import { useRouter } from "vue-router";

defineProps({
  menu: {
    type: Array,
    required: true,
  },
});
const router = useRouter();
const emit = defineEmits(["menu-click", "aside-lg-close-click"]);
const modalLogout = ref(false);
const styleStore = useStyleStore();

const logoutItem = computed(() => ({
  label: "Logout",
  icon: mdiLogout,
  color: "info",
  role: ['sponsor', 'admin', 'account', 'agency', 'organization', 'promoter', 'Cause'],
  isLogout: true,
}));

const menuClick = (event, item) => {
  emit("menu-click", event, item);
};

const asideLgCloseClick = (event) => {
  emit("aside-lg-close-click", event);
};

async function logout() {
  await LoginController.logout();
  router.push("/");
}

</script>

<template>
  <aside
    id="aside"
    class="lg:py-2 lg:pl-2 w-60 lg:w-1/5 fixed flex z-40 top-0 h-full transition-position overflow-hidden"
  >
    <div
      :class="styleStore.asideStyle"
      class="lg:rounded-2xl grid place-content-between overflow-hidden dark:bg-slate-900 relative h-full"
    >
      <div>
        <div
          :class="styleStore.asideBrandStyle"
          class="flex flex-row h-14 items-center justify-between dark:bg-slate-900"
        >
          <div
            class="text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0"
          >
            <h1 class="font-black text-3xl">SHAREITY</h1>
          </div>
          <button
            class="hidden lg:inline-block xl:hidden p-3"
            @click.prevent="asideLgCloseClick"
          >
            <BaseIcon :path="mdiClose" />
          </button>
        </div>
        <div
          :class="
            styleStore.darkMode
              ? 'aside-scrollbars-[slate]'
              : styleStore.asideScrollbarsStyle
          "
          class="flex-1 overflow-y-auto overflow-x-hidden"
        >
          <AsideMenuList :menu="menu" @menu-click="menuClick" />
        </div>
      </div>

      <ul class="absolute bottom-0 w-full">
        <v-dialog v-model="modalLogout" width="auto">
          <v-card>
            <v-card-title class="text-h5 ml-2 red-darken-1">
              Are you sure you want close session?
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="mr-2"
                color="red-darken-1"
                variant="text"
                @click="logout()"
              >
                Yes
              </v-btn>
              <v-btn
                class="mr-2"
                color="green-darken-1"
                variant="text"
                @click="modalLogout = false"
              >
                No
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <AsideMenuItem :item="logoutItem" @click="modalLogout = true" />
      </ul>
    </div>
  </aside>
</template>
