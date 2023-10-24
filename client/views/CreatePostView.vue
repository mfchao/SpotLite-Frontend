<script setup lang="ts">
import CreatePostComponent from "@/components/Post/CreatePostComponent.vue";
import { useSpotliteStore } from "@/stores/spotlite";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";


const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const { isSpotliter } = useSpotliteStore();
const { getUsers } = useUserStore();

let isASpotliter = ref(false);

async function checkIfSpotliter(userId: string) {
  const isUserSpotliter = await isSpotliter(userId);
  if (isUserSpotliter) {
    isASpotliter.value = true;
  } else {
    isASpotliter.value = false;
  }
};

onBeforeMount(async () => {

  const fetchedUser = await getUsers(currentUsername.value);
  await checkIfSpotliter(fetchedUser[0]._id)
  
});
</script>

<template>
  <main class="home" v-if="isLoggedIn">
    <!-- comment out 'isASpotliter' to see post component if you are not selected as a Spotliter-->
    <div v-if="isASpotliter">
      <h1>Create A Post</h1>
      <CreatePostComponent/>
    </div>
    <div v-else class="notSpotliter">
      <h1 >Sorry you are not a current SpotLiter so you cannot post this week.</h1>
      <p>Better luck next week!</p>
    </div>
   
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
  font-family: "SF-Compact-Semibold";
  letter-spacing: 0.08em;
  font-size: 1em;
  text-transform: uppercase;
}

p {
  text-align: center;
  font-family: "SF-Compact-Light";
  font-size: 1em;
}


.notSpotliter {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 100%;
  gap: 1em;
}

.home {
  background-image: url("@/assets/images/gradient3.png");
  background-repeat: no-repeat;
  background-size: fill;
  background-position: center;
  background-attachment: fixed;
  height: 100vh;
  width: 100vw;
}
</style>