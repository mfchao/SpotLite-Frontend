<script setup lang="ts">
import PostListComponent from "@/components/Post/PostListComponent.vue";
import SpotInfoComponent from "@/components/SpotLite/SpotInfoComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";


const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <h1>This week's SpotLite</h1>
    <section>
      <h1 v-if="isLoggedIn"></h1>
      <h1 v-else>Please login!</h1>
    </section>
    <SpotInfoComponent/>
    <PostListComponent />
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
