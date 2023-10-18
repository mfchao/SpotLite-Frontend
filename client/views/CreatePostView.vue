<script setup lang="ts">
import CreatePostComponent from "@/components/Post/CreatePostComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";


const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <h1>+Post</h1>
   
    <CreatePostComponent/>
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>