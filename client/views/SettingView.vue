<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import ProfileForm from "../components/Profile/ProfileForm.vue";
import UpdateUserForm from "../components/Setting/UpdateUserForm.vue";


const { currentUsername } = storeToRefs(useUserStore());
const { logoutUser, deleteUser } = useUserStore();

async function logout() {
  await logoutUser();
  void router.push({ name: "Home" });
}

async function delete_() {
  await deleteUser();
  void router.push({ name: "Home" });
}
</script>

<template>
  <main class="column">
    <h1>Settings for {{ currentUsername }}</h1>
    <UpdateUserForm />
    <ProfileForm/>
    <button class="button1" @click="logout">Logout</button>
    <button class="button2 end" @click="delete_">Delete User</button>
  </main>
</template>

<style>
.end {
  margin-bottom: 5em;
}

.button1 {
background-color: #5edae8;
}

.button2 {
  background-color: #ef7b5e;
  }
</style>
