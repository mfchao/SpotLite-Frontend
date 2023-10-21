import { defineStore } from "pinia";

import { fetchy } from "@/utils/fetchy";

export const useCommentStore = defineStore(
  "comment",
  () => {
    const createParentComment = async (author: string, post: string, content: string) => {
      try {
        await fetchy(`api/comments`, "POST", {
          body: { author, post, content },
        });
      } catch (_) {
        return;
      }
    };

    const createChildrenComment = async (author: string, post: string, content: string, parent: string) => {
      try {
        await fetchy(`api/comments`, "POST", {
          body: { author, post, content, parent },
        });
      } catch (_) {
        return;
      }
    };

    return {
      createParentComment,
      createChildrenComment,
    };
  },
  { persist: true },
);
