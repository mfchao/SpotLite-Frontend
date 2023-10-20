<script setup lang="ts">
import { onBeforeMount, ref } from "vue";


import { useCommentStore } from "@/stores/comment";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername } = storeToRefs(useUserStore());
const { getUsers } = useUserStore();
const { createComment } = useCommentStore();
const { isLoggedIn } = storeToRefs(useUserStore());


const props = defineProps({
  postID: String
});

const content = ref("");
const userID = ref("");
const emit = defineEmits(["refreshComments"]);
const postID = props.postID;

async function create() {
    if (postID) {
        await createComment(userID.value, postID, content.value)
    }
  
  emit("refreshComments");
  emptyForm();
}

const emptyForm = () => {
  content.value = "";
};

onBeforeMount(async () => {
  
  const fetchedUser = await getUsers(currentUsername.value);
  userID.value =fetchedUser[0]._id
 
  
});
</script>

<template>
    <section v-if="isLoggedIn">
  <form v-if="postID != undefined"  @submit.prevent="create()">
    <label for="content">Comment:</label>
    <textarea id="content" v-model="content" placeholder="Add a comment!" required> </textarea>
    <button type="submit" class="pure-button-primary pure-button" >Submit</button>
  </form>
</section>
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
