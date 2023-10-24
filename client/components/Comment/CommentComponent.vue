<script setup lang="ts">
import EditCommentForm from "@/components/Comment/EditCommentForm.vue";
import VoteComponent from "@/components/Vote/VoteComponent.vue";
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { onBeforeMount, onMounted, ref, watchEffect } from "vue";
import { fetchy } from "../../utils/fetchy";


const props = defineProps(["comment", "postID", "replyTo"]);
const emit = defineEmits(["editComment", "refreshComments", "replyTo", "closeForm"]);
const { currentUsername } = storeToRefs(useUserStore());
let editing = ref("");
const upvotes = ref(0);
const downvotes = ref(0);
const { getUsers } = useUserStore();
let userPhoto = ref("");

const deleteComment = async () => {
  try {
    await fetchy(`api/comments/${props.comment._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshComments");
};

function updateEditing(id: string) {
  editing.value = id;
}

async function getVotes(comment?: string, post?: string) {
  let postResults;
  if (post) {
    let query: Record<string, string> = post !== undefined ? { post} : { };
        try {
      postResults = await fetchy("api/votes", "GET", { query });
      if (postResults[0]) {
        upvotes.value = postResults[0].upvotes || 0;
        downvotes.value = postResults[0].downvotes || 0;
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  
  }
  if (comment) {
    let query: Record<string, string> = comment !== undefined ? { comment} : { };
      try {
      postResults = await fetchy("api/votes", "GET", { query });
      if (postResults[0]) {
        upvotes.value = postResults[0].upvotes || 0;
        downvotes.value = postResults[0].downvotes || 0;
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  } 
}

onBeforeMount(async () => {
  
  const fetchedUser = await getUsers(props.comment.author);
  if (fetchedUser[0]) {
    userPhoto.value = fetchedUser[0].profilePhoto || '';
  }
  
});


watchEffect(async () => {
  if (props.comment.children && props.comment.children.length > 0) {
    props.comment.childrenComments = await fetchy(`api/comments/${props.comment._id}`, "GET");
  }
});

onMounted(async () => {
  if (props.comment.children && props.comment.children.length > 0) {
    props.comment.childrenComments = await fetchy(`api/comments/${props.comment._id}`, "GET");
  }

  await getVotes(props.comment._id, undefined);
});
</script>

<template>
  <div class="comment">
    <div class="user">
      <img class="profile" :src="userPhoto" alt="Post image" v-if="userPhoto != ''"/>
      <p class="author">{{ props.comment.author }}</p>
    </div>
    <div class="edit">
      <p class="content">{{ props.comment.content }}</p>
      <div class="base">
        <menu v-if="props.comment.author == currentUsername">
          <li><button @click="emit('editComment', props.comment._id)">
            <img src="@/assets/images/edit.svg" />
          </button></li>
          <li><button class="button-error" @click="deleteComment">
            <img src="@/assets/images/delete.svg" />
          </button></li>
        </menu>
      </div>
    </div>
    
    <div class="footer">
      <article class="timestamp">
        <p v-if="props.comment.dateCreated !== props.comment.dateUpdated">Edited on: {{ formatDate(props.comment.dateUpdated) }}</p>
        <p v-else>{{ formatDate(props.comment.dateCreated) }}</p>
      </article>
      <div class="reply">
        <button @click="emit('replyTo', props.comment._id)">
          <img src="@/assets/images/reply.svg" />
        </button>
        <VoteComponent :commentId="props.comment._id" :initUpvotes="upvotes" :initDownvotes="downvotes"/>
      </div>
      
    </div>
    

    <div class="children-comments" v-for="childComment in props.comment.childrenComments" :key="childComment._id">
      <CommentComponent v-if="editing !== childComment._id" :comment="childComment" 
        @editComment="updateEditing" @refreshComments="emit('refreshComments', $event)" @replyTo="emit('replyTo', $event)" />  
        <EditCommentForm v-else :comment="childComment" @refreshComments="emit('refreshComments', $event)" @editComment="updateEditing"/>
    </div>

    

  </div>
</template>

<style scoped>
.children-comments {
  margin-left: 2em;
}

p {
  margin: 0em;
}

.content {
  margin-top: 6px;
  line-height: 1.2em;
}

.comment {
  padding: 10px;
}

.reply {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.edit {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  justify-content: space-between;
}

.footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
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
  justify-content: space-between;
  align-items: center;
}

.user {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
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
}

.base {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.base article:only-child {
  margin-left: auto;
}

button {
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
  box-shadow: none;
  background: none;
  border: none;
  padding: 0.5em;
  cursor: pointer;
  transition: .3s ease;
  margin-right: 5px;
}

img {
  width: 1em;
}

.styledbutton {
  -webkit-backdrop-filter: blur(8px);
  /* Safari 9+ */
  backdrop-filter: blur(8px);
  /* Chrome and Opera */
  box-shadow: 0px 2px 10px 2px rgb(0 0 0 / 15%);
  background: rgba(255, 255, 255, 0.09);
  color: black;
  border: none;
  padding: 0.6em;
  margin-bottom: 5px;
  border-radius: 10px;
  font: "SF-Compact-Medium";
  letter-spacing: 0.08em;
  font-size: 0.8em;
  cursor: pointer;
  outline: inherit;
  text-transform: uppercase;
  transition: .3s ease;
  text-transform: uppercase;
}


</style>
