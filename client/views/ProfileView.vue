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