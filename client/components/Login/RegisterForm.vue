<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const username = ref("");
const password = ref("");
const anonymousMode = ref(false);
const spotLiteOption = ref(false);
const { createUser, loginUser, updateSession } = useUserStore();

async function register() {
  await createUser(username.value, password.value, spotLiteOption.value, anonymousMode.value,);
  await loginUser(username.value, password.value);
  void updateSession();
  void router.push({ name: "Home" });
}
</script>

<template>
  <form class="pure-form " @submit.prevent="register">
  
    <fieldset class="container">
      
      <div class="pure-control-group inputs">
          <label class="form-label" for="aligned-name">Username</label>
          <input v-model.trim="username" type="text" id="aligned-name" placeholder="Username" required />
        </div>
        <div class="pure-control-group inputs">
          <label class="form-label" for="aligned-password">Password</label>
          <input type="password" v-model.trim="password" id="aligned-password" placeholder="Password" required />
        </div>

        <div class="options">
      <div class="pure-control-group ">
        <input class="checkbox" type="checkbox" v-model.trim="spotLiteOption" id="aligned-spotLiteOption" />
        <div class="labels">
        <label for="aligned-password">I would like to participate in the SpotLite selection.</label>
        <p> (You can edit this later too).</p>
        </div>
      </div>
      <div class="pure-control-group ">
        <input class="checkbox" type="checkbox" v-model.trim="anonymousMode" id="aligned-anonymousMode" />
        <div class="labels">
          <label for="aligned-password">I would like to be anonymous.</label>
          <p> (You can edit this later too).</p>
        </div>
      </div>
        
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

p {
  font-family: "SF-Compact-Thin";
  font-size: small;
}

.labels {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 15px;
}

.options {
  margin-top: 15px;
}

.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 15px;
}

.pure-control-group {
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.inputs {
  justify-content: center;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}



.form-label {
  margin-right: 10px;
}

.checkbox {
  margin-right: 10px;
  height: 20px;
  width: 20px;

}

.checkbox-input {
  display: none;
}

.pure-button {
  justify-content: flex-end;
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
