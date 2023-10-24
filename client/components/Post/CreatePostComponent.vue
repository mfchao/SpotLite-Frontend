<script setup lang="ts">
import CreatePostForm from "@/components/Post/CreatePostForm.vue";

import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { isLoggedIn } = storeToRefs(useUserStore());


</script>

<template>
  <section v-if="isLoggedIn">
    <CreatePostForm  />
  </section>
  
</template>

<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 100%;
  gap: 1em;
}

section,
p,
.row {
  margin: 0 auto;
  max-width: 60em;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.posts {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
