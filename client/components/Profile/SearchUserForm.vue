<script setup lang="ts">
import { ref } from "vue";

const username = ref("");
const emit = defineEmits(["getUsers", "clearAuthor"]);
</script>

<template>
  <form @submit.prevent="emit('getUsers', username)" class="pure-form">
    <fieldset>
      <legend>Search for user</legend>
      <input id="user" type="text" v-model="username" placeholder="Username" />
      <button type="submit" class="pure-button pure-button-primary" @click="emit('clearAuthor')">Search</button>
    </fieldset>
  </form>
</template>

<style scoped>
form {
  display: flex;
  gap: 0.5em;
  align-items: center;
  padding-left: 1em;
  padding-top: 0.5em;
}

legend {
  text-align: left;
  font-family: "SF-Compact-Light";
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
  background:  rgba(255, 255, 255, 0.09);
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
  background: rgba(255, 255, 255, 0.09); 
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
  background:rgba(255, 255, 255, 0.3); 
}
</style>
