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
    <button type="submit" >Create Post</button>
  </form>
</template>

<style scoped>
form {
  -webkit-backdrop-filter: blur(8px);  
  backdrop-filter: blur(8px); 
  box-shadow: 0px 4px 10px 4px rgb(0 0 0 / 10%);
  background: rgba(255, 255, 255, 0.5); 
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
  width: 70vh;
}

label {
  font-family: "SF-Compact-Light";
}

textarea {
  font-family: "SF-Compact-Thin";
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(61, 61, 61, 0.167);
}

input {
  font-family: "SF-Compact-Thin";
  font-size: inherit;
  height: 1em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(61, 61, 61, 0.167);
}

button {
  width: 100%;
  background-color: rgba(255, 255, 255, 0);
  border: 2px solid black;
}

button:hover {
  background-color: rgba(255, 255, 255, 1);
}
</style>
