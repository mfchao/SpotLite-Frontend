<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref } from "vue";
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

const upvoteIcon = computed(() => hasUpvoted.value);
const downvoteIcon = computed(() => hasDownvoted.value);


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
      if (postResults[0]) {
        upvotes.value = postResults[0].upvotes || 0;
        downvotes.value = postResults[0].downvotes || 0;
      }
    } catch  {
    }
  
  }
  if (comment) {
    let query: Record<string, string> = comment !== undefined ? { comment} : { };
      try {
      postResults = await fetchy("api/votes", "GET", { query });
      if (postResults[0]) {
        upvotes.value = postResults[0].upvotes || 0;
        downvotes.value = postResults[0].downvotes || 0;
      }
    } catch {
      
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
      <span>{{upvotes}}</span>
      <button @click="upvote(userID, commentId, postId)">
        <img v-if="upvoteIcon === true" src="@/assets/images/upvoteON.svg" />
        <img v-else src="@/assets/images/upvote.svg" />
      </button>
      <span>{{ downvotes }}</span>
      <button @click="downvote(userID, commentId, postId)">
        <img v-if="downvoteIcon === true" src="@/assets/images/downvoteON.svg" />
        <img v-else src="@/assets/images/downvote.svg" />
      </button>
      
    </div>
  </section>
  </template>

<style scoped>

button {
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
  box-shadow: none;
  background: none;
  border: none;
  padding: 0.5em;
  cursor: pointer;
  transition: .3s ease;
  margin-right: 5px;
}

img {
  width: 1em;
}

</style>
