<script setup lang="ts">

const props = defineProps(["user"]);


</script>

<template>

  <div class="card">
    <img class="profile" :src="props.user.profilePhoto" alt="User profile picture" v-if="props.user.profilePhoto != ''"/>
    <p class="username">{{ props.user.username }}</p>
    <p class="bio">{{ props.user.bio }}</p>
    <div class="socials">
      <a :href="props.user.socials" target="_blank">{{props.user.socials }}</a>
    </div>
  </div>
</template>

<style scoped>
.card {
  -webkit-backdrop-filter: blur(8px);  /* Safari 9+ */
  backdrop-filter: blur(8px); /* Chrome and Opera */
  box-shadow: 0px 2px 10px 2px rgb(0 0 0 / 8%);
  background: rgba(255, 255, 255, 0.42); 
  padding: 1.3em;
  text-align: center;
  width: 250px; 
  margin: auto;
  border-radius: 10px;
}

.profile {
  width: 100px; 
  height: 100px; 
  object-fit: cover;
  border-radius: 50%; 
  margin: auto;
}

.username {
  margin-top: 1em;
  font-family: "SF-Compact-Semibold";
  letter-spacing: 0.01em;
  font-size: 1em;
}

.bio {
  text-align: left;
  margin-top: 1em;
  font-family: "SF-Compact-Regular";
}

a {
  align-items: left;
  font-size: 0.9em;
  font-style: italic;
  font-family: "SF-Compact-Thin";
  margin-top: 1em;
  color: #ef7b5b;
}
</style>
