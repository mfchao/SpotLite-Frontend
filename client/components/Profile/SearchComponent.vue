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
const currentView = ref('none');

async function getPosts(author?: string) {
  let query: Record<string, string> = author !== undefined ? { author } : {};
  let postResults;
  try {
    postResults = await fetchy("api/posts", "GET", { query });
  } catch (error) {
    console.log('An error occurred:', error);
  }
  searchAuthor.value = author ? author : "";
  posts.value = postResults;
  loadedPost.value = true;
  currentView.value = 'posts';
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
  currentView.value = 'users';
}

onBeforeMount(async () => {
  await getPosts();
  loadedPost.value = false;
  await getUsers();
  loadedUser.value = false;
});

</script>

<template>
 <div class="body">


  <div class="head">
    <div class="row">
      <h2 v-if="!searchAuthor">Posts:</h2>
      <h2 v-else>Posts by {{ searchAuthor }}:</h2>
      <SearchPostForm @getPostsByAuthor="getPosts" />
    </div>
    <div class="row">
      <h2 v-if="!searchUser">Users:</h2>
      <h2 v-else>Search for {{ searchUser }}:</h2>
      <SearchUserForm @getUsers="getUsers" />
    </div>
  </div>
  
  <section class="posts" v-if="currentView === 'posts' && loadedPost && posts.length !== 0">
    <article v-for="post in posts" :key="post._id" class="articlePost">
      <PostComponent v-if="editing !== post._id" :post="post" @refreshPosts="getPosts" @editPost="updateEditing" />
    </article>
  </section>
  <p v-else-if="currentView === 'posts' && loadedPost">No posts found</p>
  <!-- <p v-else>Loading...</p> -->

  
  <section class="users" v-if="currentView === 'users' && loadedUser && users.length !== 0">
    <article v-for="user in users" :key="user.username">
      <UserComponent :user="user" />
    </article>
  </section>
  <p v-else-if="currentView === 'users' && loadedUser">No users found</p>

  <!-- <p v-else>Loading...</p> -->
</div>
</template>

<style scoped>

h2 {
  text-align: center;
  font-family: "SF-Compact-Medium";
  letter-spacing: 0.07em;
  font-size: 0.9em;
  text-transform: uppercase;
}

.head {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 2em;
  margin-bottom: 1.5em;
  gap: 5em;
}

.body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

section,
p,
.row {
  margin: 0 ;
  max-width: 60em;
  justify-content: center;
  justify-content: space-between;
}

article {
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.3em;
  margin-bottom: 1em;
}

.articlePost {
  -webkit-backdrop-filter: blur(8px);  /* Safari 9+ */
  backdrop-filter: blur(8px); /* Chrome and Opera */
  box-shadow: 0px 2px 10px 2px rgb(0 0 0 / 8%);
  background: rgba(255, 255, 255, 0.4); 
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.3em;
  padding: 1em;
  margin-bottom: 1em;
}

.posts, .users {
  padding: 1em;
}




</style>
