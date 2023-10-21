<script setup lang="ts">
import CommentComponent from "@/components/Comment/CommentComponent.vue";
import CreateCommentForm from "@/components/Comment/CreateCommentForm.vue";
import EditCommentForm from "@/components/Comment/EditCommentForm.vue";


import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref } from "vue";

const { isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
let comments = ref<Array<Record<string, string>>>([]);
let editing = ref("");
let searchPost = ref("");
let replyTo = ref("");
let replyToComputed = computed(() => replyTo.value);
let showParentCommentForm = ref(false);

const props = defineProps({
  postID: String
});

function setReplyTo(id: string) {
  replyTo.value = id;
  
}

async function getComments(post?: string) {
  let query: Record<string, string> = post !== undefined ? { post, parentOnly: "true" } : { parentOnly: "true" };
  let postResults;
  let nested;
  try {
    postResults = await fetchy("api/comments", "GET", { query });

  } catch (error) {
    console.log('An error occurred:', error);
  }
  searchPost.value = post ? post : "";
  comments.value = postResults;
}

function updateEditing(id: string) {
  editing.value = id;
}



onBeforeMount(async () => {
  await getComments(props.postID);
  loaded.value = true;
});



</script>

<template>
  <section v-if="isLoggedIn">
  </section>
  <button @click="showParentCommentForm = !showParentCommentForm">Add Comment</button>
  <div v-if="showParentCommentForm || replyTo" class="modal">
    <div class="modal-content">
    <CreateCommentForm v-if="showParentCommentForm" :postID="props.postID" @refreshComments="getComments" @closeForm="showParentCommentForm = false" />
    <CreateCommentForm v-if="replyTo" :postID="props.postID" :parent="replyTo" @refreshComments="getComments" @closeForm="replyTo = ''"/>
</div>
</div>
    <section class="comments" v-if="loaded && comments.length !== 0">
        <article v-for="comment in comments" :key="comment._id">
          <CommentComponent v-if="editing !== comment._id" :comment="comment" :postID="props.postID"  :replyTo="replyToComputed" :editing="editing" @refreshComments="getComments" @editComment="updateEditing" @replyTo="setReplyTo" @closeForm="replyTo = ''"/>
          <EditCommentForm v-else :comment="comment" @refreshComments="getComments" @editComment="updateEditing" />
        </article>
      </section>
  
  <p v-else-if="loaded">No comments found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
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

.comments {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}

.modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
</style>
