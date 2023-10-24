<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

import PostComponent from "@/components/Post/PostComponent.vue";
import { useSpotliteStore } from "@/stores/spotlite";
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";
import UserComponent from "./UserComponent.vue";


const { cycleDay } = storeToRefs(useSpotliteStore());


const { currentUsername } = storeToRefs(useUserStore());
const { getUsers } = useUserStore();
const { isSpotliter } = useSpotliteStore();


const loadedPost = ref(false);

let posts = ref<Array<Record<string, string>>>([]);
let editing = ref("");
let searchAuthor = ref("");
let isASpotliter = ref(false);
let cycleDays = ref("");
let user = ref("");
let loaded = ref(false);

async function checkIfSpotliter(userId: string) {
  const isUserSpotliter = await isSpotliter(userId);
  if (isUserSpotliter) {
    console.log(`${userId} is a spotliter`);
    isASpotliter.value = true;
    cycleDays.value = isUserSpotliter.cycleDays;
  } else {
    console.log(`${userId} is not a spotliter`);
    isASpotliter.value = false;
  }
};


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

async function settings() {
  void router.push({ name: "Settings" });
}

async function postView(postId: string) {
  console.log("go")
  void router.push({ name: "PostView", params: { id: postId }});
}

onBeforeMount(async () => {
  await getPosts(currentUsername.value);
  loadedPost.value = true;
  
  const fetchedUser = await getUsers(currentUsername.value);
  user.value = fetchedUser[0];

  await checkIfSpotliter(fetchedUser[0]._id)
  loaded.value = true;
  
});

</script>

<template>


    <section class="users" v-if="loaded && user">
      <article >
        <button>
          <img src="@/assets/images/settings.svg" @click="settings" class="svg"/>
        </button>
        <UserComponent :user="user" />
      </article>
    </section>


    <!-- remove  v-if="isASpotliter" to view posts -->
<h1 v-if="isASpotliter">Your Posts This SpotLite Cycle:</h1>

<section class="spotlite" v-if="isASpotliter">
  <p class="username">{{ cycleDay }} days left in your SpotLite </p>
</section> 
  
  <section class="posts" v-if="isASpotliter && loadedPost && posts.length !== 0">
    <article v-for="post in posts" :key="post._id" class="articlePost">
      <!-- <p @click="postView(post._id)">See Post</p> -->
      <PostComponent v-if="editing !== post._id" :post="post" @refreshPosts="getPosts" />
    </article>
  </section>




  
</template>

<style scoped>
h1 {
  text-align: center;
  font-family: "SF-Compact-Medium";
  letter-spacing: 0.07em;
  font-size: 0.9em;
}

.username {
  text-align: center;
  font-family: "SF-Compact-Regular";
  font-size: 0.85em;
}

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

button:hover {
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

.svg  {
  width: 1.5em;
}

article {
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.3em;
  padding: 1em;
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

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
