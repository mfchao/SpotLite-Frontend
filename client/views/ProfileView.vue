<script setup lang="ts">
import ProfileComponent from "@/components/Profile/ProfileComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";


const { currentUsername } = storeToRefs(useUserStore());


</script>

<template>
  <main class="column">
    <h1>Welcome {{ currentUsername }}</h1>
    <ProfileComponent/>
  </main>
</template>

<style>
h1 {
  text-align: center;
  font-family: "SF-Compact-Semibold";
  letter-spacing: 0.08em;
  font-size: 1em;
  text-transform: uppercase;
}

main {
  background-image: url("@/assets/images/gradient3.png");
  background-repeat: no-repeat;
  background-size: fill;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
}

</style>