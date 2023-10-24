<script setup lang="ts">
import CommentListComponent from "@/components/Comment/CommentListComponent.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());

let post = ref(null);
const route = useRoute();
const loadedPost = ref(false);
let postID = ref("");

const props = defineProps(["post"]);


async function getPostByID(id: string ) {
  let postResults;
  try {
    postResults = await fetchy(`api/posts/${id}`, "GET");
  } catch (error) {
    // console.log('An error occurred:', error);
  }
  post.value = postResults;
  loadedPost.value = true;
};


onBeforeMount(async () => {
  const id = route.params.id.toString();
  postID.value = id;
  await getPostByID(postID.value)

});

</script>

<template>
  <main>
    <h1 >post {{post}}</h1>
    <h2>{{postID}}</h2>
    <CommentListComponent :postID="postID" />
  </main>
</template>

<style scoped>
h1, h2 {
  text-align: center;
}
</style>