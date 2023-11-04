<script setup>
import { gradientBgBlueWhite } from "@/colors";
import { useStyleStore } from "@/stores/style.js";
import NavBar from "@/components/NavBar.vue";

const styleStore = useStyleStore();
</script>

<template>
  <div
    class="min-h-screen items-center pt-14 justify-center"
    :class="gradientBgBlueWhite"
  >
    <NavBar>
      <div class="flex w-full items-center justify-between">
        <RouterLink to="dashboard">
          <img src="../../assets/shareity-letras.png" alt="Letras" class="h-11"
        /></RouterLink>
        <div>
          <ul class="flex flex-row gap-5">
            <li
              class="font-bold hover:text-white hover:bg-sky-400 rounded-lg px-3 py-2"
            >
              <RouterLink to="campaigns">CAMPAIGNS</RouterLink>
            </li>
            <li
              class="font-bold hover:text-white hover:bg-sky-400 rounded-lg px-3 py-2"
            >
              <RouterLink to="comunity-message">COMUNITY MESSAGE</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </NavBar>
    <slot />
  </div>
</template>
