<script setup lang="ts">
import SearchComponent from "@/components/Profile/SearchComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";


const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main class="search">
    <h1>Search</h1>
   
    <SearchComponent/>
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
  font-family: "SF-Compact-Semibold";
  letter-spacing: 0.08em;
  font-size: 1em;
  text-transform: uppercase;
}

.search {
  background-image: url("@/assets/images/gradient3.png");
  background-repeat: no-repeat;
  background-size: fill;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
}


</style>