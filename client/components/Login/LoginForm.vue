<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const username = ref("");
const password = ref("");
const { loginUser, updateSession } = useUserStore();

async function login() {
  await loginUser(username.value, password.value);
  void updateSession();
  void router.push({ name: "Home" });
}

</script>

<template>
  <form class="pure-form " @submit.prevent="login">
 
    <fieldset class="container">
      <div class="pure-control-group">
        <label class="form__label" for="aligned-name">Username</label>
          <input v-model.trim="username" type="text" class="form__field"  id="aligned-name" placeholder="Username" required />
      </div>
      <div class="pure-control-group">
        <label class="form__label" for="aligned-password">Password</label>
        <input type="password" v-model.trim="password" id="aligned-password" placeholder="Password" required />
      </div>
      <div class="pure-controls">
        <button type="submit" class="pure-button pure-button-primary">Submit</button>
      </div>
    </fieldset>
  </form>
</template>

<style scoped>
h3 {
  display: flex;
  justify-content: center;
}

.container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.pure-control-group {
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.form__label {
  margin-right: 10px;
}

.pure-button {
  margin-top: 15px;
}

input {
  font-size: 14px;
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


:hover {
    border-color: none
}
:focus{
    border-color: none;
    outline-width: 0;
    box-shadow: none;
    border:none;
    border-width: 0;
    background: rgba(255, 255, 255, 0.3);
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
}

button:hover {
  background:rgba(255, 255, 255, 0.3); 
}

</style>
