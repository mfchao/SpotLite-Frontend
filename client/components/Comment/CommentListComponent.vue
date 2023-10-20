<script setup lang="ts">
import CommentComponent from "@/components/Comment/CommentComponent.vue";
import CreateCommentForm from "@/components/Comment/CreateCommentForm.vue";
import EditCommentForm from "@/components/Comment/EditCommentForm.vue";


import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";


const { isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
let comments = ref<Array<Record<string, string>>>([]);
let editing = ref("");
let searchPost = ref("");

const props = defineProps({
  postID: String
});


async function getComments(post?: string) {
  let query: Record<string, string> = post !== undefined ? { post } : {};
  let postResults;
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

  <!-- <section>{{comments}}</section> -->
  <CreateCommentForm :postID="props.postID" @refreshComments="getComments" />

  <section class="comments" v-if="loaded && comments.length !== 0">
    <article v-for="comment in comments" :key="comment._id">
      <CommentComponent v-if="editing !== comment._id" :comment="comment" @refreshComments="getComments" @editComment="updateEditing" />
      <EditCommentForm v-else :comment="comment" @refreshComments="getComments" @editComment="updateEditing" />
      <!-- <CreateCommentForm :postID="props.postID" @refreshComments="getComments" /> -->
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
</style>
