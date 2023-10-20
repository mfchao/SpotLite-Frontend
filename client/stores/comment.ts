import { defineStore } from "pinia";

import { fetchy } from "@/utils/fetchy";

export const useCommentStore = defineStore(
  "comment",
  () => {
    const createComment = async (author: string, post: string, content: string) => {
      try {
        await fetchy(`api/comments`, "POST", {
          body: { author, post, content },
        });
      } catch (_) {
        return;
      }
    };

    return {
      createComment,
    };
  },
  { persist: true },
);
