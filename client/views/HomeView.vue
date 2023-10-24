<script setup lang="ts">
import LoginForm from "@/components/Login/LoginForm.vue";
import RegisterForm from "@/components/Login/RegisterForm.vue";
import PostListComponent from "@/components/Post/PostListComponent.vue";
import SpotInfoComponent from "@/components/SpotLite/SpotInfoComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";


const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());

let login = ref(false);
let register =  ref(false);

function loginUser() {
  login.value = true;
  register.value = false;
}

function registerUser() {
  register.value = true;
  login.value = false;
}

</script>

<template>
  <main>
  

    <div v-if="isLoggedIn" class="home">
      <!-- <h1>This week's SpotLite</h1> -->
      <SpotInfoComponent/>
      <PostListComponent />
    </div>

    <div v-else class="relative">
        <div class="centered ">
          <img class="animate logo" src="@/assets/images/logovect.svg" />
       </div>

      <div class="forms fade-in">
        <h1>WELCOME TO SPOTLITE</h1>
        <div class="button-container">
          <button @click="loginUser" > LOGIN</button>
          <button @click="registerUser"> REGISTER</button>
        </div>
        <div v-if="login" class="fade-in-form">
          <LoginForm />
        </div>
        <div v-if="register" class="fade-in-form">
          <RegisterForm />
        </div>
      </div>
      <div class="bg-container fade-in">
        <img class="background-image" src="@/assets/images/gradient1.png"/>
      </div>
      
    </div>
  </main>
</template>

<style scoped>

.home {
  background-image: url("@/assets/images/gradient2.png");
  background-repeat: no-repeat;
  background-size: fill;
  background-position: center;
  background-attachment: fixed;
}


h1 {
  text-align: center;
  font-family: "SF-Compact-Semibold";
  letter-spacing: 0.15em;
  font-size: 1.2em;
}

* {
  transition: all 0.5s ease;
}

.button-container {
  margin-top: 25px;
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
}

button {
  -webkit-backdrop-filter: blur(8px);  /* Safari 9+ */
  backdrop-filter: blur(8px); /* Chrome and Opera */
  box-shadow: 0px 2px 10px 2px rgb(0 0 0 / 15%);
  background: rgba(255, 255, 255, 0.09); 
	color: black;
	border: none;
	padding: 0.8em;
  border-radius: 10px;
	font: "SF-Compact-Medium";
  letter-spacing: 0.08em;
  font-size: 0.8em;
	cursor: pointer;
	outline: inherit;
  text-transform: uppercase;
  transition: .3s ease;
}

button:hover {
  background:rgba(255, 255, 255, 0.3); 
}

.selected {
  background:rgba(255, 255, 255, 0.3); 
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.logo {
  position: absolute;
  width: 10em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.bg-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.background-image  {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.relative {
  position: relative;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.animate {
  -webkit-animation: fadeinout 4s linear forwards;
  animation: fadeinout 4s linear forwards;
}

.fade-in {
  -webkit-animation: fadein 6s linear forwards;
  animation: fadein 6s linear forwards;
}

.fade-in-form {
  -webkit-animation: fadein 0.2s linear forwards;
  animation: fadein 0.2s linear forwards;
}

@-webkit-keyframes fadeinout {
  0%,100% { opacity: 0; }
  60% { opacity: 1; }
}

@keyframes fadeinout {
  0%,100% { opacity: 0; }
  60% { opacity: 1; }
}

@-webkit-keyframes fadein {
  0%, 60%{ opacity: 0; }
  100% { opacity: 1; }
}

@keyframes fadein {
  0%, 60% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes fadeInAll {
  0% {opacity: 0;}
  100% {opacity: 1;}
}


.forms {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

main {
  animation: fadeInAll 1.5s ease-in;
}

</style>



