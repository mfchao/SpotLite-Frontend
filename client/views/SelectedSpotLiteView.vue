<script setup lang="ts">
import { useSpotliteStore } from "@/stores/spotlite";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const { cycleDay } = storeToRefs(useSpotliteStore());

let showPopup = ref(true);

const closePopup = () => {
  showPopup.value = false; 
};

</script>

<template>
    <main>
        <div v-if="showPopup && cycleDay == 1" class="popup">
          <h1>Congratulations!</h1>
          <h2>You've been selected for this week's SpotLite!</h2>
          <h3>Navigate to the upper right hand corner to create your first post!</h3>
          <button @click="closePopup">Close</button> 
        </div>
      </main>
</template>

<style scoped>
h1 {
  text-align: center;
}

.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
  }
  
  button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
  }
</style>