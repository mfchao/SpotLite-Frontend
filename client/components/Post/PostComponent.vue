<script setup lang="ts">
import CommentListComponent from "@/components/Comment/CommentListComponent.vue";
import VoteComponent from "@/components/Vote/VoteComponent.vue";
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";


const props = defineProps(["post"]);
const emit = defineEmits(["editPost", "refreshPosts"]);
const { currentUsername } = storeToRefs(useUserStore());
const { getUsers } = useUserStore();

let userPhoto = ref("");

const deletePost = async () => {
  try {
    await fetchy(`api/posts/${props.post._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshPosts");
};

onBeforeMount(async () => {
  
  const fetchedUser = await getUsers(props.post.author);
  if (fetchedUser[0]) {
    userPhoto.value = fetchedUser[0].profilePhoto || '';
  }
  
});



</script>

<template>
  <div class="header">
    <div class="user">
      <img class="profile" :src="userPhoto" alt="Post image" v-if="userPhoto != ''"/>
      <p class="author">{{ props.post.author }}</p>
    </div>
    
  <div class="rightTop">
    <article class="timestamp">
      <p v-if="props.post.dateCreated !== props.post.dateUpdated">Edited on: {{ formatDate(props.post.dateUpdated) }}</p>
      <p v-else>{{ formatDate(props.post.dateCreated) }}</p>
    </article>
    <menu v-if="props.post.author == currentUsername">
      <li><button @click="emit('editPost', props.post._id)">
        <img class="svg" src="@/assets/images/edit.svg" />
      </button></li>
      <li><button class="button-error " @click="deletePost">
        <img class="svg" src="@/assets/images/delete.svg" />
      </button></li>
    </menu>
  </div>
    
  </div>
  
  <img class="image" :src="props.post.options?.image" alt="Post image" v-if="props.post.options?.image"/>
  

  
  
  <div class="base">
    <div class="caption">
      <div class="user">
        <img class="profile" :src="userPhoto" alt="Post image" v-if="userPhoto != ''"/>
        <p class="author">{{ props.post.author }}</p>
      </div>
      <p class="captionText">{{ props.post.content }}</p>
    </div>
    <VoteComponent :postId="props.post._id" />
    
  </div>
  
  
  <CommentListComponent :postID="props.post._id" />
<!-- </RouterLink> -->
</template>

<style scoped>
p {
  margin: 0em;
}

.caption {
  margin-top: 7px;
}

.svg {
  width: 1.2em;
}

.captionText {
  margin-top: 10px;
  max-width: 50em;
  line-height: 1.2em;
}

button {
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
  box-shadow: none;
  background: none;
  border: none;
  cursor: pointer;
  transition: .3s ease;
  margin-right: 0px;
}

.profile {
  width: 30px;
}

.author {
  font-weight: bold;
  font-size: 1.2em;
  margin-left: 10px;
  font-family: "SF-Compact-Medium";
  letter-spacing: normal;
}

.user {
  display: flex;
  justify-content: left;
  align-items: center;
}

.rightTop {
  display: flex;
  justify-content: right;
  align-items: center;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 0em;
  padding: 0;
  margin: 0;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
  font-family: "SF-Compact-Thin";
  color: grey;
  margin-right: 10px;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}



.base article:only-child {
  margin-left: auto;
}

.image {
  display: flex;
  align-items: center;
  border-radius: 10px;
}


</style>
