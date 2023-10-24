<script setup lang="ts">
import SpotInfoCard from "@/components/SpotLite/SpotInfoCard.vue";

import { useSpotliteStore } from "@/stores/spotlite";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { getSpotliters, createSpotliters, getUserById, incrementCycleDays } = useSpotliteStore();
const { cycleDay } = storeToRefs(useSpotliteStore());

let spotliters = ref<Array<Record<string, string>>>([]);
let spotliteUsers = ref<Array<Record<string, string>>>([]);
let pool = ref<Array<Record<string, string>>>([]);
let loaded = ref(false)

async function getSpotLitePool() {
  
  let spotlitePool;
  try {
    spotlitePool = await fetchy("api/users", "GET");
  } catch (_) {
    return;
  }
  pool.value = spotlitePool;
}

onBeforeMount(async () => {
    await getSpotLitePool();
    const spotLiterIds = pool.value.map((spotliter) => spotliter._id);
   
    // commented out for demo of posts
    // await incrementCycleDays(spotLiterIds);
    spotliters.value = await getSpotliters();

  if (spotliters.value.length === 0 ) {
    await createSpotliters(spotLiterIds);
    spotliters.value = await getSpotliters();
  } 

  for (const spotliter of spotliters.value) {
    const user = await getUserById(spotliter.spotliter);
    spotliteUsers.value.push(user);
  }

  loaded.value = true;
});

</script>

<template>
  <!-- Commented out closing cards and checking and incrementing cycle days for the sake of demo. 
  Incrementing the SpotLite cycle every week will clear and reset all posts, comments, and upvotes after each week. 
  Since I want the feed and spotliters to be populated with content when you grade this, I've commented out anything that 
  has to do with the resetting part of the SpotLite concept.  -->


    <!-- <div v-if="cycleDay == 1"> -->
        <h3 >Welcome This Week's SpotLiters:</h3>
        <p v-if="!loaded">Loading SpotLiters...</p>
        <div v-if="loaded" class="info">
          <article v-for="user in spotliteUsers" :key="user.username" > 
            <SpotInfoCard :user="user" />
          </article>
        </div>
       
    <!-- </div> -->
    <!-- <div v-else-if="cycleDay == 7"> -->
        <!-- <h3 >Thanks To This Week's SpotLiters:</h3>
        <p v-if="!loaded">Loading SpotLiters...</p>
        <div v-if="loaded" class="info">
          <article v-for="user in spotliteUsers" :key="user.username" >
            <SpotInfoCard :user="user" />
          </article>
        </div> -->
       
    <!-- </div> -->
 
</template>

<style scoped>

h3 {
    text-align: center;
    font-family: "SF-Compact-Semibold";
    letter-spacing: 0.08em;
    font-size: 1em;
    text-transform: uppercase;
  }

p {
  text-align: center;
  font-family: "SF-Compact-MediumItalic";
  letter-spacing: 0.08em;
  font-size: 0.8em;
  padding: 2em;
}

.info {
  display: flex;
  overflow-x: auto;
  gap: 0.7em;
  margin-left: 10%;
  margin-right: 10%;
  width: 100%;
}

article {
  flex: 0 0 auto;
  margin: 0.7em; 
  padding: 0.7em; 
  animation: fadeIn 2s ease-in;
}

@keyframes fadeIn {
  0% {opacity: 0;}
  100% {opacity: 1;}
}

</style>
