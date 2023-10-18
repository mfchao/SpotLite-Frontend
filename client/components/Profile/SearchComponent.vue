<script setup lang="ts">
import PostComponent from "@/components/Post/PostComponent.vue";
import SearchPostForm from "@/components/Post/SearchPostForm.vue";
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";
import SearchUserForm from "./SearchUserForm.vue";
import UserComponent from "./UserComponent.vue";


const loadedPost = ref(false);

let posts = ref<Array<Record<string, string>>>([]);
let editing = ref("");
let searchAuthor = ref("");

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
  loadedPost.value = true;
}

function updateEditing(id: string) {
  editing.value = id;
}



const loadedUser = ref(false);
let users = ref<Array<Record<string, string>>>([]);
let searchUser = ref("");

async function getUsers(username?: string) {
  let query: Record<string, string> = username !== undefined ? { username } : {};
  let userResults;
  try {
    userResults = await fetchy(`api/users/`, "GET", { query });
  } catch (_) {
    return;
  }
  searchUser.value = username ? username : "";
  users.value = userResults;
  loadedUser.value = true;
}

onBeforeMount(async () => {
  await getPosts();
  loadedPost.value = false;
  await getUsers();
  loadedUser.value = false;
});

</script>

<template>
 
  <div class="row">
    <h2 v-if="!searchAuthor">Posts:</h2>
    <h2 v-else>Posts by {{ searchAuthor }}:</h2>
    <SearchPostForm @getPostsByAuthor="getPosts" />
  </div>
  <section class="posts" v-if="loadedPost && posts.length !== 0">
    <article v-for="post in posts" :key="post._id">
      <PostComponent v-if="editing !== post._id" :post="post" @refreshPosts="getPosts" @editPost="updateEditing" />
    </article>
  </section>
  <p v-else-if="loadedPost">No posts found</p>
  <!-- <p v-else>Loading...</p> -->


  <div class="row">
    <h2 v-if="!searchUser">Users:</h2>
    <h2 v-else>Search for {{ searchUser }}:</h2>
    <SearchUserForm @getUsers="getUsers" />
  </div>
  <section class="users" v-if="loadedUser && users.length !== 0">
    <article v-for="user in users" :key="user.username">
      <UserComponent :user="user" />
    </article>
  </section>
  <p v-else-if="loadedUser">No users found</p>
  <!-- <p v-else>Loading...</p> -->
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
