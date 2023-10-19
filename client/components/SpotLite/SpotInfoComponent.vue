<script setup lang="ts">
import SpotInfoCard from "@/components/SpotLite/SpotInfoCard.vue";

import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";
import { useSpotliteStore } from "@/stores/spotlite";
import { storeToRefs } from "pinia";

const { getSpotliters, createSpotliters, getUserById, incrementCycleDays } = useSpotliteStore();
const { cycleDay } = storeToRefs(useSpotliteStore());

let spotliters = ref([]);
let spotliteUsers = ref([]);
let pool = ref<Array<Record<string, string>>>([]);

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
    await incrementCycleDays(spotLiterIds);

  spotliters.value = await getSpotliters();
  if (spotliters.value.length === 0) {

    await createSpotliters(pool);

    spotliters.value = await getSpotliters();
  }

  for (const spotliter of spotliters.value) {
    const user = await getUserById(spotliter.spotliter);
    spotliteUsers.value.push(user);
  }
});

</script>

<template>
    <div v-if="cycleDay == 1">
        <h3 >Welcome This Week's SpotLiters:</h3>
        <article v-for="user in spotliteUsers" :key="user.username">
            <SpotInfoCard :user="user" />
          </article>
    </div>
    <div v-else-if="cycleDay == 7">
        <h3 >Thanks To This Week's SpotLiters:</h3>
        <article v-for="user in spotliteUsers" :key="user.username">
            <SpotInfoCard :user="user" />
          </article>
    </div>
 
 
 
 
</template>

<style scoped>

h3 {
    text-align: center;
  }

</style>
