<script setup lang="ts">

const props = defineProps(["user"]);



</script>

<template>
  <p class="username">{{ props.user.username }}</p>
  <p>{{ props.user.bio }}</p>
  <div class="base">
   
    <article class="timestamp">
      <p>Socials: {{props.user.socials }}</p>
    </article>
  </div>
</template>

<style scoped>
p {
  margin: 0em;
}

.username {
  font-weight: bold;
  font-size: 1.2em;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base article:only-child {
  margin-left: auto;
}
</style>
