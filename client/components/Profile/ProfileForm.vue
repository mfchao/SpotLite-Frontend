<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

let spotLiteOption = ref(false);
let anonymousMode = ref(false);
let bio = ref("");
let socials = ref("");


const { updateUser, updateSession } = useUserStore();

async function updateSpotLiteOption() {
  await updateUser({ spotLiteOption: spotLiteOption.value });
  await updateSession();
  spotLiteOption.value = false;
}

async function updateAnonymousMode() {
  await updateUser({ anonymousMode: anonymousMode.value });
  await updateSession();
  anonymousMode.value = false;
}

async function updatebio() {
  await updateUser({ bio: bio.value });
  await updateSession();
  bio.value = "";
}

async function updatesocials() {
  await updateUser({ socials: socials.value });
  await updateSession();
  socials.value = "";
}
</script>

<template>
  <!-- <h2>Update user details</h2> -->
  <form @submit.prevent="updateSpotLiteOption" class="pure-form">
    <fieldset>
      <legend>Change your SpotLite Option</legend>
      <input type="checkbox" placeholder="Toggle SpotLite Option" v-model="spotLiteOption"/>
      <button type="submit" class="pure-button pure-button-primary">Update spotLiteOption</button>
    </fieldset>
  </form>

  <form @submit.prevent="updateAnonymousMode" class="pure-form">
    <fieldset>
      <legend>Change your Anonymous Mode</legend>
      <input type="checkbox" placeholder="Toggle Anonymous Mode" v-model="anonymousMode"/>
      <button type="submit" class="pure-button pure-button-primary">Update anonymousMode</button>
    </fieldset>
  </form>

  <form @submit.prevent="updatebio" class="pure-form">
    <fieldset>
      <legend>Change your bio</legend>
      <input type="bio" placeholder="New bio" v-model="bio"/>
      <button type="submit" class="pure-button pure-button-primary">Update bio</button>
    </fieldset>
  </form>

  <form @submit.prevent="updatesocials" class="pure-form">
    <fieldset>
      <legend>Change your socials</legend>
      <input type="socials" placeholder="New socials" v-model="socials" />
      <button type="submit" class="pure-button pure-button-primary">Update socials</button>
    </fieldset>
  </form>
</template>