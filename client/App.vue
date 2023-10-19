<script setup lang="ts">
import { useSpotliteStore } from "@/stores/spotlite";
import { useToastStore } from "@/stores/toast";
import { useUserStore } from "@/stores/user";
import SelectedSpotLiteView from "@/views/SelectedSpotLiteView.vue";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";


const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const { toast } = storeToRefs(useToastStore());
const { getUsers } = useUserStore();


const { isSpotliter } = useSpotliteStore();
const { currentUsername } = storeToRefs(useUserStore());
let isASpotliter = ref(false);

async function checkIfSpotliter(userId: string) {
  const isUserSpotliter = await isSpotliter(userId);
  if (isUserSpotliter) {
    isASpotliter.value = true;
  } else {
    isASpotliter.value = false;
  }
};


// Make sure to update the session before mounting the app in case the user is already logged in
onBeforeMount(async () => {
  try {
    await userStore.updateSession();
    const fetchedUser = await getUsers(currentUsername.value);
    await checkIfSpotliter(fetchedUser[0]._id)
  } catch {
    // User is not logged in
  }
  
});

const profileLink = computed(() => {
  return currentRouteName.value === 'Profile'
    ? { text: 'Settings', route: 'Settings' }
    : { text: 'Profile', route: 'Profile' };
});
</script>

<template>
  <header>
    <nav>
      <div class="title">
        <img src="@/assets/images/logo.svg" />
        <RouterLink :to="{ name: 'Home' }">
          <h1>SpotLite</h1>
        </RouterLink>
      </div>
      <ul>
        <li>
          <RouterLink :to="{ name: 'Home' }" :class="{ underline: currentRouteName == 'Home' }"> Home </RouterLink>
        </li>
        <li v-if="isLoggedIn && isASpotliter">
          <RouterLink :to="{ name: '+Post' }" :class="{ underline: currentRouteName == '+Post' }"> +Post </RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <RouterLink :to="{ name: profileLink.route }" :class="{ underline: currentRouteName == profileLink.route }">
            {{ profileLink.text }}
          </RouterLink>        
        </li>
        <li v-else>
          <RouterLink :to="{ name: 'Login' }" :class="{ underline: currentRouteName == 'Login' }"> Login </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'Search' }" :class="{ underline: currentRouteName == 'Search' }"> Search </RouterLink>
        </li>
      </ul>
    </nav>
    <SelectedSpotLiteView  v-if="isASpotliter"/>
    <article v-if="toast !== null" class="toast" :class="toast.style">
      <p>{{ toast.message }}</p>
    </article>
  </header>
  <RouterView />
</template>

<style scoped>
@import "./assets/toast.css";

nav {
  padding: 1em 2em;
  background-color: lightgray;
  display: flex;
  align-items: center;
}

h1 {
  font-size: 2em;
  margin: 0;
}

.title {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

img {
  height: 2em;
}

a {
  font-size: large;
  color: black;
  text-decoration: none;
}

ul {
  list-style-type: none;
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1em;
}

.underline {
  text-decoration: underline;
}
</style>
