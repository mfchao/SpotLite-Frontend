<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const { getUsers } = useUserStore();

const props = defineProps({
  postId: String,
  commentId: String,
  initUpvotes: Number,
  initDownvotes: Number
});

const upvotes = ref(0);
const downvotes = ref(0);
const userID = ref("");
const { currentUsername } = storeToRefs(useUserStore());
const { isLoggedIn } = storeToRefs(useUserStore());

const hasUpvoted = ref(false);
const hasDownvoted = ref(false);


const upvote = async (user: string, comment?: string, post?: string) => {
  if (hasUpvoted.value) {
    await removeUpvote(user, comment, post);
    hasUpvoted.value = false;
  } else {
  
  if (comment) {
      try {
      const response = await fetchy(`api/votes/upvote`, "POST", {
        body: {user, comment}
        });
        upvotes.value = response.upvote.upvotes;
        
      } catch (error) {
        console.error(error);
      }
    }

    if (post) {
      try {
      const response = await fetchy(`api/votes/upvote`, "POST", {
        body: {user, post}
        });
        upvotes.value = response.upvote.upvotes;
      } catch (error) {
        console.error(error);
      }
    }
    hasUpvoted.value = true;
  }
};

const downvote = async (user: string, comment?: string, post?: string) => {
  if (hasDownvoted.value) {
    await removeDownvote(user, comment, post);
    hasDownvoted.value = false;
  } else {
  if (comment) {
      try {
      const response = await fetchy(`api/votes/downvote`, "POST", {
        body: {user, comment}
        });
        downvotes.value = response.downvote.downvotes;
      } catch (error) {
        console.error(error);
      }
    }

    if (post) {
      try {
      const response = await fetchy(`api/votes/downvote`, "POST", {
        body: {user, post}
        });
        downvotes.value = response.downvote.downvotes;
      } catch (error) {
        console.error(error);
      }
    }
    hasDownvoted.value = true;
  }
};

const removeUpvote = async (user: string, comment?: string, post?: string) => {
    if (comment) {
      try {
      const response = await fetchy(`api/votes/upvote`, "PATCH", {
        body: {user, comment}
        });
        upvotes.value = response.upvote.upvotes;
        
      } catch (error) {
        console.error(error);
      }
    }

    if (post) {
      try {
      const response = await fetchy(`api/votes/upvote`, "PATCH", {
        body: {user, post}
        });
        upvotes.value = response.upvote.upvotes;
      } catch (error) {
        console.error(error);
      }
    }
};

const removeDownvote = async (user: string, comment?: string, post?: string) => {
    if (comment) {
      try {
      const response = await fetchy(`api/votes/downvote`, "PATCH", {
        body: {user, comment}
        });
        downvotes.value = response.downvote.downvotes;
        
      } catch (error) {
        console.error(error);
      }
    }

    if (post) {
      try {
      const response = await fetchy(`api/votes/downvote`, "PATCH", {
        body: {user, post}
        });
        downvotes.value = response.downvote.downvotes;
      } catch (error) {
        console.error(error);
      }
    }
};

async function getVotes(comment?: string, post?: string) {
  let postResults;
  if (post) {
    let query: Record<string, string> = post !== undefined ? { post} : { };
        try {
      postResults = await fetchy("api/votes", "GET", { query });
      upvotes.value = postResults[0].upvotes;
      downvotes.value = postResults[0].downvotes;
    } catch (error) {
      console.log('An error occurred:', error);
    }
  
  }
  if (comment) {
    let query: Record<string, string> = comment !== undefined ? { comment} : { };
      try {
      postResults = await fetchy("api/votes", "GET", { query });
      upvotes.value = postResults[0].upvotes;
      downvotes.value = postResults[0].downvotes;
    } catch (error) {
      console.log('An error occurred:', error);
    }
  } 
}


onBeforeMount(async () => {
  
  const fetchedUser = await getUsers(currentUsername.value);
  userID.value =fetchedUser[0]._id

  await getVotes(undefined, props.postId);

  if(props.initUpvotes && props.initDownvotes)  {
    upvotes.value = props.initUpvotes;
    downvotes.value = props.initDownvotes;
  }
   
});
</script>

<template>
  <section v-if="isLoggedIn">
    <div class="votes">
      <button @click="upvote(userID, commentId, postId)">Upvote</button>
      <span>{{upvotes}}</span>
      <button @click="downvote(userID, commentId, postId)">Downvote</button>
      <span>{{ downvotes }}</span>
    </div>
  </section>
  </template>

<style scoped>
form {
  background-color: var(--base-bg);
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  border-radius: 4px;
  resize: none;
}

p {
  margin: 0em;
}

.author {
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

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}
</style>
