<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

let spotLiteOption = ref(false);
let anonymousMode = ref(false);
let bio = ref("");
let socials = ref("");
let profilePhoto = ref("")


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

async function updatePhoto() {
  await updateUser({ profilePhoto: profilePhoto.value });
  await updateSession();
  profilePhoto.value = "";
}
</script>

<template>
  <!-- <h2>Update user details</h2> -->
  <form @submit.prevent="updateSpotLiteOption" class="pure-form">
    <fieldset>
      <legend>Change your SpotLite Option</legend>
      <div class="check">
        <div class="labels">
          <input class="checkbox pure-control-group" type="checkbox" v-model="spotLiteOption" />
        <label for="aligned-password" class="text">I would like to participate in the SpotLite selection.</label>
        </div>
        <button type="submit" >Update SpotLite Option</button>
      </div>
    </fieldset>
  </form>

  <form @submit.prevent="updateAnonymousMode" class="pure-form">
    <fieldset>
      <legend>Change your Anonymous Mode</legend>
      <div class="check">
        <div class="labels">
          <input class="checkbox pure-control-group" type="checkbox" v-model="anonymousMode" />
        <label for="aligned-password" class="text">I would like to be anonymous.</label>
        </div>
        <button type="submit" >Update Anonymous Mode</button>
      </div>
    </fieldset>
  </form>
  
  <form @submit.prevent="updatePhoto" class="pure-form">
    <fieldset>
      <legend>Change your profile Photo</legend>
      <input type="text" placeholder="Update profile photo" v-model="profilePhoto"/>
      <button type="submit" >Update profile photo</button>
    </fieldset>
  </form>

  

  <form @submit.prevent="updatebio" class="pure-form">
    <fieldset>
      <legend>Change your bio</legend>
      <input type="text" placeholder="New bio" v-model="bio"/>
      <button type="submit">Update bio</button>
    </fieldset>
  </form>

  <form @submit.prevent="updatesocials" class="pure-form">
    <fieldset>
      <legend>Change your socials</legend>
      <input type="text" placeholder="New socials" v-model="socials" />
      <button type="submit" >Update socials</button>
    </fieldset>
  </form>
</template>

<style>
h1 {
  text-align: center;
  font-family: "SF-Compact-Semibold";
  letter-spacing: 0.08em;
  font-size: 1em;
  text-transform: uppercase;
}

.labels {
  text-align: left;
  font-family: "SF-Compact-Light";
  display: flex;
  flex-direction: row;
  font-size: 0.9em;
  gap: 1em;
  align-items: center;
}

.check {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.text {
  padding-bottom: 0.5em;
}

form {
  display: flex;
  gap: 1em;
  align-items: center;
  padding-left: 1em;
  padding-top: 0.5em;
}

legend {
  text-align: left;
  font-family: "SF-Compact-Medium";
  font-size: 0.9em;
}

input {
  font-size: 14px;
  font-family: "SF-Compact-Light";
  border-radius: 6px;
  line-height: 1.5;
  padding: 5px 10px;
  transition: box-shadow 100ms ease-in, border 100ms ease-in, background-color 100ms ease-in;
  color: rgb(14, 14, 16);
  background:  rgba(255, 255, 255, 0.5);
  display: block;
  height: 36px;
  -webkit-backdrop-filter: blur(8px);  /* Safari 9+ */
  backdrop-filter: blur(8px); /* Chrome and Opera */
  outline: none;
  outline-width: 0;
  border: none;
  border-width: 0;
  box-shadow: none;
}

button {
  -webkit-backdrop-filter: blur(8px);  /* Safari 9+ */
  backdrop-filter: blur(8px); /* Chrome and Opera */
  box-shadow: 0px 2px 10px 2px rgb(0 0 0 / 15%);
  background: rgba(255, 255, 255, 0.4); 
	color: black;
	padding: 0.8em;
  border-radius: 10px;
	font: "SF-Compact-Medium";
  letter-spacing: 0.08em;
  font-size: 0.8em;
	cursor: pointer;
	outline: 0.1em;
  border: 2px solid black;
  text-transform: uppercase;
  transition: .3s ease;
  margin-left: 1em;
}

button:hover {
  background:rgba(255, 255, 255, 0.9); 
}
</style>