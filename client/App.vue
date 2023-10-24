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


</script>

<template>
  <header>
    <nav v-if="isLoggedIn">
      <div class="title">
        
        <RouterLink :to="{ name: 'Home' }">
          <img src="@/assets/images/logovect.svg" />
        </RouterLink>
      </div>
      <ul>
        <li v-if="isLoggedIn">
          <RouterLink :to="{ name: 'Home' }" > 
            <img v-if="currentRouteName == 'Home'" src="@/assets/images/homeON.svg" class="navImage"/>
            <img v-if="currentRouteName != 'Home'" src="@/assets/images/home.svg" class="navImage"/>
           </RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <RouterLink :to="{ name: '+Post' }">
            <img v-if="currentRouteName == '+Post'" src="@/assets/images/addON.svg" class="navImage"/>
            <img v-if="currentRouteName != '+Post'" src="@/assets/images/add.svg" class="navImage"/>
           </RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <RouterLink :to="{ name: 'Profile' }">
            <img v-if="currentRouteName == 'Profile'" src="@/assets/images/profileON.svg" class="navImage"/>
            <img v-if="currentRouteName != 'Profile'" src="@/assets/images/profile.svg" class="navImage"/>
           </RouterLink>       
        </li>
        <li v-if="isLoggedIn">
          <RouterLink :to="{ name: 'Search' }" > 
            <img v-if="currentRouteName == 'Search'" src="@/assets/images/searchON.svg" class="navImage"/>
            <img v-if="currentRouteName != 'Search'" src="@/assets/images/search.svg" class="navImage"/>
          </RouterLink>
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

.navImage {
  height: 1.1em;
}

nav {
  padding: 1em 2em;
  display: flex;
  align-items: center;
  background-color: transparent;
  color: none;
}

h1 {
  font-size: 2em;
  margin: 0;
}

.title {
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-family: "SF-Compact-Semibold";
}

img {
  height: 0.8em;
}

a {
  font-size: large;
  color: black;
  text-decoration: none;
  font-family: "SF-Compact-Regular";

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
