<script setup lang="ts">
import { onBeforeMount, ref } from "vue";


import { useCommentStore } from "@/stores/comment";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { fetchy } from "../../utils/fetchy";


const { currentUsername } = storeToRefs(useUserStore());
const { getUsers } = useUserStore();
const { createParentComment, createChildrenComment } = useCommentStore();
const { isLoggedIn } = storeToRefs(useUserStore());


const props = defineProps({
  postID: String,
  parent: String,
});

const content = ref("");
const userID = ref("");
const emit = defineEmits(["refreshComments", "closeForm"]);
const postID = props.postID;

async function create() {
    if (postID) {
      if (props.parent) {
        
        await fetchy(`api/comments`, "POST", {
        body: { author: userID.value, post: postID, content: content.value, parent: props.parent },
      });
      
      emit("closeForm");
    } else {
      await fetchy(`api/comments`, "POST", {
        body: { author: userID.value, post: postID, content: content.value },
      });
    }
    }
  
  emit("refreshComments", props.postID);
  emit("closeForm");
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
    <div class="buttons">
      <button type="submit" class="" >Submit</button>
      <button class="" @click="emit('closeForm')" >Cancel</button>
    </div>
    
  </form>
</section>
</template>

<style scoped>
form {
  -webkit-backdrop-filter: blur(8px);  
  backdrop-filter: blur(8px); 
  box-shadow: 0px 4px 10px 4px rgb(0 0 0 / 40%);
  background: rgba(255, 255, 255, 0.5); 
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
  border: 2px solid black;
}

textarea {
  font-family: "SF-Compact-Thin";
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
}


.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1em;
  width: 100%;
  margin-top: 6px;
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
