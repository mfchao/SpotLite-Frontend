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
let showReplyCommentForm = ref(false);

let showAllComments = ref(false);

const props = defineProps({
  postID: String
});

function setReplyTo(id: string) {
  replyTo.value = id;
  showReplyCommentForm.value = true;
}


let displayedComments = computed(() => {
  return showAllComments.value ? comments.value : comments.value.slice(0, 1);
});

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

function closeReply()  {
  showReplyCommentForm.value = false;
  replyTo.value = '';
}



onBeforeMount(async () => {
  await getComments(props.postID);
  loaded.value = true;
});



</script>

<template>
  <section v-if="isLoggedIn">
  </section>
  
  <div v-if="showParentCommentForm || showReplyCommentForm" class="modal">
    <div class="modal-content">
    <CreateCommentForm v-if="showParentCommentForm" :postID="props.postID" @refreshComments="getComments(props.postID)" @closeForm="showParentCommentForm = false" />
    <CreateCommentForm v-if="showReplyCommentForm" :postID="props.postID" :parent="replyTo" @refreshComments="getComments(props.postID)" @closeForm="closeReply"/>
    </div>
  </div>
  
    <section class="comments" v-if="loaded && comments.length !== 0">
      <button class="buttonUndo" @click="showParentCommentForm = !showParentCommentForm">
        <img class="commentIcon" src="@/assets/images/comment.svg" />
      </button>
        <article v-for="comment in displayedComments" :key="comment._id">
          <CommentComponent v-if="editing !== comment._id" :comment="comment" :postID="props.postID"  :replyTo="replyToComputed" :editing="editing" @refreshComments="getComments(props.postID)" @editComment="updateEditing" @replyTo="setReplyTo" @closeForm="replyTo = ''"/>
          <EditCommentForm v-else :comment="comment" @refreshComments="getComments(props.postID)" @editComment="updateEditing" />
        </article>
        <button v-if="!showAllComments && comments.length > 1" @click="showAllComments = true">See More</button>
        <button v-if="showAllComments && comments.length > 3" @click="showAllComments = false">See Less</button>
      </section>
  
    <div v-else-if="loaded" class="centered">
      <button class="buttonNone" @click="showParentCommentForm = !showParentCommentForm">
        <img class="commentIcon" src="@/assets/images/comment.svg" />
      </button>
      <p >No comments yet.</p>
    </div>
    
    <p v-else>Loading...</p>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

.centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.commentIcon {
  width: 1.5em;
  padding: 0;
  margin: 0;
}

section,
p,
.row {
  margin: 0 auto;
  max-width: 60em;
  margin-bottom: 10px;
  margin-top: 0;
}

article {
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  padding: 0.2em;
}

.comments {
  padding-bottom: 0.5em;
  
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 ;
  max-width: 60em;
}

.modal {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
    position: fixed;
    z-index: 1;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.3);
  }
  
  .modal-content {
    margin: 15% auto;
    padding: 20px;
    border-radius: 10px;
    width: 80%;
  }
  
  .close {
    
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

  .buttonUndo {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    box-shadow: none;
    background: none;
    border: none;
    cursor: pointer;
    transition: .3s ease;
    margin-right: 0px;
    display: flex;
    align-items: end;
    align-self: flex-end;
    margin-left: 10px;
    margin-right: 20px;
    margin-top: 0;
    padding: 0;
  }

  .buttonNone {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    box-shadow: none;
    background: none;
    border: none;
    cursor: pointer;
    transition: .3s ease;
    margin-right: 0px;
    margin-bottom: 5px;
    padding: 0;
  }
</style>
