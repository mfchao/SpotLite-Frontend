<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const content = ref("");
const image = ref("");
const emit = defineEmits(["refreshPosts"]);

const createPost = async (content: string, options?: string) => {
  try {
    await fetchy("api/posts", "POST", {
      body: { content, options: { image: image.value }},
    });
  } catch (_) {
    return;
  }
  emit("refreshPosts");
  emptyForm();
};

const emptyForm = () => {
  content.value = "";
  image.value = "";
};
</script>

<template>
  <form @submit.prevent="createPost(content)">
    <label for="content">Post Contents:</label>
    <textarea id="content" v-model="content" placeholder="Create a post!" required> </textarea>
    <label for="image">Image URL:</label>
    <input id="image" v-model="image" placeholder="Enter image URL" /> 
    <button type="submit" class="pure-button-primary pure-button">Create Post</button>
  </form>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}
</style>
