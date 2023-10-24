<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import { formatDate } from "../../utils/formatDate";

const props = defineProps(["comment"]);
const content = ref(props.comment.content);
const emit = defineEmits(["editComment", "refreshComments"]);

const editComment = async (content: string) => {
  try {
    await fetchy(`api/comments/${props.comment._id}`, "PATCH", { body: { update: { content: content } } });
  } catch (e) {
    return;
  }
  emit("editComment");
  emit("refreshComments");
};
</script>

<template>
  <form @submit.prevent="editComment(content)">
    <p class="author">{{ props.comment.author }}</p>
    <textarea id="content" v-model="content" placeholder="Create a comment!" required> </textarea>
    <div class="base">
      <div class="buttons">
        <menu >
          <li><button  type="submit">Save</button></li>
          <li><button  @click="emit('editComment')">Cancel</button></li>
        </menu>
      </div>
      
      <p v-if="props.comment.dateCreated !== props.comment.dateUpdated" class="timestamp">Edited on: {{ formatDate(props.comment.dateUpdated) }}</p>
      <p v-else class="timestamp">Created on: {{ formatDate(props.comment.dateCreated) }}</p>
    </div>
  </form>
</template>

<style scoped>
form {
  -webkit-backdrop-filter: blur(8px);  
  backdrop-filter: blur(8px); 
  box-shadow: 0px 4px 10px 4px rgb(0 0 0 / 20%);
  background: rgba(255, 255, 255, 0.2); 
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  border: 2px solid black;
}

textarea {
  font-family: "SF-Compact-Thin";
  font-size: inherit;
  height: 6em;
  border-radius: 4px;
  resize: none;
  background-color: rgba(255, 255, 255, 0.8);
  border: 0.5px solid rgba(157, 157, 157, 0.434);
}

p {
  margin: 0em;
}

.author {
  font-weight: bold;
  font-size: 1.2em;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-right: 30px;
  margin-top: 6px;
}

button {
  background-color: rgba(255, 255, 255, 0);
  border: 2px solid black;
  margin-top: 0;
}

button:hover {
  background-color: rgba(255, 255, 255, 1);
}
</style>
