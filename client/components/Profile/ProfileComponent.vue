<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

import PostComponent from "@/components/Post/PostComponent.vue";
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";



const { currentUsername } = storeToRefs(useUserStore());
const { getUsers } = useUserStore();


const loadedPost = ref(false);

let posts = ref<Array<Record<string, string>>>([]);
let editing = ref("");
let searchAuthor = ref("");
let userBio = ref("");
let userSocials = ref("");


async function getPosts(author?: string) {
  let query: Record<string, string> = author !== undefined ? { author } : {};
  let postResults;
  try {
    postResults = await fetchy("api/posts", "GET", { query });
  } catch (_) {
    return;
  }
  searchAuthor.value = author ? author : "";
  posts.value = postResults;
}

onBeforeMount(async () => {
  await getPosts(currentUsername.value);
  loadedPost.value = true;
  
  const fetchedUser = await getUsers(currentUsername.value);
  userBio.value = fetchedUser[0].bio;
  userSocials.value = fetchedUser[0].socials;
  
});

</script>

<template>

<h3>Your Info:</h3>

    <section class="posts" v-if="userBio && userSocials">
    
        <p class="username">{{ currentUsername }}</p>
        <p class="bio">{{ userBio}}</p>
        <p class="socials">{{ userSocials }}</p>
    
    </section>  


<h3>Your Posts:</h3>
  
  <section class="posts" v-if="loadedPost && posts.length !== 0">
    <article v-for="post in posts" :key="post._id">
      <PostComponent v-if="editing !== post._id" :post="post" @refreshPosts="getPosts" />
    </article>
  </section>


  
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

.posts, .users {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
