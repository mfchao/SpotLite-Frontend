<script setup lang="ts">
import EditCommentForm from "@/components/Comment/EditCommentForm.vue";
import VoteComponent from "@/components/Vote/VoteComponent.vue";
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { onMounted, ref, watchEffect } from "vue";
import { fetchy } from "../../utils/fetchy";


const props = defineProps(["comment", "postID", "replyTo"]);
const emit = defineEmits(["editComment", "refreshComments", "replyTo", "closeForm"]);
const { currentUsername } = storeToRefs(useUserStore());
let editing = ref("");
const upvotes = ref(0);
const downvotes = ref(0);

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
  
  if (comment) {
    let query: Record<string, string> = comment !== undefined ? { comment} : { };
      try {
      postResults = await fetchy("api/votes", "GET", { query });
      upvotes.value = postResults[0].upvotes;
      downvotes.value = postResults[0].downvotes;
    } catch (error) {
      console.log('An error occurred:', error);
    }
  } 
}


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
  <div>
    <p class="author">{{ props.comment.author }}</p> 
    <p>{{ props.comment.content }}</p>
    <div class="base">
      <menu v-if="props.comment.author == currentUsername">
        <li><button class="btn-small pure-button" @click="emit('editComment', props.comment._id)">Edit</button></li>
        <li><button class="button-error btn-small pure-button" @click="deleteComment">Delete</button></li>
      </menu>
      <article class="timestamp">
        <p v-if="props.comment.dateCreated !== props.comment.dateUpdated">Edited on: {{ formatDate(props.comment.dateUpdated) }}</p>
        <p v-else>Created on: {{ formatDate(props.comment.dateCreated) }}</p>
      </article>
      <button @click="emit('replyTo', props.comment._id)">Reply</button>
    </div>
    <!-- <CreateCommentForm v-if="props.replyTo === props.comment._id" :postID="props.postID" :parent="props.comment._id" @refreshComments="emit('refreshComments')" @closeForm="emit('closeForm')"/> -->
    <VoteComponent :commentId="props.comment._id" :initUpvotes="upvotes" :initDownvotes="downvotes"/>


    <!-- Recursive component -->
    <div class="children-comments" v-for="childComment in props.comment.childrenComments" :key="childComment._id">
      <CommentComponent v-if="editing !== childComment._id" :comment="childComment" 
        @editComment="updateEditing" @refreshComments="emit('refreshComments', $event)" @replyTo="emit('replyTo', $event)" />  
        <EditCommentForm v-else :comment="childComment" @refreshComments="emit('refreshComments', $event)" @editComment="updateEditing"/>
        <!-- <CreateCommentForm v-if="props.replyTo === childComment._id" :postID="props.postID" :parent="childComment._id" @refreshComments="emit('refreshComments')" @closeForm="emit('closeForm')"/> -->
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

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base article:only-child {
  margin-left: auto;
}
</style>
